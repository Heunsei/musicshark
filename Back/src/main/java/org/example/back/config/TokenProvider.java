package org.example.back.config;

import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import io.jsonwebtoken.*;

@Component
public class TokenProvider {

    @Value("${jwt.security-key")
    private String Security_Key;

    public String create(String email){

        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));

        String jwt = Jwts.builder()
                .signWith(SignatureAlgorithm.HS256, Security_Key)
                .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
                .compact();
        return jwt;
    }

    public String validate (String jwt){

        Claims claims = Jwts.parser().setSigningKey(Security_Key)
                .parseClaimsJws(jwt).getBody();

        return claims.getSubject();
    }
}
