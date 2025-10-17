package com.example.demo.repository;

import com.example.demo.model.Restroom;
import org.springframework.data.geo.Distance;
import org.springframework.data.geo.Point;
import org.springframework.data.geo.Polygon;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RestroomRepository extends MongoRepository<Restroom, String> {
    List<Restroom> findByLocationNear(Point point, Distance distance);
    List<Restroom> findByLocationWithin(Polygon polygon);
}
