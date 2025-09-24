package com.study.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.study.project.dto.RestPageDTO;
import com.study.project.dto.RestResponseDTO;
import com.study.project.dto.SearchDTO;
import com.study.project.service.RestBoardServiceInter;

@RestController
@RequestMapping("/board")

public class RestBoardController {
	private static final Logger log = LoggerFactory.getLogger(RestBoardController.class);
	private final RestBoardServiceInter service;

	public RestBoardController(RestBoardServiceInter service) {
		this.service  = service;
	}


	@GetMapping
	public RestResponseDTO findAll() {
		log.info("===REST LIST===");

		SearchDTO searchDTO = new SearchDTO();
		searchDTO.setCurPage(1);
		searchDTO.setPageSize(5);
		searchDTO.setOffset(0);

		List<RestBoardDTO> list = service.findAll(searchDTO);
		RestPageDTO pageDTO = service.page(searchDTO);

		RestResponseDTO resDTO = new RestResponseDTO();
		resDTO.setList(list);
		resDTO.setPage(pageDTO);

		return resDTO;
	}

	@PostMapping("/search")
	public RestResponseDTO search(@RequestBody SearchDTO searchDTO){
		log.info("===REST SEARCH===");

		int curPage = searchDTO.getCurPage();
		int pageSize = searchDTO.getPageSize();
		int offset = (curPage - 1) * pageSize;

		searchDTO.setOffset(offset);

		List<RestBoardDTO> list = service.findAll(searchDTO);
		RestPageDTO pageDTO = service.page(searchDTO);

		RestResponseDTO resDTO = new RestResponseDTO();
		resDTO.setList(list);
		resDTO.setPage(pageDTO);

		return resDTO;
	}

	@GetMapping("/{num}")
	public RestBoardDTO read(@PathVariable(name="num") int num) {
		log.info("===REST DETAIL===");
		RestBoardDTO board = service.findById(num);

		return board;
	}

	@PostMapping
	public Map<String, Object> create(@RequestBody RestBoardDTO dto) {

		log.info("===REST INSERT===");
		int insert = service.create(dto);
		Map<String, Object> status = new HashMap<String, Object>();


		status.put("stus", insert > 0 ? "succ" : "fail");
		return status;
	}

	@PutMapping
	public Map<String, Object> update(@RequestBody RestBoardDTO updateMap) {

		log.info("===REST UPDATE===");
		int update = service.update(updateMap);
		Map<String, Object> status = new HashMap<String, Object>();

		status.put("stus", update > 0 ? "succ" : "fail");

		return status;
	}

	@DeleteMapping
	public Map<String, Object> delete(@RequestBody List<Integer> deleteList) {
		log.info("===REST DELETE===");
		Map<String, Object> status = new HashMap<>();

		if(CollectionUtils.isEmpty(deleteList)) {
			status.put("stus", "fail");
			return status;
		}

		int delete = service.delete(deleteList);

		status.put("stus", delete > 0 ? "succ" : "fail");

		return status;
	}



}
