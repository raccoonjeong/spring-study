package com.study.project.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.study.project.dto.RestBoardDTO;
import com.study.project.dto.RestFileDTO;
import com.study.project.dto.RestPageDTO;
import com.study.project.dto.SearchDTO;

public interface RestBoardServiceInter {

//	List<RestBoardDTO> findAll();

	int create(RestBoardDTO insertMap, List<MultipartFile> files) throws Exception;

	RestBoardDTO findById(int num);

	int update(RestBoardDTO updateMap);

	int delete(List<Integer> deleteList);

	List<RestBoardDTO> findAll(SearchDTO searchDTO);

	RestPageDTO page(SearchDTO searchDTO);

	RestBoardDTO read(int num);

	List<RestFileDTO> findFile(int num);

}
