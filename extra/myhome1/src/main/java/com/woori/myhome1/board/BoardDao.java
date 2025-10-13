package com.woori.myhome1.board;

import java.util.List;

// 보통 인터페이스의 경우에는 기능명 Dao를 붙인다.
//
public interface BoardDao {
	List<BoardDto> getList(BoardDto dto); // 검색하거나 페이징
	void insert(BoardDto dto);
	BoardDto getView(String id);

}
