package com.study.project.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.study.project.dto.RestBoardDTO;

@Mapper
public interface RestBoardMapper {

	List<RestBoardDTO> findAll();

	int register(RestBoardDTO insertMap);

	RestBoardDTO findById(int num);

	int update(RestBoardDTO updateMap);

	int delete(List<Integer> deleteList);

	int increaseViewCount(int num);
}
