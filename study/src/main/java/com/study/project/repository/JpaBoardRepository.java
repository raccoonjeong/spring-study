package com.study.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.study.project.entity.JpaBoardEntity;

//@Repository
public interface JpaBoardRepository extends JpaRepository<JpaBoardEntity, Integer>{

}
