package com.board.study.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

import com.board.study.service.LoginService;

@Controller
public class LoginController {
	
	@Autowired
	public LoginService service;


}
