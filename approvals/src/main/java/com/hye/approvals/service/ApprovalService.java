package com.hye.approvals.service;

import com.hye.approvals.dto.*;

import java.util.Map;

public interface ApprovalService {

	PageDTO<ApprovalItemDTO> getList(SearchDTO search);
	Map<String, Object> getDetail(UserDTO user, int num);
	int getNextNumber();
	int create(ApprovalItemDTO item);
	int processApproval(ApprovalActionDTO action);
//	PageDTO<ApprovalItemDTO> calculatePage(SearchDTO search);

}
