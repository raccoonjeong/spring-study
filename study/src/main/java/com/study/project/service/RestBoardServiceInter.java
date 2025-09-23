package com.study.project.service;

import java.util.List;
import java.util.Map;

import com.study.project.dto.RestBoardDTO;
import com.study.project.dto.SearchDTO;

public interface RestBoardServiceInter {

//	List<RestBoardDTO> findAll();

	int create(RestBoardDTO insertMap);

	RestBoardDTO findById(int num);

	int update(RestBoardDTO updateMap);

	int delete(List<Integer> deleteList);

	List<RestBoardDTO> findAll(SearchDTO searchDTO);

}
