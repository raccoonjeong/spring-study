package com.hye.approvals.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hye.approvals.dto.ApprovalActionDTO;
import com.hye.approvals.dto.ApprovalHistoryDTO;
import com.hye.approvals.dto.ApprovalItemDTO;
import com.hye.approvals.dto.PageDTO;
import com.hye.approvals.dto.SearchDTO;
import com.hye.approvals.mapper.ApprovalMapper;


@Service
public class ApprovalServiceImpl implements ApprovalService {

	private final ApprovalMapper mapper;

	public ApprovalServiceImpl(ApprovalMapper mapper) {

		this.mapper = mapper;

	}
	@Override
	public PageDTO<ApprovalItemDTO> getList(SearchDTO search) {

		List<ApprovalItemDTO> list = mapper.getApprovalItems(search);
		PageDTO<ApprovalItemDTO> pageDto = this.calculatePage(search);
		pageDto.setItems(list);

		return pageDto;
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

	private PageDTO<ApprovalItemDTO> calculatePage(SearchDTO searchDTO) {
		// TODO Auto-generated method stub
		int count = mapper.totalCount(searchDTO);

		int curPage = searchDTO.getCurPage();
		int pageSize = searchDTO.getPageSize();
		int blockSize = 5;

		int totalPages = (int) Math.ceil(count / (double)pageSize);
		int currentBlock = (int) Math.ceil((double)curPage / blockSize);

		int blockStart = (currentBlock - 1) * blockSize + 1;
		int blockEnd = Math.min(currentBlock * blockSize, Math.max(totalPages, 1));


		PageDTO<ApprovalItemDTO> pageDTO = new PageDTO<>();
		pageDTO.setBlockSize(blockSize);
		pageDTO.setCurPage(searchDTO.getCurPage());
		pageDTO.setPageSize(searchDTO.getPageSize());
		pageDTO.setCount(count);
		pageDTO.setTotalPages(totalPages);
		pageDTO.setCurrentBlock(currentBlock);
		pageDTO.setBlockStart(blockStart);
		pageDTO.setBlockEnd(blockEnd);

		return pageDTO;
	}

}
