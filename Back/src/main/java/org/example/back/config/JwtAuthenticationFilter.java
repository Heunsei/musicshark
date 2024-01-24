package org.example.back.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired private TokenProvider tokenProvider;
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
        throws ServletException, IOException {

        try{
            String jwt = parseToken(request);

            boolean hasJwt = jwt != null && !jwt.equalsIgnoreCase("null");

            if(!hasJwt){
                filterChain.doFilter(request, response);
                return;
            }

            String userId = tokenProvider.validate(jwt);

            AbstractAuthenticationToken authenticationToken
                    = new UsernamePasswordAuthenticationToken(userId, null, AuthorityUtils.NO_AUTHORITIES);

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authenticationToken);
            SecurityContextHolder.setContext(securityContext);
        }catch (Exception exception){
            exception.printStackTrace();
        }
        filterChain.doFilter(request, response);
    }

    private String parseToken(HttpServletRequest request){

        String token = request.getHeader("Authorization");

        boolean hasToken = StringUtils.hasText(token);
        if(!hasToken) return null;

        boolean isBearer = token.startsWith("Bearer ");
        if(!isBearer) return null;

        String jwt = token.substring(7);
        return jwt;
    }
}
