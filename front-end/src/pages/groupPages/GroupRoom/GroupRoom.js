import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { OpenVidu, StreamManager, Session } from 'openvidu-browser';

const APPLICATION_SERVER_URL = 'https://demos.openvidu.io/'

const GroupRoom = () => {
    const dispatch = useDispatch()
    const storeUser = useSelector((state) => state.user.nickname)
    const videoRef = useRef(null)
    console.log(storeUser)

    // openvidu 관련 state
    const [mainStreamManager, setMainStreamManager] = useState('')
    const sessionId = 'SessionA'
    const [screenOV, setScreenOV] = useState('')
    const [session, setSession] = useState('')
    const [screenSession, setScreenSession] = useState('')

    // 화면관련 state
    const [publisher, setPublisher] = useState([]);
    const [subscribers, setSubscribers] = useState([]);
    const [player, setPlayer] = ([]);

    const getToken = async () => {
        const sessionId = await createSession('SessionA');
        return await createToken(sessionId);
    }

    const createToken = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The token
    }

    const createSession = async (session) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data; // The sessionId
    }

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
        const newScreenOV = new OpenVidu()
        const myScreen = newScreenOV.initSession();


        // 스트림 시작해요 
        mySession.on('streamCreated', (event) => {
            if (event.stream.typeOfVideo === 'CAMERA') {
                const subscriber = mySession.subscribe(event.stream, undefined);
                const newsubscribers = subscribers;
                newsubscribers.push(subscriber);
                setSubscribers([...newsubscribers]);
            }
        });

        // 스트림 없어져요
        mySession.on('streamDestroyed', (event) => {
            deleteSubscriber(event.stream.streamManager);
        });

        // 경고 띄워주기
        mySession.on('exception', (exception) => {
            console.warn(exception);
        });

        getToken().then((token) => {
            mySession.connect(token, { clientData: storeUser })
                .then(async () => {
                    let newpublisher = await newOV.initPublisherAsync(undefined, {
                        audioSource: undefined,
                        videoSource: undefined,
                        publishAudio: true,
                        publishVideo: true,
                        resolution: '480x480',
                        frameRate: 30,
                        insertMode: 'APPEND',
                        mirror: false,
                    })
                    mySession.publish(newpublisher)
                    publisher.push(newpublisher)
                    setMainStreamManager(newpublisher)
                    setPublisher([...publisher])
                })

        })

        // 화면 공유 connect
        getToken().then(tokenScreen => {
            myScreen.connect(tokenScreen, {
                clientData: storeUser
            });
            // setLoading(false);
        });
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
            <video
                ref={videoRef}
                streamManager={mainStreamManager} />
            <button onClick={leaveSession}>나 떠나요</button>
        </div>
    );


};



export default GroupRoom;