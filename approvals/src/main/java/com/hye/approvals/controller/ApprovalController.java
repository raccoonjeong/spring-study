package com.hye.approvals.controller;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hye.approvals.dto.ApprovalActionDTO;
import com.hye.approvals.dto.ApprovalItemDTO;
import com.hye.approvals.dto.ResponseDTO;
import com.hye.approvals.service.ApprovalService;

@RestController
@RequestMapping("approval")
public class ApprovalController {

	private final ApprovalService service;

	public ApprovalController(ApprovalService service) {
		this.service = service;
	}


	@GetMapping
	public ResponseDTO<List<ApprovalItemDTO>> getList() {
		ResponseDTO<List<ApprovalItemDTO>> response = new ResponseDTO<>();
		List<ApprovalItemDTO> list = service.getList();

		response.setData(list);
		response.setStatus("succ");

		return response;

	}

	@GetMapping("/{num}")
	public ResponseDTO<Map<String, Object>> getDetail(@PathVariable(value="num") int num) {
		ResponseDTO<Map<String, Object>> response = new ResponseDTO<>();
		Map<String, Object> result = service.getDetail(num);

		response.setData(result);
		response.setStatus("succ");

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
