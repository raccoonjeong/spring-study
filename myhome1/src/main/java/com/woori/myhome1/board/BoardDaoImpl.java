package com.woori.myhome1.board;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

// 이 클래스는 데이터베이스에 데이터 읽고 쓰기 담당
@Repository
public class BoardDaoImpl implements BoardDao{
	List<BoardDto> list = new ArrayList<BoardDto>();

	public BoardDaoImpl() {
		list.add(new BoardDto(1, "A", "1", "a@cc.dom", "신림1동"));
		list.add(new BoardDto(2, "B", "2", "b@cc.dom", "신림1동"));
		list.add(new BoardDto(3, "C", "3", "c@cc.dom", "신림1동"));
		list.add(new BoardDto(4, "D", "4", "d@cc.dom", "신림1동"));
		list.add(new BoardDto(5, "E", "5", "e@cc.dom", "신림1동"));
	}

	@Override
	public List<BoardDto> getList(BoardDto dto) {
		return list;
	}

	@Override
	public void insert(BoardDto dto) {
		// TODO Auto-generated method stub

	}

	@Override
	public BoardDto getView(String id) {
		// TODO Auto-generated method stub
		return null;
	}

}
