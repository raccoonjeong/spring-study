package com.study.project.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.CollectionUtils;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.study.project.dto.RestBoardDTO;
import com.study.project.dto.RestFileDTO;
import com.study.project.dto.RestPageDTO;
import com.study.project.dto.RestResponseDTO;
import com.study.project.dto.SearchDTO;
import com.study.project.service.RestBoardServiceInter;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/board")

public class RestBoardController {
	private static final Logger log = LoggerFactory.getLogger(RestBoardController.class);
	private final RestBoardServiceInter service;

	public RestBoardController(RestBoardServiceInter service) {
		this.service  = service;
	}


	@GetMapping
	public RestResponseDTO findAll() {
		log.info("===REST LIST===");

		SearchDTO searchDTO = new SearchDTO();
		searchDTO.setCurPage(1);
		searchDTO.setPageSize(5);
		searchDTO.setOffset(0);

		List<RestBoardDTO> list = service.findAll(searchDTO);
		RestPageDTO pageDTO = service.page(searchDTO);

		RestResponseDTO resDTO = new RestResponseDTO();
		resDTO.setList(list);
		resDTO.setPage(pageDTO);

		return resDTO;
	}

	@PostMapping("/search")
	public RestResponseDTO search(@RequestBody SearchDTO searchDTO){
		log.info("===REST SEARCH===");

		int curPage = searchDTO.getCurPage();
		int pageSize = searchDTO.getPageSize();
		int offset = (curPage - 1) * pageSize;

		searchDTO.setOffset(offset);

		List<RestBoardDTO> list = service.findAll(searchDTO);
		RestPageDTO pageDTO = service.page(searchDTO);

		RestResponseDTO resDTO = new RestResponseDTO();
		resDTO.setList(list);
		resDTO.setPage(pageDTO);

		return resDTO;
	}

	@GetMapping("/{num}")
	public Map<String, Object> read(@PathVariable(name="num") int num) {
		log.info("===REST DETAIL===");

		Map<String, Object> dataMap = new HashMap<String, Object>();

		RestBoardDTO boardDto = service.read(num);
		List<RestFileDTO> listFile = service.findFile(num);

		dataMap.put("boardDto", boardDto);
		dataMap.put("listFile", listFile);

//		RestBoardDTO board = service.findById(num);

		return dataMap;
	}

	@PostMapping("fileDownload")
	public void fileDownload(@RequestBody RestFileDTO fileDTO, HttpServletResponse response) throws IOException{


		File f = new File(fileDTO.getSavePath(), fileDTO.getSaveName());

		if(!f.exists()) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
	        return;

		}
        // file 다운로드 설정
		response.setContentType("application/octet-stream");
	    response.setHeader("Content-Disposition", "attachme0nt; filename=\""
	                       + URLEncoder.encode(fileDTO.getRealName(), "UTF-8") + "\"");
        // response 객체를 통해서 서버로부터 파일 다운로드
        OutputStream os = response.getOutputStream();
        // 파일 입력 객체 생성
        FileInputStream fis = new FileInputStream(f);
        FileCopyUtils.copy(fis, os);
        fis.close();
        os.close();

	}

	@PostMapping
	public Map<String, Object> create(@ModelAttribute RestBoardDTO dto,
			@RequestPart(value="files", required=false) List<MultipartFile> files) throws Exception {

		log.info("===REST INSERT===");

		int insert = service.create(dto, files);
		Map<String, Object> status = new HashMap<String, Object>();


		status.put("stus", insert > 0 ? "succ" : "fail");
		return status;
	}

	@PutMapping
	public Map<String, Object> update(@RequestBody RestBoardDTO updateMap) {

		log.info("===REST UPDATE===");
		int update = service.update(updateMap);
		Map<String, Object> status = new HashMap<String, Object>();

		status.put("stus", update > 0 ? "succ" : "fail");

		return status;
	}

	@DeleteMapping
	public Map<String, Object> delete(@RequestBody List<Integer> deleteList) {
		log.info("===REST DELETE===");
		Map<String, Object> status = new HashMap<>();

		if(CollectionUtils.isEmpty(deleteList)) {
			status.put("stus", "fail");
			return status;
		}

		int delete = service.delete(deleteList);

		status.put("stus", delete > 0 ? "succ" : "fail");

		return status;
	}



}
