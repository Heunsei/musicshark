import React, { useState } from 'react';
import axios from 'axios'
import { OpenVidu, StreamManager } from 'openvidu-browser';
import { useDispatch, useSelector } from 'react-redux';
import styles from './GroupRoom.module.css'

import VideoScreen from './VideoScreen';

const APPLICATION_SERVER_URL = 'http://localhost:5000/'

const GroupRoom = () => {
    const storeUser = useSelector((state) => state.user.nickname)

    const [screenOV, setScreenOV] = useState(undefined);
    const [sessionId, setSessionId] = useState('SessionA')
    const [session, setSession] = useState('')
    const [screenSession, setScreenSession] = useState(undefined);

    // 발신자 / 수신자
    const [publisher, setPublisher] = useState([])
    const [subscribers, setSubscribers] = useState([])

    // 비디오 컨트롤러
    const [videoState, setVideoState] = useState(true)
    // 오디오 컨트롤러
    const [audioState, setAudioState] = useState(true)

    // 토큰 주세요
    const getToken = async () => {
        const getSessionId = await createSession(sessionId);
        return await createToken(getSessionId);
    };

    const createSession = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/', { customSessionId: sessionId }, {
            headers: {
                Authorization: 'Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU'
            },
        });
        console.log('createSession 로그', response.data)
        return response.data;
    }

    const createToken = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { Authorization: 'Basic T1BFTlZJRFVBUFA6TVlfU0VDUkVU' },
        });
        return response.data;
    }


    const deleteSubscriber = (streamManager) => {
        const newsubscribers = subscribers;
        const index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            newsubscribers.splice(index, 1);
            setSubscribers([...newsubscribers]);
        }
    }

    const joinSession = () => {
        const newOV = new OpenVidu();
        const mySession = newOV.initSession()
        setSession(mySession)

        const newScreenOV = new OpenVidu();
        const myScreen = newScreenOV.initSession();
        setScreenOV(newScreenOV);
        setScreenSession(myScreen);

        // 다른사람의 캠을 추가하는 코드
        mySession.on('streamCreated', (event) => {
            const subscriber = mySession.subscribe(event.stream, undefined)
            // 배열을 set으로 바꾸는거라 나중에 코드 확인 필요
            console.log('다른사람의 캠 : ', subscriber)
            setSubscribers(prevSubscrivers => [...prevSubscrivers, subscriber])
        })

        // 참가자가 떠날때
        mySession.on('streamDestroyed', (event) => {
            console.log('세션 나갈때', subscribers)
            deleteSubscriber(event.stream.streamManager)
        })

        getToken()
            .then((token) => {
                // 내 캠을 연결하는 과정
                console.log('토큰확인 ', token)
                mySession.connect(token, { clientData: storeUser })
                    .then(async () => {
                        const newPublisher = await newOV.initPublisherAsync(undefined, {
                            audioSource: undefined,
                            videoSource: undefined,
                            publishAudio: true,
                            publishVideo: true,
                            resolution: '480x480',
                            frameRate: 30,
                            insertMode: 'APPEND',
                            mirror: false,
                        })
                        setPublisher(prevPub => [...prevPub, newPublisher]);
                    })
                    .catch((error) => {
                        console.log('There was an error connecting to the session:', error.code, error.message);
                    });
            })
    }

    const leaveSession = () => {
        const mySession = session
        console.log('내세션', mySession)
        if (mySession) {
            mySession.disconnect()
        } else {
            console.log('세션없음')
        }
        setSession('')
        setPublisher([])
    }

    const deleteSession = async () => {

    }

    // 사용자 비디오 컨트롤러
    const muteVideo = () => {
        setVideoState(!videoState)
        publisher[0].publishVideo(setVideoState)
        // 비디오 상태에 따라서 class 변경
        // 비디오가 보일때 / 아닐때
        if (videoState) {

        } else {

        }

    }
    // 사용자 오디오 컨트롤러
    const muteAudio = () => {
        setAudioState(!audioState)
        publisher.publishAudio(audioState);
        if (audioState) {

        } else {

        }

    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.innerBox}>
                <div className={styles.subScreen}>
                    {storeUser}
                    {
                        subscribers.map(sub => {
                            return <VideoScreen streamManager={sub} key={sub.stream.streamId} />
                        })
                    }
                </div>
                <div className={styles.mainScreen}>
                    {
                        publisher.map(pub => {
                            return <VideoScreen streamManager={pub} key={pub.id} />
                        })
                    }
                </div>
                <div className={styles.buttonBox}>
                    <button onClick={joinSession}>연습 진입</button>
                    <button onClick={leaveSession}>방 나가기</button>
                    <button onClick={muteVideo}>캠 끄기</button>
                    <button onClick={muteAudio}>오디오 끄기</button>
                </div>
            </div>
        </div>
    );
};

export default GroupRoom;