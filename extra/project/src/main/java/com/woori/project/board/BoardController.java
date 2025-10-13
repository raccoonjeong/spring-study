package com.woori.project.board;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
// @Controller는 원래 있던 어노테이션, - 함수의 반환값을 String으로 해서 html 템플릿 엔진을
// 호출하거나, @ResponseBody를 추가해서 JSON형태로 반환 가능
// @RestController - 무조건 JSON으로만

@RestController
public class BoardController {

    private final BoardService service;

    public BoardController(BoardService service) {
        this.service = service;
    }

//    public BoardController() {
//        System.out.println("BoardController 생성");
//    }

    @GetMapping("/board/list")
    public Map<String, Object> getList(BoardDto dto) {
        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put("data", service.getList(dto));
        resultMap.put("result", "SUCCESS");

        return resultMap;
    }
}
