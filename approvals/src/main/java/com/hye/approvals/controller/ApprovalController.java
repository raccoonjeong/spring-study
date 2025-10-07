package com.hye.approvals.controller;

import com.hye.approvals.auth.CurrentUser;
import com.hye.approvals.dto.*;
import com.hye.approvals.service.ApprovalService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("approval")
public class ApprovalController {
	private static final Logger log = LoggerFactory.getLogger(ApprovalController.class);

	private final ApprovalService service;

	public ApprovalController(ApprovalService service) {
		this.service = service;
	}

	@GetMapping
	public ResponseDTO<PageDTO<ApprovalItemDTO>> getList(@CurrentUser UserDTO user, @ModelAttribute SearchDTO search) {

		log.info("==================Login User Info::: userId: {}, levelNo: {}", user.getUserId(), user.getLevelNo());
		ResponseDTO<PageDTO<ApprovalItemDTO>> response = new ResponseDTO<>();

		search.setUserId(user.getUserId());
		search.setEmpName(user.getEmpName());
		search.setLevelNo(user.getLevelNo());

		PageDTO<ApprovalItemDTO> data = service.getList(search);

		response.setData(data);
		response.setStatus("succ");

		return response;
	}

	@GetMapping("/{num}")
	public ResponseDTO<Map<String, Object>> getDetail(@CurrentUser UserDTO user, @PathVariable(value="num") int num) {
		ResponseDTO<Map<String, Object>> response = new ResponseDTO<>();
		try {
			Map<String, Object> result = service.getDetail(user, num);
			response.setData(result);
			response.setStatus("succ");

		} catch (RuntimeException e) {
			response.setStatus("fail");
			response.setMessage(e.getMessage());
		}
		return response;

	}

	@GetMapping("nextval")
	public ResponseDTO<Integer> getNextNumber() {
		ResponseDTO<Integer> response = new ResponseDTO<>();
		Integer nextNumber = service.getNextNumber();

		response.setData(nextNumber);
		response.setStatus("succ");

		return response;

	}

	@PostMapping
	public ResponseDTO<Void> create(@RequestBody ApprovalItemDTO item) {

		ResponseDTO<Void> response = new ResponseDTO<>();

		int result = service.create(item);

		if (result == 1) {
			response.setStatus("succ");
		} else {
			response.setStatus("fail");
		}

		return response;
	}

	@PatchMapping("/process-approval")
	public ResponseDTO<Void> approve(@RequestBody ApprovalActionDTO action) {

		ResponseDTO<Void> response = new ResponseDTO<>();

		int result = service.processApproval(action);

		if (result == 1) {
			response.setStatus("succ");
		} else {
			response.setStatus("fail");
		}

		return response;
	}


}
