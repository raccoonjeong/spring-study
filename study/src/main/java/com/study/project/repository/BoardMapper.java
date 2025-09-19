package com.study.project.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BoardMapper {

	List<Map<String, Object>> list();

	int insert(Map<String, Object> insertMap);

	Map<String, Object> detail(int num);

	int update(Map<String, Object> updateMap);

	int delete(Map<String, Object> deleteMap);

}
