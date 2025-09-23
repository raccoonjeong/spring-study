package com.study.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.project.service.BoardServiceInter;

@Controller
public class BoardController {

	private static final Logger log = LoggerFactory.getLogger(BoardController.class);
	@Autowired
	public BoardServiceInter service;

	@RequestMapping("list")
	@ResponseBody
	public List<Map<String, Object>> list() {
		log.info("===NOT REST LIST===");

		List<Map<String, Object>> list = service.list();

		return list;
	}

	@RequestMapping("/detail/{num}")
	@ResponseBody
	public Map<String, Object> detail(@PathVariable(name="num") int num) {
		log.info("===NOT REST DETAIL===");
		Map<String, Object> board = service.detail(num);

		return board;
	}

	@RequestMapping("insert")
	@ResponseBody
	public Map<String, Object> insert(@RequestBody Map<String, Object> insertMap) {
		log.info("===NOT REST INSERT===");
		int insert = service.insert(insertMap);
		Map<String, Object> status = new HashMap<String, Object>();

		if (insert == 0) {
			status.put("stus", "fail");

		} else {
			status.put("stus", "succ");
		}

		return status;
	}

	@RequestMapping("update")
	@ResponseBody
	public Map<String, Object> update(@RequestBody Map<String, Object> updateMap) {
		log.info("===NOT REST UPDATE===");
		int update = service.update(updateMap);
		Map<String, Object> status = new HashMap<String, Object>();

		if (update == 0) {
			status.put("stus", "fail");

		} else {
			status.put("stus", "succ");
		}

		return status;
	}

	@RequestMapping("delete")
	@ResponseBody
	public Map<String, Object> delete(@RequestBody Map<String, List<Integer>> deleteMap) {
		log.info("===NOT REST DELETE===");
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

