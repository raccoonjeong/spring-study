package com.hye.approvals.mapper;

import com.hye.approvals.dto.ApprovalActionDTO;
import com.hye.approvals.dto.ApprovalHistoryDTO;
import com.hye.approvals.dto.ApprovalItemDTO;
import com.hye.approvals.dto.SearchDTO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

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

    String getCurrentStatus(Integer num);

	int update(ApprovalItemDTO item);
}
