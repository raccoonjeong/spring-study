package com.hye.approvals.service;

import com.hye.approvals.dto.*;
import com.hye.approvals.mapper.ApprovalMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;


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
	public Map<String, Object> getDetail(UserDTO user, int num) {
		Map<String, Object> result = new HashMap<>();

		ApprovalItemDTO item = mapper.getApprovalItem(num);
		List<ApprovalHistoryDTO> histories = mapper.getApprovalHistories(num);

		if (!this.hasViewPermission(user, item.getWriterId(),item.getStatusCode(), histories)) {
			throw new RuntimeException("조회 권한이 없습니다.");
		}
		result.put("item", item);
		result.put("histories", histories);

		return result;
	}

	private boolean hasViewPermission (UserDTO user, String writerId, String statusCode, List<ApprovalHistoryDTO> histories) {
		String userId = user.getUserId();
		Integer levelNo = user.getLevelNo();

		boolean isMyItem = userId.equals(writerId);

		if (List.of(1,2).contains(levelNo)) {
			return isMyItem;
		}

		boolean isPending = Objects.equals(statusCode, "PND");

		List<ApprovalHistoryDTO> sortedHistories =
				histories.stream()
						.sorted(Comparator.comparing(ApprovalHistoryDTO::getHisNum).reversed())
						.toList();

		String lastApprover = sortedHistories.stream()
				.filter(h -> Objects.equals(h.getStatusCode(), "APR"))
				.findFirst()
				.orElse(new ApprovalHistoryDTO())
				.getProcId();

		boolean isRecentApprover = Objects.equals(lastApprover, userId);

		if (3 == levelNo) {
			return isMyItem || isPending || isRecentApprover;
		}

		boolean isNotTempOrPend = !List.of("TMP", "PND").contains(statusCode);

		if (4 == levelNo) {
			return isMyItem || isNotTempOrPend;
		}

		return false;
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
