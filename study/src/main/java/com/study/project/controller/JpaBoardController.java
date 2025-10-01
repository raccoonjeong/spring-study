package com.study.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

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
	public List<JpaBoardDTO> findAll(@RequestParam(required = false, defaultValue = "1") int page) {

		return service.findAll(page);

	}

	@PostMapping
	public Map<String, Object> save(@ModelAttribute JpaBoardDTO boardDto, @RequestPart
			(name = "files", required = false) List<MultipartFile> files) {

		JpaBoardEntity insert = service.save(boardDto);

		Map<String, Object> status = new HashMap<>();

		if (insert.getBoardNum() > 0) {
			status.put("status", "succ");
		} else {
			status.put("status", "fail");
		}

		return status;

	}

	@GetMapping("/{num}")
	public JpaBoardEntity findById(@PathVariable Integer num) {

		return service.findById(num);

	}

	@PutMapping
	public Map<String, Object> boardUpdate(@RequestBody JpaBoardDTO boardDTO) {

		Map<String, Object> status = new HashMap<String, Object>();
		try {
			service.boardUpdate(boardDTO);
//			service.boardUpdateJPQL(boardDTO);
			status.put("status", "succ");

		} catch (RuntimeException e) {
			status.put("status", "fail");
		}
		return status;

	}

	@DeleteMapping
	public Map<String, Object> boardDelete(@RequestBody List<Integer> boardNums) {

		Map<String, Object> status = new HashMap<String, Object>();
		try {
			service.boardDeleteJPQL(boardNums);
//			service.boardDeleteJPQL(boardDTO);
			status.put("status", "succ");

		} catch (RuntimeException e) {
			status.put("status", "fail");
		}
		return status;

	}


}
