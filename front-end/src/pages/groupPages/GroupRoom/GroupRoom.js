import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { OpenVidu, StreamManager, Session } from 'openvidu-browser';


const GroupRoom = () => {
    const dispatch = useDispatch()
    const storeUser = useSelector((state) => state.user.nickname)
    console.log(storeUser)
    // openvidu 관련 state
    const [screenOV, setScreenOV] = useState('')
    const [session, setSession] = useState('')
    const [screenSession, setScreenSession] = useState('')


    // 화면관련 state
    const [publisher, setPublisher] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [player, setPlayer] = ([]);


    // const getToken = async () => {
    //     const response = await axios.post(
    //       `https://i8b302.p.example.io/openvidu/api/sessions/${storeSessionState.sessionId}/connection`,
    //       {},
    //       {
    //         headers: { Authorization: 'Basic T1BFTlZJRFVBUFA6c3NhZnk=' },
    //       },
    //     );
    //     return response.data.token;
    //   };
    const deleteSubscriber = (streamManager) => {
        const newsubscribers = subscribers;
        const index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            newsubscribers.splice(index, 1);
            setSubscribers(newsubscribers);
        }
    };

    // join session
    const joinSession = () => {
        // openvidu객체 생성 및 세션 정보 받아오기
        const newOV = new OpenVidu()
        const mySession = newOV.initSession();
        setSession(mySession)

        // 세션에 미디어 게시를 시작하면 전달되는 이벤트
        // push 함수가 무사히 전달되면 이 이벤트를 시작?
        mySession.on('streamCreated', (event) => {
            if (event.stream.typeOfVideo === 'CAMERA') {
                const subscriber = mySession.subscribe(event.stream, undefined);
                const newsubscribers = subscribers;
                newsubscribers.push(subscriber);
                setSubscribers([...newsubscribers]);
            }
        });

        mySession.on('streamDestroyed', (event) => {
            deleteSubscriber(event.stream.streamManager);
        });

        // mySession
        //     .connect(storeSessionState.sessionToken, {
        //         clientData: storeUser.nickname,
        //     })
        //     .then(async () => {
        //         const newpublisher = await newOV.initPublisherAsync(undefined, {
        //             audioSource: undefined,
        //             videoSource: undefined,
        //             publishAudio: true,
        //             publishVideo: true,
        //             resolution: '480x480',
        //             frameRate: 30,
        //             insertMode: 'APPEND',
        //             mirror: false,
        //         });

        //         mySession.publish(newpublisher);
        //         publisher.push(newpublisher);
        //         setPublisher([...publisher]);
        //     });
    }

    const leaveSession = () => {
        const mySession = session;
        console.log('나 떠나요')
        if (mySession) {
            mySession.disconnect();
        }
    }


    return (
        <div>
            <button onClick={joinSession}>니나ㅣㄴ람늚나난</button>
            <video autoPlay>
                <track kind="captions" />
            </video>
            <button onClick={leaveSession}>나 떠나요</button>
        </div>
    );
};

export default GroupRoom;