package org.example.back.Video.controller;

import io.openvidu.java.client.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.Map;

@RestController
@Slf4j
public class OpenviduController {
    @Value("${OPENVIDU_URL}")
    private String openviduURL;

    @Value("${OPENVIDU_SECRET}")
    private String secretKey;

    private OpenVidu openVidu;

    @PostConstruct
    public void init() { this.openVidu = new OpenVidu(openviduURL, secretKey); }

    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        try {
            SessionProperties properties = SessionProperties.fromJson(params).build();
            Session session = openVidu.createSession(properties);
            return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
        } catch(Exception e){
            System.out.println(e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/api/sessions/{sessionId}/connection")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        log.debug("createConnection sessionId: " + sessionId);
        try {
            Session session = openVidu.getActiveSession(sessionId);
            if (session == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
            Connection connection = session.createConnection(properties);
            return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
        }catch(Exception e){
            System.out.println("error! : " + e.getMessage());
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
}
