package com.hye.approvals.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hye.approvals.dto.ApprovalActionDTO;
import com.hye.approvals.dto.ApprovalHistoryDTO;
import com.hye.approvals.dto.ApprovalItemDTO;
import com.hye.approvals.mapper.ApprovalMapper;

@Service
public class ApprovalServiceImpl implements ApprovalService {

	private final ApprovalMapper mapper;

	public ApprovalServiceImpl(ApprovalMapper mapper) {

		this.mapper = mapper;

	}
	@Override
	public List<ApprovalItemDTO> getList() {

		List<ApprovalItemDTO> list = mapper.getApprovalItems();

		return list;
	}

	@Override
	public Map<String, Object> getDetail(int num) {
		Map<String, Object> result = new HashMap<>();

		ApprovalItemDTO item = mapper.getApprovalItem(num);
		List<ApprovalHistoryDTO> histories = mapper.getApprovalHistories(num);

		result.put("item", item);
		result.put("histories", histories);

		return result;
	}
	@Override
	public int getNextNumber() {

		return mapper.getNextNumber();
	}
	@Override
	@Transactional
	public int create(ApprovalItemDTO item) {
		mapper.create(item);
		Integer approvalNum = item.getNum();

		// TODO: item.getWriterId() or item.getApproverId()
		ApprovalHistoryDTO history = new ApprovalHistoryDTO(approvalNum, item.getWriterId(), item.getStatusCode());
		mapper.insertHistory(history);
		return 1;
	}
	@Override
	@Transactional
	public int processApproval(ApprovalActionDTO action) {

		mapper.updateApprovalStatus(action);

		ApprovalHistoryDTO history = new ApprovalHistoryDTO(
				action.getNum(),
				action.getApproverId(),
				action.getStatusCode());
		mapper.insertHistory(history);
		return 1;
	}



}
