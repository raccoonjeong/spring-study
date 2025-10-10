package com.hye.approvals.auth;

import com.hye.approvals.dto.UserDTO;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;

/**
 * /auth/login, /auth/token, /health는 공개
 * 그 외 경로는 Access 토큰(Bearer)을 검사하고, 성공 시 request attribute에 사용자 정보 저장
 */
@Component
@Order(1)
public class JwtAuthFilter implements Filter {
    private static final Logger log = LoggerFactory.getLogger(JwtAuthFilter.class);
    private final AccessTokenService accessTokenService;
    private final TokenBlacklist blacklist;

    public JwtAuthFilter(AccessTokenService accessTokenService, TokenBlacklist blacklist) {
        this.accessTokenService = accessTokenService;
        this.blacklist = blacklist;
    }

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String path = request.getRequestURI();

        // ★ 프리플라이트는 통과
        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            chain.doFilter(req, res);
            return;
        }

        // 공개 엔드포인트
        if (path.startsWith("/auth/login") || path.startsWith("/auth/token") || path.startsWith("/health")) {
            chain.doFilter(req, res);
            return;
        }

        // 보호 엔드포인트: Access 토큰 검증
        String auth = request.getHeader("Authorization");
        if (auth == null || !auth.startsWith("Bearer ")) {
            log.info("❌ Missing or invalid Authorization header");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Missing Bearer token");
            return;
        }

        String token = auth.substring("Bearer ".length()).trim();

        if (blacklist.isRevoked(token)) {
            log.info("❌ Revoked token");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token revoked");
            return;
        }

        try {
            Jws<Claims> jws = accessTokenService.parse(token);
            Claims c = jws.getBody();

//            request.setAttribute("userId", c.getSubject());
//            request.setAttribute("empName", c.get("empName"));
//            request.setAttribute("levelNo", c.get("levelNo"));
//            request.setAttribute("exp", c.getExpiration().getTime());
            UserDTO user = new UserDTO();
            user.setUserId(c.getSubject());
            user.setEmpName((String) c.get("empName"));
            user.setLevelNo((Integer) c.get("levelNo"));
            user.setExp(c.getExpiration().getTime()); // 필요하면 만료 등 추가 필드도

            // ★ 키 이름을 "user"로 통일
            request.setAttribute("user", user);

            request.setAttribute("exp", c.getExpiration().getTime());

            chain.doFilter(req, res);
        } catch (Exception e) {
            log.error("❌ Invalid token: {}", e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
        }
    }
}

