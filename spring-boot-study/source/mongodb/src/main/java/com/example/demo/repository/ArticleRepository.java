package com.example.demo.repository;

import com.example.demo.model.Article;
import com.example.demo.model.Member;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ArticleRepository extends MongoRepository<Article, String> {
    List<Member> findByName(String name);
    List<Member> findByNameAndEmail(String name, String email);
    List<Member> findByNameOrEmail(String name, String email);
    List<Member> findByNameStartingWith(String name);
    List<Member> findByNameEndingWith(String name);
    List<Member> findByNameContaining(String name);
    List<Member> findByNameLike(String name); // containing "name" equals to like "%name%"

    List<Article> findBy(TextCriteria criteria, Sort sort);
    List<Article> findBy(TextCriteria criteria, Pageable pageable);
    List<Article> findByOrderByScoreDesc(TextCriteria criteria);
    List<Article> findByEmail(String email, TextCriteria criteria, Sort sort);

    @Query("{name: ?0, email: ?1}")
    List<Article> findByAuthor(String name, String email);

    @Query("{name: ?0}")
    @Update("{$set: {email: ?1}}")
    int updateEmailByName(String name, String email);
}
