package com.study.project.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.study.project.dto.JpaBoardDTO;
import com.study.project.entity.JpaBoardEntity;


public interface JpaBoardRepository extends JpaRepository<JpaBoardEntity, Integer>{

	Page<JpaBoardEntity> findAll(Pageable pageable);
	@Modifying
	@Query("""
			update
				JpaBoardEntity b
			set
				b.userId = :userId,
				b.userName = :userName,
				b.boardSubject = :boardSubject,
				b.boardContent = :boardContent,
				b.uptDate = :uptDate
			where b.boardNum = :boardNum
			""")
	int updateBoardJPQL(@Param("boardNum") int boardNum
					  , @Param("boardSubject") String boardSubject
					  , @Param("boardContent") String boardContent
					  , @Param("userId") String userId
					  , @Param("userName") String userName
					  , @Param("uptDate") LocalDate uptDate );

	@Modifying
	@Query("delete JpaBoardEntity b where b.boardNum in (:boardNums)")
	int deleteBoardJPQL(List<Integer> boardNums);
}
