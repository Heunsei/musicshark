import React, { useRef, useState } from 'react';
import axios from 'axios'
import { OpenVidu, StreamManager } from 'openvidu-browser';
import { useDispatch, useSelector } from 'react-redux';
import styles from './GroupRoom.module.css'

const APPLICATION_SERVER_URL = 'http://localhost:5000/'

const GroupRoom = () => {
    const videoRef = useRef(null);
    const [sessionId, setSessionId] = useState('SSARIA')
    const [session, setSession] = useState('')
    const storeUser = useSelector((state) => state.user.nickname)
    const [mainStreamManager, setMainStreamManager] = useState('')
    const [publisher, setPublisher] = useState('')
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
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions', { customSessionId: sessionId }, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data;
    }

    const createToken = async (sessionId) => {
        const response = await axios.post(APPLICATION_SERVER_URL + 'api/sessions/' + sessionId + '/connections', {}, {
            headers: { 'Content-Type': 'application/json', },
        });
        return response.data;
    }


    const deleteSubscriber = (streamManager) => {
        let index = subscribers.indexOf(streamManager, 0)
        if (index > -1) {
            const copy = [...subscribers]
            copy.splice(index, 1);
            setSubscribers(copy)
        }
    }

    const joinSession = () => {
        const myOV = new OpenVidu();
        const mySession = myOV.initSession()
        setSession(mySession)

        // 다른사람의 캠을 추가하는 코드
        mySession.on('streamCreated', (event) => {
            const subscriber = mySession.subscribe(event.stream, undefined)
            // 배열을 set으로 바꾸는거라 나중에 코드 확인 필요
            console.log(`${subscriber}`)
            const copy = [...subscribers, subscriber]

            setSubscribers(copy);

            if (videoRef.current) {
                subscriber.addVideoElement(videoRef.current);
            }
        })

        // 참가자가 떠날때
        mySession.on('streamDestroyed', (event) => {
            deleteSubscriber(event.stream.streamManager)
        })

        getToken()
            .then((token) => {
                // 내 캠을 연결하는 과정
                mySession.connect(token, { clientData: storeUser })
                    .then(async () => {
                        const publisher = await myOV.initPublisherAsync(undefined, {
                            audioSource: undefined,
                            videoSource: undefined,
                            publishAudio: true,
                            publishVideo: true,
                            resolution: '480x480',
                            frameRate: 30,
                            insertMode: 'APPEND',
                            mirror: false,
                        })
                        mySession.publish(publisher)
                    })
                    .catch((error) => {
                        console.log('There was an error connecting to the session:', error.code, error.message);
                    });
            })
    }

    const leaveSession = () => {
        const mySession = session
        console.log(`내 세션 : ${mySession}`)
        if (mySession) {
            console.log(session)
            mySession.disconnect()
        } else {
            console.log('세션없음')
        }
        setSession('')
    }

    const deleteSession = async () => {

    }

    // 사용자 비디오 컨트롤러
    const muteVideo = () => {
        setVideoState(!videoState)
        console.log(videoState)
        // 비디오 상태에 따라서 class 변경
        // 비디오가 보일때 / 아닐때
        if(videoState){

        }else{

        }

    }


    return (
        <div className={styles.mainContainer}>
            <div className={styles.innerBox}>

                <div className="subScreen">
                    {
                        subscribers.map((sub, i) => {
                            <div style={{ border: 'solid 1px black' }}>
                                <video autoPlay ref={videoRef} />
                            </div>
                        })
                    }
                </div>
                <div className={styles.mainScreen}>
                    <video autoPlay ref={videoRef} />
                </div>
                <div className={styles.buttonBox}>
                    <button onClick={joinSession}>연습 진입</button>
                    <button onClick={leaveSession}>방 나가기</button>
                </div>
            </div>
        </div>
    );
};

export default GroupRoom;