import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { OpenVidu, StreamManager, Session } from 'openvidu-browser';


const GroupRoom = () => {
    const dispatch = useDispatch()

    // openvidu 관련 state
    const [session, setSession] = useState('')

    // join session
    const joinSession = () => {
        // openvidu객체 생성 및 세션 정보 받아오기
        const newOV = new OpenVidu()
        const mySession = newOV.initSession();
        setSession(mySession)

        // 스트림이 시작될 때, 실행될 코드?
        mySession.on('streamCreated', (event) => {

        })
    }


    return (
        <div className={screenClass}>
            <video autoPlay>
                <track kind="captions" />
            </video>
        </div>
    );
};

export default GroupRoom;