package com.woori.project.board;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class BoardDaoImpl implements BoardDao{

    List<BoardDto> list = new ArrayList<>();

    public BoardDaoImpl() {
        for (int i = 0; i <= 12; i++) {
            list.add(new BoardDto(i, "제목"+i, "내용"+i, "작성자"+i, "2025-09-29"));
        }
    }

    @Override
    public List<BoardDto> getList(BoardDto dto) {

        return list;
    }

    @Override
    public void insert(BoardDto dto) {

    }

    @Override
    public BoardDto getView(int id) {
        return null;
    }
}
