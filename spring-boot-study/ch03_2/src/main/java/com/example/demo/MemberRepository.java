package com.example.demo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends CrudRepository<Member, Long> {
    List<Member> findByName(String name);
    List<Member> findByEmail(String email);
    List<Member> findByNameContaining(String name);
    List<Member> findByNameAndEmail(String name, String email);
    List<Member> findByNameOrEmail(String name, String email);
    List<Member> findByAgeGreaterThan(int age);
    List<Member> findByAgeLessThan(int age);
    List<Member> findByAgeBetween(int min, int max);
}
