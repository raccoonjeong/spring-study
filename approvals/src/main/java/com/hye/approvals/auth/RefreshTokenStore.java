package com.hye.approvals.auth;

import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/** userId -> 현재 유효한 refresh jti (화이트리스트) */
@Component
public class RefreshTokenStore {
    private final Map<String, String> userToJti = new ConcurrentHashMap<>();

    public void bind(String userId, String jti) {
        userToJti.put(userId, jti);
    }

    public boolean isValid(String userId, String jti) {
        String current = userToJti.get(userId);
        return current != null && current.equals(jti);
    }

    public void revoke(String userId) {
        userToJti.remove(userId);
    }
}
