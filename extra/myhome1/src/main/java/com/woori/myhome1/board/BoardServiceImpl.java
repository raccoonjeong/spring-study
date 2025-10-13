package com.woori.myhome1.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// 지금은 인터페이스를 안만들어도 된다.
// 스프링 처음 나올 때는 DI (Dependency Injection)을 xml 파일로 했다.
/*
 * <bean id="boardDao" class="com.board.Board">
 * </bean>
 *
 * 코딩에는
 * BoardDao dao; // 옛날방식
 *
 * Controller -> Service -> Dao 무조건 이 구조!!
 */
@Service
public class BoardServiceImpl implements BoardService{

//	BoardDao dao = new BoardDaoImpl();
//	계속적으로 클라이언트의 요청이 올때마다 객체가 계속 만들어졌다 사라졌다 해야 한다.
//	시스템에 과중한 부담이 된다.
//	스프링이 객체를 만들어서 그 객체 주소를 우리한테 전달한다

	// 객체를 연결하는 방법이 문제가 있다 => 생성자를 이용해서 객체전달을 하자.
//	@Autowired
//	BoardDao dao;

	@Autowired
	private final BoardDao dao;

	public BoardServiceImpl(BoardDao dao) {
		this.dao = dao;
	}

	@Override
	public List<BoardDto> getList(BoardDto dto) {
		return dao.getList(dto);
	}

	@Override
	public void insert(BoardDto dto) {

	}

	@Override
	public BoardDto getView(String id) {
		return null;
	}



}
