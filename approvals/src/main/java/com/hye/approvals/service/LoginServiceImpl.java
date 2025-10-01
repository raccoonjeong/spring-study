package com.hye.approvals.service;

import org.springframework.stereotype.Service;

import com.hye.approvals.dto.LoginDTO;
import com.hye.approvals.dto.UserDTO;
import com.hye.approvals.mapper.LoginMapper;

@Service
public class LoginServiceImpl implements LoginService{

	private final LoginMapper mapper;

	public LoginServiceImpl(LoginMapper mapper) {
		this.mapper = mapper;
	}

	@Override
	public UserDTO login(LoginDTO dto) throws RuntimeException{
		UserDTO user = mapper.login(dto);
		if (user == null) {
			throw new RuntimeException("로그인 실패");
		}
		return user;
	}

}
