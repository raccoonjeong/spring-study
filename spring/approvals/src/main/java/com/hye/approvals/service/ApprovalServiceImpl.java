package com.hye.approvals.service;

import com.hye.approvals.dto.*;
import com.hye.approvals.enums.Action;
import com.hye.approvals.enums.Status;
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
	public int process(ApprovalActionDTO actionDTO) {

		String requestedStatus = actionDTO.getStatusCode();
		Integer levelNo = actionDTO.getLevelNo();
		String action = actionDTO.getAction();

		ApprovalItemDTO currentItem = mapper.getApprovalItem(actionDTO.getNum());

		boolean isAuthor = Objects.equals(currentItem.getWriterId(), actionDTO.getApproverId());
		String currentStatus = currentItem.getStatusCode();

		Status realNextStatus = this.nextStatus(Status.valueOf(currentStatus),
				Action.valueOf(action),
				levelNo,
				isAuthor);

		if (!Objects.equals(requestedStatus, realNextStatus.toString())) {
			throw new IllegalArgumentException("INVALID_TRANSITION");
		}
        actionDTO.setStatusCode(realNextStatus.toString());
		mapper.updateApprovalStatus(actionDTO);

		ApprovalHistoryDTO history = new ApprovalHistoryDTO(
				actionDTO.getNum(),
				actionDTO.getApproverId(),
				actionDTO.getStatusCode());
		mapper.insertHistory(history);
		return 1;
	}

	@Override
	@Transactional
	public int reapprove(ApprovalItemDTO item) {
        ApprovalItemDTO currentItem = mapper.getApprovalItem(item.getNum());
        if (!Objects.equals(currentItem.getStatusCode(), Status.REJ.toString())) {
            throw new IllegalArgumentException("INVALID_TRANSITION");
        }
        item.setStatusCode(Status.PND.toString());
		int result = mapper.update(item);
		ApprovalHistoryDTO history = new ApprovalHistoryDTO(item.getNum(), item.getApproverId(), item.getStatusCode());
		mapper.insertHistory(history);
		return 1;
	}

	public Status nextStatus(Status currentStatus, Action action, int levelNo, boolean isAuthor) {
		switch (currentStatus) {
			case TMP:
				if (action == Action.APPROVE_REQUEST && isAuthor) {
					if (levelNo <= 2) {
						return Status.PND;
					} else {
						return Status.APR;
					}
				}
				break;

			case PND:
				if (action == Action.APPROVE && levelNo >= 3) return Status.APR;
				if (action == Action.REJECT && levelNo >= 3) return Status.REJ;
				break;

			case APR:
				if (action == Action.APPROVE && levelNo >= 4) return Status.CMP;
				if (action == Action.REJECT && levelNo >= 3) return Status.REJ;
				break;

			case REJ:
				if (action == Action.APPROVE_REQUEST && isAuthor) {
					if (levelNo <= 2) {
						return Status.PND;
					} else {
						return Status.APR;
					}
				}
				break;

			case CMP:
				// 완료는 불변
				break;
		}
		throw new IllegalArgumentException("INVALID_TRANSITION");
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
