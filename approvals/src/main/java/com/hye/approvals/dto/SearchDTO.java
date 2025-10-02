package com.hye.approvals.dto;

public class SearchDTO {
	private int curPage;
	private int pageSize; // limit
	private int offset; // offset


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
