package com.hye.approvals.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.hye.approvals.dto.ApprovalActionDTO;
import com.hye.approvals.dto.ApprovalHistoryDTO;
import com.hye.approvals.dto.ApprovalItemDTO;
import com.hye.approvals.dto.SearchDTO;

@Mapper
public interface ApprovalMapper {

	List<ApprovalItemDTO> getApprovalItems(SearchDTO search);

	ApprovalItemDTO getApprovalItem(int num);

	List<ApprovalHistoryDTO> getApprovalHistories(int num);

	int getNextNumber();

	int create(ApprovalItemDTO item);

	int insertHistory(ApprovalHistoryDTO history);

	void updateApprovalStatus(ApprovalActionDTO action);

	int totalCount(SearchDTO searchDTO);

}
