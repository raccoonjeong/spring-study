package com.hye.approvals.dto;

public class ApprovalActionDTO {

	private Integer num; // 글번호

	private String approverId; // 요청자 ID

	private String statusCode;

	public ApprovalActionDTO() {

	}

	public ApprovalActionDTO(Integer num, String approverId, String statusCode) {
		this.num = num;
		this.approverId = approverId;
		this.statusCode = statusCode;
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
