package org.example.back.Openvidu.controller;

import io.openvidu.java.client.*;
import lombok.extern.slf4j.Slf4j;
import org.example.back.Openvidu.dto.response.ConnectionResponseDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/openvidu")
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
    public ResponseEntity<?> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        ConnectionResponseDto dto = new ConnectionResponseDto();
        try {
            Session session = openVidu.getActiveSession(sessionId);
            if (session == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
            Connection connection = session.createConnection(properties);
            dto.setToken(connection.getToken());
            dto.setConnectionId(connection.getConnectionId());
            return new ResponseEntity<ConnectionResponseDto>(dto, HttpStatus.OK);
        }catch(Exception e){
            System.out.println("error! : " + e.getMessage());
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/api/sessions/{sessionId}/connection/{connectionId}")
    public ResponseEntity<?> deleteConnection(@PathVariable("sessionId") String sessionId, @PathVariable("connectionId") String connectionId)
    throws OpenViduHttpException, OpenViduJavaClientException {
        try {
            openVidu.fetch();
            Session session = openVidu.getActiveSession(sessionId);

            if(session == null){
                return new ResponseEntity<String>("이미 존재하지 않는 세션입니다.", HttpStatus.NOT_FOUND);
            }
            List<Connection> connectionList = session.getActiveConnections();
            for(Connection conn : connectionList){
                if(conn.getConnectionId().equals(connectionId)){
                    session.forceDisconnect(conn);
                    break;
                }
            }

            return new ResponseEntity<Void>(HttpStatus.OK);
        }  catch (Exception e) {
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/api/sessions/{sessionId}")
    public ResponseEntity<?> deleteSession(@PathVariable("sessionId") String sessionId){
        try{
            openVidu.fetch();
            Session session = openVidu.getActiveSession(sessionId);
            if(session != null) session.close();

            return new ResponseEntity<Void>(HttpStatus.OK);
        } catch(Exception e){
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }
}
