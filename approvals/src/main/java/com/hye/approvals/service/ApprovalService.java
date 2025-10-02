package com.hye.approvals.service;

import java.util.List;
import java.util.Map;

import com.hye.approvals.dto.ApprovalActionDTO;
import com.hye.approvals.dto.ApprovalHistoryDTO;
import com.hye.approvals.dto.ApprovalItemDTO;
import com.hye.approvals.dto.PageDTO;
import com.hye.approvals.dto.SearchDTO;

public interface ApprovalService {

	PageDTO<ApprovalItemDTO> getList(SearchDTO search);
	Map<String, Object> getDetail(int num);
	int getNextNumber();
	int create(ApprovalItemDTO item);
	int processApproval(ApprovalActionDTO action);
//	PageDTO<ApprovalItemDTO> calculatePage(SearchDTO search);

}
