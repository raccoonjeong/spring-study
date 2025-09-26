package com.woori.myhome1.board;

import java.util.List;

// 트랜잭션 차이가 주 목적, 여러개의 DAO를 처리한다
// 서비스는 별도의 데이터 처리가 주 목적, 보통은 파일처리 컨트롤러나 아니면 별도의 클래스 만들어서 처리를 많이 함
public interface BoardService {
	List<BoardDto> getList(BoardDto dto); // 검색하거나 페이징
	void insert(BoardDto dto);
	BoardDto getView(String id);

}
