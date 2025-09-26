package com.study.project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.study.project.dto.JpaBoardDTO;
import com.study.project.entity.JpaBoardEntity;
import com.study.project.repository.JpaBoardRepository;

@Service
public class JpaBoardService {

	private final JpaBoardRepository repository;

	public JpaBoardService(JpaBoardRepository repository) {
		this.repository = repository;
	}

	public List<JpaBoardEntity> findAll() {
		// TODO Auto-generated method stub
		return repository.findAll();
	}

	public JpaBoardEntity save(JpaBoardDTO boardDto) {
		// TODO Auto-generated method stub

		JpaBoardEntity entity = new JpaBoardEntity();

		entity.setUserId(boardDto.getUserId());
		entity.setUserName(boardDto.getUserName());
		entity.setBoardContent(boardDto.getBoardContent());
		entity.setBoardSubject(boardDto.getBoardSubject());


		return repository.save(entity);
	}

}
