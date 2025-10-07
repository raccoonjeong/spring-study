package com.hye.approvals.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Map;

@Component
public class AccessTokenService {
    private final Key key;
    private final long expMillis;

    public AccessTokenService(
            @Value("${app.jwt.access-secret}") String secret,
            @Value("${app.jwt.access-exp-min}") long expMin
    ) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expMillis = expMin * 60_000L;
    }

    public String create(String userId, String empName, Integer levelNo) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(userId)
                .addClaims(Map.of("empName", empName, "levelNo", levelNo))
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expMillis))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Jws<Claims> parse(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }
}
