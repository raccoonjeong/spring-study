package com.study.project.dto;

import java.time.LocalDate;

import com.study.project.entity.JpaBoardEntity;

public class JpaBoardDTO {
	private int boardNum;
	private String userId;
	private String userName;
	private String boardSubject;
	private String boardContent;
	private LocalDate regDate;
	private LocalDate uptDate;
	private int viewCnt;

	public static JpaBoardDTO from(JpaBoardEntity entity) {
		JpaBoardDTO dto = new JpaBoardDTO();
		dto.setBoardNum(entity.getBoardNum());
		dto.setUserId(entity.getUserId());
		dto.setUserName(entity.getUserName());
		dto.setBoardSubject(entity.getBoardSubject());
		dto.setBoardContent(entity.getBoardContent());
		dto.setRegDate(entity.getRegDate());
		dto.setUptDate(entity.getUptDate());
		return dto;
	}

	public int getBoardNum() {
		return boardNum;
	}
	public void setBoardNum(int boardNum) {
		this.boardNum = boardNum;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getBoardSubject() {
		return boardSubject;
	}
	public void setBoardSubject(String boardSubject) {
		this.boardSubject = boardSubject;
	}
	public String getBoardContent() {
		return boardContent;
	}
	public void setBoardContent(String boardContent) {
		this.boardContent = boardContent;
	}
	public LocalDate getRegDate() {
		return regDate;
	}
	public void setRegDate(LocalDate regDate) {
		this.regDate = regDate;
	}
	public LocalDate getUptDate() {
		return uptDate;
	}
	public void setUptDate(LocalDate uptDate) {
		this.uptDate = uptDate;
	}
	public int getViewCnt() {
		return viewCnt;
	}
	public void setViewCnt(int viewCnt) {
		this.viewCnt = viewCnt;
	}


}
