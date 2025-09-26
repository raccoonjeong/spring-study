package com.study.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.study.project.dto.JpaBoardDTO;
import com.study.project.entity.JpaBoardEntity;
import com.study.project.service.JpaBoardService;

@RestController
@RequestMapping("/jpa/board")
public class JpaBoardController {

	private final JpaBoardService service;

	public JpaBoardController(JpaBoardService service) {
		this.service = service;
	}

	@GetMapping
	public List<JpaBoardEntity> findAll() {

		return service.findAll();

	}

	@PostMapping
	public Map<String, Object> save(@RequestBody JpaBoardDTO boardDto) {

		JpaBoardEntity insert = service.save(boardDto);

		Map<String, Object> status = new HashMap<>();

		if (insert.getBoardNum() > 0) {
			status.put("status", "succ");
		} else {
			status.put("status", "fail");
		}

		return status;

	}


}
