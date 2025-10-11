package com.hye.approvals.dto;

public class ApprovalActionDTO {

	private Integer num; // 글번호

	private String action;

	private String approverId; // 요청자 ID
	private Integer levelNo;
	private String statusCode;

	public ApprovalActionDTO() {

	}

	public ApprovalActionDTO(Integer num, String action, String approverId, Integer levelNo, String statusCode) {
		this.num = num;
		this.action = action;
		this.approverId = approverId;
		this.levelNo = levelNo;
		this.statusCode = statusCode;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public Integer getLevelNo() {
		return levelNo;
	}

	public void setLevelNo(Integer levelNo) {
		this.levelNo = levelNo;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public String getApproverId() {
		return approverId;
	}

	public void setApproverId(String approverId) {
		this.approverId = approverId;
	}

	public String getStatusCode() {
		return statusCode;
	}

	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}





}
