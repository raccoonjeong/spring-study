package com.study.project.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import com.study.project.dto.RestBoardDTO;
import com.study.project.dto.RestPageDTO;
import com.study.project.dto.SearchDTO;
import com.study.project.repository.RestBoardMapper;

@Service
public class RestBoardServiceClass implements RestBoardServiceInter {

	private final RestBoardMapper boardMapper;

	public RestBoardServiceClass(RestBoardMapper boardMapper) {
		this.boardMapper = boardMapper;
	}



	@Override
	public List<RestBoardDTO> findAll(SearchDTO searchDTO) {

		return boardMapper.findAll(searchDTO);
	}

	@Override
	@ResponseBody
	public int create(RestBoardDTO insertMap) {

		int insert  = boardMapper.create(insertMap);

		return insert;
	}

	@Override
	@Transactional
	public RestBoardDTO findById(int num) {

		boardMapper.increaseViewCount(num);
		return boardMapper.findById(num);
	}

	@Override
	public int update(RestBoardDTO updateMap) {

		return boardMapper.update(updateMap);
	}

	@Override
	public int delete(List<Integer> deleteList) {

		return boardMapper.delete(deleteList);
	}



	@Override
	public RestPageDTO page(SearchDTO searchDTO) {
		// TODO Auto-generated method stub
		int count = boardMapper.totalCount(searchDTO);

		int curPage = searchDTO.getCurPage();
		int pageSize = searchDTO.getPageSize();
		int blockSize = 5;

		int totalPages = (int) Math.ceil(count / (double)pageSize);
		int currentBlock = (int) Math.ceil((double)curPage / blockSize);

		int blockStart = (currentBlock - 1) * blockSize + 1;
		int blockEnd = Math.min(currentBlock * blockSize, Math.max(totalPages, 1));


		RestPageDTO pageDTO = new RestPageDTO();
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
