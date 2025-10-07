package com.hye.approvals.auth;

import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/** Access 토큰 블랙리스트 (선택 기능) */
@Component
public class TokenBlacklist {
    private final Map<String, Long> revoked = new ConcurrentHashMap<>();

    public void revoke(String token, long expEpochMillis) {
        revoked.put(token, expEpochMillis);
    }

    public boolean isRevoked(String token) {
        Long exp = revoked.get(token);
        if (exp == null) return false;
        if (exp < Instant.now().toEpochMilli()) {
            revoked.remove(token);
            return false;
        }
        return true;
    }
}
