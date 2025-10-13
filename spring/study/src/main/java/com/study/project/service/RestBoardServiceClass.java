package com.study.project.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import javax.management.RuntimeErrorException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.study.project.dto.RestBoardDTO;
import com.study.project.dto.RestFileDTO;
import com.study.project.dto.RestPageDTO;
import com.study.project.dto.SearchDTO;
import com.study.project.repository.RestBoardMapper;

@Service
public class RestBoardServiceClass implements RestBoardServiceInter {

	private final RestBoardMapper boardMapper;

	public RestBoardServiceClass(RestBoardMapper boardMapper) {
		this.boardMapper = boardMapper;
	}

	private String savePath = "C:/workspaceUpload";
	private final Path uploadRoot = Paths.get(savePath);


	@Override
	public List<RestBoardDTO> findAll(SearchDTO searchDTO) {

		return boardMapper.findAll(searchDTO);
	}

	@Override
	@Transactional
	public int create(RestBoardDTO dto, List<MultipartFile> fileList) throws Exception{

		List<Path> savedFiles = new ArrayList<Path>();
		try {
			// TODO Auto-generated method stub
			boardMapper.create(dto);
			Integer boardNum = dto.getBoardNum();

			if (boardNum == null) {
				return 0; // ?
			}

			if (!Files.exists(uploadRoot)) {
	            Files.createDirectories(uploadRoot);
	        }

	        if (fileList != null) {
	            for (MultipartFile f : fileList) {
	                if (f == null || f.isEmpty()) continue;

	                String realName = Paths.get(Objects.requireNonNull(f.getOriginalFilename())).getFileName().toString();
	                String saveName = UUID.randomUUID() + "_" + realName;
	                Path target = uploadRoot.resolve(saveName);
	                savedFiles = List.of(target); // 추가함
	                // 저장
	                Files.copy(f.getInputStream(), target, StandardCopyOption.REPLACE_EXISTING);

	                RestFileDTO fileDTO = new RestFileDTO();
	                fileDTO.setBoardNum(boardNum);
	                fileDTO.setRealName(realName);
	                fileDTO.setSaveName(saveName);
	                fileDTO.setSavePath(savePath);

	                int fileInsert = boardMapper.fileCreate(fileDTO);
	                if (fileInsert == 0) return 0;
	            }
	        }

	        return 1;

		}catch (Exception e) {
			e.printStackTrace();
	        // 파일 삭제 (보상 처리)
	        for (Path p : savedFiles) {
	            try {
	            	Files.deleteIfExists(p);
	            	} catch (IOException ignore) {
	            	}
	        }
	        return 0; // 실패
	    }
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

	@Override
	public RestBoardDTO read(int num) {
		return boardMapper.read(num);

	}

	@Override
	public List<RestFileDTO> findFile(int num) {
		return boardMapper.findFile(num);
	}

}
