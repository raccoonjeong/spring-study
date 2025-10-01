package com.woori.project.board;

import org.springframework.stereotype.Service;

import java.util.List;

// * Dao - 테이블당 하나, insert, update, delete, select
// 여러개의 테이블을 join해서 가져올 때는 복합 Dao - select만.
// * 서비스 - 화면 단위(업무 단위)
// 서비스 하나는 여러개의 Dao를 소유할 수 있다.
// 트랜잭션 처리, 많은 연산이 필요하다.

@Service
public class BoardServiceImpl implements BoardService{

    private final BoardDao boardDao;

    public BoardServiceImpl(BoardDao boardDao) {
        this.boardDao = boardDao;
    }


    @Override
    public List<BoardDto> getList(BoardDto dto) {
        return boardDao.getList(dto);
    }

    @Override
    public void insert(BoardDto dto) {

    }

    @Override
    public BoardDto getView(int id) {
        return null;
    }
}
