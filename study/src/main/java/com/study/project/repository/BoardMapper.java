package com.study.project.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface BoardMapper {

	List<Map<String, Object>> list();

	int insert(Map<String, Object> insertMap);

	Map<String, Object> detail(int num);

	int update(Map<String, Object> updateMap);

	int delete(@Param("deleteList")Map<String, List<Integer>> deleteList);

	int increaseViewCount(int num);
}
