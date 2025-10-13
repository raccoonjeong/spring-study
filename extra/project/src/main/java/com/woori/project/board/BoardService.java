package com.woori.project.board;

import java.util.List;

public interface BoardService {
    List<BoardDto> getList(BoardDto dto);
    void insert(BoardDto dto);
    BoardDto getView(int id);
}
