package com.hye.approvals.dto;

import java.time.LocalDate;

public class ApprovalHistoryDTO {
	private Integer hisNum;
	private Integer approvalNum;
	private String procId;
	private String procName;
	private String positionCd;
	private String positionName;
	private String statusCode;
	private String statusName;
	private LocalDate hisRegDate;

	public ApprovalHistoryDTO() {

	}
	public ApprovalHistoryDTO(Integer approvalNum, String procId, String statusCode) {
		this.approvalNum = approvalNum;
		this.procId = procId;
		this.statusCode = statusCode;
	}


	public Integer getHisNum() {
		return hisNum;
	}
	public void setHisNum(Integer hisNum) {
		this.hisNum = hisNum;
	}
	public Integer getApprovalNum() {
		return approvalNum;
	}
	public void setApprovalNum(Integer approvalNum) {
		this.approvalNum = approvalNum;
	}
	public String getProcId() {
		return procId;
	}
	public void setProcId(String procId) {
		this.procId = procId;
	}
	public String getProcName() {
		return procName;
	}
	public void setProcName(String procName) {
		this.procName = procName;
	}
	public String getPositionCd() {
		return positionCd;
	}
	public void setPositionCd(String positionCd) {
		this.positionCd = positionCd;
	}
	public String getPositionName() {
		return positionName;
	}
	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}
	public String getStatusCode() {
		return statusCode;
	}
	public void setStatusCode(String statusCode) {
		this.statusCode = statusCode;
	}
	public String getStatusName() {
		return statusName;
	}
	public void setStatusName(String statusName) {
		this.statusName = statusName;
	}
	public LocalDate getHisRegDate() {
		return hisRegDate;
	}
	public void setHisRegDate(LocalDate hisRegDate) {
		this.hisRegDate = hisRegDate;
	}



}
