package com.study.project.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.study.project.dto.RestBoardDTO;
import com.study.project.dto.RestFileDTO;
import com.study.project.dto.SearchDTO;

@Mapper
public interface RestBoardMapper {

	List<RestBoardDTO> findAll(SearchDTO searchDTO);

	int create(RestBoardDTO insertMap);

	RestBoardDTO findById(int num);

	int update(RestBoardDTO updateMap);

	int delete(List<Integer> deleteList);

	int increaseViewCount(int num);

	int totalCount(SearchDTO searchDTO);

	int fileCreate(RestFileDTO fileDTO);
}
