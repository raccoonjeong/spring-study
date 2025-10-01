package com.study.project.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.study.project.dto.JpaBoardDTO;
import com.study.project.entity.JpaBoardEntity;
import com.study.project.repository.JpaBoardRepository;

@Service
public class JpaBoardService {

	private final JpaBoardRepository repository;

	public JpaBoardService(JpaBoardRepository repository) {
		this.repository = repository;
	}

	public List<JpaBoardDTO> findAll(int pageNo) {

		Pageable pageable = PageRequest.of(pageNo, 10, Sort.by(Sort.Direction.DESC, "boardNum"));
	    Page<JpaBoardDTO> page = repository.findAll(pageable).map(JpaBoardDTO::from);
		//
		return page.getContent();
	}

	public JpaBoardEntity save(JpaBoardDTO boardDto) {
		// TODO Auto-generated method stub

		JpaBoardEntity entity = new JpaBoardEntity();

		entity.setUserId(boardDto.getUserId());
		entity.setUserName(boardDto.getUserName());
		entity.setBoardContent(boardDto.getBoardContent());
		entity.setBoardSubject(boardDto.getBoardSubject());
		entity.setRegDate(LocalDate.now());

		return repository.save(entity);
	}

	public JpaBoardEntity findById(Integer num) {

		JpaBoardEntity board = repository.findById(num).orElseThrow(() -> new RuntimeException("해당하는 글이 없습니다."));

		return board;
	}
	@Transactional
	public void boardUpdate(JpaBoardDTO boardDTO) {
		// TODO Auto-generated method stub
		JpaBoardEntity board = repository.findById(boardDTO.getBoardNum()).orElseThrow(() -> new RuntimeException("해당하는 글이 없습니다."));

		board.setBoardSubject(boardDTO.getBoardSubject());
		board.setBoardContent(boardDTO.getBoardContent());
		board.setUserId(boardDTO.getUserId());
		board.setUserName(boardDTO.getUserName());
		board.setUptDate(LocalDate.now());

	}

	@Transactional
	public int boardUpdateJPQL(JpaBoardDTO boardDTO) {
		return repository.updateBoardJPQL(boardDTO.getBoardNum(), boardDTO.getBoardSubject(), boardDTO.getBoardContent(), boardDTO.getUserId(), boardDTO.getUserName(), LocalDate.now());
	}
	@Transactional
	public void boardDelete(List<Integer> boardNums) {
		//

	}

	@Transactional
	public int boardDeleteJPQL(List<Integer> boardNums) {

		int result = repository.deleteBoardJPQL(boardNums);

		return result;
	}


}
