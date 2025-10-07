package com.hye.approvals.dto;

public class SearchDTO {
	private int curPage;
	private int pageSize; // limit
	private int offset; // offset

	private String userId;
	private String empName;
	private Integer levelNo;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getEmpName() {
		return empName;
	}

	public void setEmpName(String empName) {
		this.empName = empName;
	}

	public Integer getLevelNo() {
		return levelNo;
	}

	public void setLevelNo(Integer levelNo) {
		this.levelNo = levelNo;
	}

	public int getCurPage() {
		return curPage;
	}
	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}
	public int getPageSize() {
		return pageSize;
	}
	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}
	public int getOffset() {

        return (this.curPage - 1) * this.pageSize;
    }
	public void setOffset(int offset) {

		this.offset = offset;
	}


}
