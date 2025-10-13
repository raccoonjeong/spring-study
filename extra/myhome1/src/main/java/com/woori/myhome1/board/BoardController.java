package com.woori.myhome1.board;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import jakarta.servlet.http.HttpServletRequest;

@Controller // 이거 있는 파일을 다 찾아서 객체를 만든다
public class BoardController {

	// @RequestMapping -- 화면에 url :가상주소 해석해서
	//                    호출할 함수와 연동작업을 한다
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String index() {
		System.out.println("Index");

		BoardDto dto = new BoardDto();
		dto.setContents(null);
		return "index";
		// 요청을 받아서 처리하고 index.html파일을 반환하라

	}

	@RequestMapping(value="/add")
	public String add(@RequestParam(value="x")Integer x,
					  @RequestParam(value="y")Integer y,
					  HttpServletRequest req,
					  Model model) {
		// HttpServletReqeust -> 클라이언트로부터 요청을 받아오기도 하지만
		// 클라이언트에 새로운 내용을 저장하기도 한다
		// Model 객체에 정보를 저장해서 html을 보낸다
		int result = x + y;
		// model -> Controller -> html페이지에 값을 전달하고자
		// 할때, request 객체 저장
		model.addAttribute("x", x);
		model.addAttribute("y", y);
		model.addAttribute("result", result);

		// "/template/add.html"
		return "add";
	}

	@RequestMapping(value="/add2/{x}/{y}")
	public String add2(@PathVariable("x")int x,
					   @PathVariable("y") int y,
					   Model model) {

		int result = x + y;

		model.addAttribute("x", x);
		model.addAttribute("y", y);
		model.addAttribute("result", result);

		return "add";
	}

	@RequestMapping(value="/add3", method=RequestMethod.POST)
	public String add3(@RequestParam("x") Integer x,
					   @RequestParam("y") Integer y,
					   Model model) {

		int result = x + y;

		model.addAttribute("x", x);
		model.addAttribute("y", y);
		model.addAttribute("result", result);

		return "add";
	}

	@RequestMapping("/board/insert")
	public String board_insert(Model model, BoardDto dto) {

		System.out.println(dto);
		model.addAttribute("boardDto", dto);
		return "board";
	}

}
