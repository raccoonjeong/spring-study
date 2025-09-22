package com.study.project.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.project.repository.BoardMapper;

@Service
public class BoardServiceClass implements BoardServiceInter{

	@Autowired
	BoardMapper boardMapper;
	
	@Override
	public List<Map<String, Object>> list() {

		return boardMapper.list();
	}

	@Override
	@ResponseBody
	public int insert(Map<String, Object> insertMap) {
		
		int insert  = boardMapper.insert(insertMap);
		
		return insert;
	}

	@Override
	@Transactional
	public Map<String, Object> detail(int num) {

		boardMapper.increaseViewCount(num);
		return boardMapper.detail(num);
	}

	@Override
	public int update(Map<String, Object> updateMap) {
		
		return boardMapper.update(updateMap);
	}

	@Override
	public int delete(List<Integer> deleteList) {

		return boardMapper.delete(deleteList);
	}

}
