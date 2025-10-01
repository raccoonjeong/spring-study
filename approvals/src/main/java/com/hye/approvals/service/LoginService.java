package com.hye.approvals.service;

import com.hye.approvals.dto.LoginDTO;
import com.hye.approvals.dto.UserDTO;

public interface LoginService {

	UserDTO login(LoginDTO dto) throws RuntimeException;

}
