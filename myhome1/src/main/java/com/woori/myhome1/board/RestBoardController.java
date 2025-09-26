package com.woori.myhome1.board;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController // 반환 객체를 JSON 형태로 보낸다. RestfulAPI 서버 만드는데 최적화
public class RestBoardController {

	@Autowired
	private final BoardService service; // 객체 한번씩밖에 못만듦

	public RestBoardController(BoardService service) {
		super(); // 부모 생성자 호출, 없어도 호출한다
		this.service = service;
	}

	// @Controller에서는 반환값이 String만 가능
	// 리턴값이 특별히 말이 없으면 template 폴더의 html문서
	// @ResponseBody ->
	@GetMapping("/msg")
	public String getMsg() {
		return "Hello Restful API 서버";
	}

	@GetMapping("/userinfo")
	public Map<String, String> getUserInfo() {
		// Map<키의 타입, 데이터타입> : 키와 값 쌍으로 구성된다.
		Map<String, String> map = new HashMap<>();
		map.put("name", "홍길동");
		map.put("age", "23");
		map.put("adress", "강서");

		return map;
	}

	@GetMapping("/board/list")
	public Map<String, Object> getBoardList(BoardDto dto) {
		// Map<키의 타입, 데이터타입> : 키와 값 쌍으로 구성된다.

		Map<String, Object> map = new HashMap<>();
		map.put("msg", "성공");
		map.put("data", service.getList(dto));

		return map;
	}

	// @RequestBody - 파라미터를 json형태를 받아오고자 할 때 사용한다.
	// json은 키와 값의 형태를 정보를 전송한다
	// 그래서 그런 형태인 HashMap 또는 Dto를 만들어서 가져와야 한다.
	// 정보 전송시 보내는 쪽에서는 {"x": 12, "y": 20} 과 같은 형태로 보내야 한다
	// 이 값을 받아서 다시 map에 담아 보낸다
	@PostMapping("/add")
	public Map<String, Object> add(@RequestBody HashMap<String, String> paramMap) {

		int x = Integer.parseInt(paramMap.get("x"));
		int y = Integer.parseInt(paramMap.get("y"));

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("x", x);
		map.put("y", y);
		map.put("result", x+y);

		return map;
	}

	@PostMapping("/insert")
	public Map<String, Object> insert(@RequestBody BoardDto dto) {

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("dto", dto);

		return map;
	}

}
