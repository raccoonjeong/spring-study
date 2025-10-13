package com.study.project.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.project.service.LoginServiceInter;

@Controller
public class LoginController {

	@Autowired
	public LoginServiceInter service;
	
	@RequestMapping("login")
	@ResponseBody
	public List<Map<String, Object>> login() {
		
		List<Map<String, Object>> loginList = service.loginList();
		
		return loginList;
	}
	
}
