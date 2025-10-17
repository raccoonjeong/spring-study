package com.example.demo.repository;

import com.example.demo.model.Pharmacy;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.geo.Polygon;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PharmacyRepository extends MongoRepository<Pharmacy, String> {
    List<Pharmacy> findByLocationNear(Point point, Distance distance);
    List<Pharmacy> findByLocationWithin(Polygon polygon);
}
