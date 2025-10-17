package com.example.demo.repository;

import com.example.demo.model.Member;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.mongodb.repository.Update;
import org.springframework.stereotype.Repository;

import java.util.stream.Stream;

@Repository
public interface MemberRepository extends MongoRepository<Member, String> {
    Member findByEmail(String email);

    @Query("{name: ?0, email: ?1}")
    Member findMember(String name, String email);

    Stream<Member> streamByEmailContaining(String email);

    @Query("{name: ?0}")
    @Update("{$set: {email: ?1}}")
    int updateEmailByName(String name, String email);
}
