package com.hye.approvals.auth;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class CookieSupport {
    private final String name;
    private final boolean secure;
    private final String sameSite;
    private final String path;

    public CookieSupport(
            @Value("${app.cookie.refresh-name}") String name,
            @Value("${app.cookie.secure}") boolean secure,
            @Value("${app.cookie.same-site}") String sameSite,
            @Value("${app.cookie.path}") String path
    ) {
        this.name = name;
        this.secure = secure;
        this.sameSite = sameSite;
        this.path = path;
    }

    public void setRefreshCookie(HttpServletResponse res, String token, int maxAgeSeconds) {
        Cookie c = new Cookie(name, token);
        c.setHttpOnly(true);
        c.setSecure(secure);
        c.setPath(path);
        c.setMaxAge(maxAgeSeconds);
        res.addHeader("Set-Cookie",
                String.format("%s=%s; Max-Age=%d; Path=%s; HttpOnly; %s%s",
                        name, token, maxAgeSeconds, path,
                        secure ? "Secure; " : "",
                        ("None".equalsIgnoreCase(sameSite) ? "SameSite=None" :
                                "Lax".equalsIgnoreCase(sameSite) ? "SameSite=Lax" : "SameSite=Strict")));
    }

    public void clearRefreshCookie(HttpServletResponse res) {
        Cookie c = new Cookie(name, "");
        c.setHttpOnly(true);
        c.setSecure(secure);
        c.setPath(path);
        c.setMaxAge(0);
        res.addCookie(c);
    }

    public String cookieName() { return name; }
}
