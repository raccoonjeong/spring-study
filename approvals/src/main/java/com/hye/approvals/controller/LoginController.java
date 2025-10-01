package com.hye.approvals.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hye.approvals.dto.LoginDTO;
import com.hye.approvals.dto.ResponseDTO;
import com.hye.approvals.dto.UserDTO;
import com.hye.approvals.service.LoginService;

@RestController
@RequestMapping("login")
public class LoginController {

	private final LoginService service;

	public LoginController(LoginService service) {
		this.service = service;
	}


	@PostMapping
	public ResponseDTO<UserDTO> login(@RequestBody LoginDTO dto) {

		ResponseDTO<UserDTO> response = new ResponseDTO<>();

		try {
			UserDTO user = service.login(dto);
			if (user == null) {
				throw new RuntimeException("로그인 실패!");
			}
			response.setStatus("succ");
			response.setData(user);
		} catch (RuntimeException e) {
			response.setStatus("fail");
			response.setMessage(e.getMessage());
		}

		return response;

	}

}
