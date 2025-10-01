package com.hye.approvals.service;

import java.util.List;
import java.util.Map;

import com.hye.approvals.dto.ApprovalActionDTO;
import com.hye.approvals.dto.ApprovalHistoryDTO;
import com.hye.approvals.dto.ApprovalItemDTO;

public interface ApprovalService {

	List<ApprovalItemDTO> getList();
	Map<String, Object> getDetail(int num);
	int getNextNumber();
	int create(ApprovalItemDTO item);
	int processApproval(ApprovalActionDTO action);

}
