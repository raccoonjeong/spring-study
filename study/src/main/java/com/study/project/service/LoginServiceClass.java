package com.study.project.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.study.project.repository.LoginMapper;

@Service
public class LoginServiceClass implements LoginServiceInter{

	@Autowired
	public LoginMapper loginMapper;

	@Override
	public List<Map<String, Object>> loginList() {
		// TODO Auto-generated method stub
		return loginMapper.loginList();
	}
	

}
