package com.hye.approvals.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.hye.approvals.dto.LoginDTO;
import com.hye.approvals.dto.UserDTO;

@Mapper
public interface LoginMapper {

	UserDTO login(LoginDTO dto);
}
