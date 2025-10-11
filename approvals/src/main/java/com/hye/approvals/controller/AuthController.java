package com.hye.approvals.controller;

import com.hye.approvals.auth.*;
import com.hye.approvals.dto.LoginDTO;
import com.hye.approvals.dto.ResponseDTO;
import com.hye.approvals.dto.UserDTO;
import com.hye.approvals.service.AuthService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Map;

@RestController
@RequestMapping("auth")
public class AuthController {

	@Value("${app.jwt.refresh-exp-day}")
	private long refreshExpDay;


	private final AuthService service;
	private final AccessTokenService accessTokenService;
	private final RefreshTokenService refreshTokenService;
	private final RefreshTokenStore refreshStore;
	private final TokenBlacklist blacklist;
	private final CookieSupport cookieSupport;

	public AuthController(AuthService service, AccessTokenService accessTokenService, RefreshTokenService refreshTokenService, RefreshTokenStore refreshStore, TokenBlacklist blacklist, CookieSupport cookieSupport) {
		this.service = service;
		this.accessTokenService = accessTokenService;
		this.refreshTokenService = refreshTokenService;
		this.refreshStore = refreshStore;
		this.blacklist = blacklist;
		this.cookieSupport = cookieSupport;
	}

	@PostMapping("/login")
	public ResponseDTO<?> login(@RequestBody LoginDTO dto, HttpServletResponse res) {

		ResponseDTO<Map<String,Object>> response = new ResponseDTO<>();

		try {
			UserDTO user = service.login(dto);
			if (user == null) {
				throw new RuntimeException("로그인 실패!");
			}

			// Access
			String at = accessTokenService.create(user.getUserId(), user.getEmpName(), user.getLevelNo());
			// Refresh (화이트리스트 저장 + httpOnly 쿠키)
			String rt = refreshTokenService.create(user.getUserId(), user.getEmpName(), user.getLevelNo());
			Jws<Claims> parsed = refreshTokenService.parse(rt);
			String jti = parsed.getBody().getId();
			refreshStore.bind(user.getUserId(), jti);

			int maxAge = (int)(refreshExpDay * 24 * 60 * 60);
			cookieSupport.setRefreshCookie(res, rt, maxAge);

			response.setStatus("succ");
			response.setData(Map.of(
					"token", at,
					"tokenType", "Bearer",
					"user", user));
		} catch (RuntimeException e) {
			response.setStatus("fail");
			response.setMessage(e.getMessage());
		}

		return response;

	}

	@PostMapping("/token")
	public ResponseDTO<?> rotate(HttpServletRequest req, HttpServletResponse res) {
		String rt = extractRefreshFromCookie(req, cookieSupport.cookieName());

		ResponseDTO<Map<String,Object>> response = new ResponseDTO<>();

		if (rt == null || rt.isBlank()) {
			response.setStatus("401");
			response.setMessage("Missing refresh token");
			return response;
		}
		try {
			Jws<Claims> jws = refreshTokenService.parse(rt);
			Claims c = jws.getBody();
			String userId = c.getSubject();
			String empName = c.get("empName", String.class);
			Integer levelNo = c.get("levelNo", Integer.class);
			String jti = c.getId();

			if (!refreshStore.isValid(userId, jti)) {
				response.setStatus("401");
				response.setMessage("Refresh token not recognized");
				return response;
			}

			// 회전: 새 RT + 새 AT
			String newRt = refreshTokenService.create(userId, empName, levelNo);
			String newJti = refreshTokenService.parse(newRt).getBody().getId();
			refreshStore.bind(userId, newJti);

			String newAt = accessTokenService.create(userId, empName, levelNo); // 필요시 DB조회로 name/role 채우기

			int maxAge = (int)(refreshExpDay * 24 * 60 * 60);
			cookieSupport.setRefreshCookie(res, newRt, maxAge);
			response.setStatus("succ");
			response.setData(Map.of(
					"token", newAt,
					"tokenType", "Bearer"
			));
			return response;
		} catch (Exception e) {
			response.setStatus("401");
			response.setMessage("Invalid refresh token");
			return response;
		}
	}

	@PostMapping("/logout")
	public ResponseDTO<?> logout(@RequestHeader("Authorization") String authorization,
								 @CurrentUser UserDTO user,
//									@RequestAttribute("exp") long expMillis,
//									@RequestAttribute("userId") String userId,
									HttpServletResponse res) {
		// Access 즉시 무효화(선택)
		String at = authorization.substring("Bearer ".length()).trim();
		blacklist.revoke(at, user.getExp());

		// Refresh 무효화 + 쿠키 삭제
		refreshStore.revoke(user.getUserId());
		cookieSupport.clearRefreshCookie(res);

		ResponseDTO<Map<String, Object>> response = new ResponseDTO<>();
		response.setStatus("succ");
		response.setData(Map.of("message", "Logged out"));
		return response;
	}

	private String extractRefreshFromCookie(HttpServletRequest req, String cookieName) {
		Cookie[] cookies = req.getCookies();
		if (cookies == null) return null;
		return Arrays.stream(cookies)
				.filter(c -> cookieName.equals(c.getName()))
				.map(Cookie::getValue)
				.findFirst()
				.orElse(null);
	}


}
