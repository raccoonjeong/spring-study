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
import java.util.UUID;

@Component
public class RefreshTokenService {
    private final Key key;
    private final long expMillis;

    public RefreshTokenService(
            @Value("${app.jwt.refresh-secret}") String secret,
            @Value("${app.jwt.refresh-exp-day}") long expDay
    ) {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
        this.expMillis = expDay * 24L * 60L * 60L * 1000L;
    }

    public String create(String userId) {
        long now = System.currentTimeMillis();
        String jti = UUID.randomUUID().toString();
        return Jwts.builder()
                .setSubject(userId)
                .setId(jti) // 회전/재사용 탐지용
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + expMillis))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Jws<Claims> parse(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }
}
