package com.study.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.study.project.dto.RestBoardDTO;
import com.study.project.service.BoardServiceInter;
import com.study.project.service.RestBoardServiceInter;

@RestController
@RequestMapping("/board")
public class RestBoardController {

	private final RestBoardServiceInter service;

	public RestBoardController(RestBoardServiceInter service) {
		this.service  = service;
	}


	@GetMapping
	public List<RestBoardDTO> findAll() {
		System.out.println("===REST LIST===");
		List<RestBoardDTO> list = service.findAll();

		return list;
	}

	@GetMapping("/{num}")
	public RestBoardDTO detail(@PathVariable(name="num") int num) {
		System.out.println("===REST DETAIL===");
		RestBoardDTO board = service.findById(num);

		return board;
	}

	@PostMapping
	public Map<String, Object> insert(@RequestBody RestBoardDTO dto) {

		System.out.println("===REST INSERT===");
		int insert = service.register(dto);
		Map<String, Object> status = new HashMap<String, Object>();

		if (insert == 0) {
			status.put("stus", "fail");

		} else {
			status.put("stus", "succ");
		}

		return status;
	}

	@PutMapping
	public Map<String, Object> update(@RequestBody RestBoardDTO updateMap) {

		System.out.println("===REST UPDATE===");
		int update = service.update(updateMap);
		Map<String, Object> status = new HashMap<String, Object>();

		if (update == 0) {
			status.put("stus", "fail");

		} else {
			status.put("stus", "succ");
		}

		return status;
	}

	@DeleteMapping
	public Map<String, Object> delete(@RequestBody Map<String, List<Integer>> deleteMap) {
		System.out.println("===REST DELETE===");
		Map<String, Object> status = new HashMap<>();

		List<Integer> deleteList = deleteMap.get("boardNums");

		if(CollectionUtils.isEmpty(deleteList)) {
			status.put("stus", "fail");
			return status;
		}

		int delete = service.delete(deleteList);

		if (delete == 0) {
			status.put("stus", "fail");

		} else {
			status.put("stus", "succ");
		}

		return status;
	}



}
