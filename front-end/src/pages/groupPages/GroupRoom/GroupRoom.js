import { OpenVidu } from 'openvidu-browser';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import styles from './GroupRoom.module.css'
import { getToken, createToken, createSession, deleteSession } from './groupActions'
import VideoScreen from './VideoScreen';

const GroupRoom = () => {
    const dispatch = useDispatch();
    // const storeUser = useSelector((state) => state.user.nickname)
    const storeUser = 'test1234'
    const sessionId = 'test123411'

    const [screenOV, setScreenOV] = useState(undefined);
    const [session, setSession] = useState(undefined);

    const [publisher, setPublisher] = useState([]);
    const [subscribers, setSubscribers] = useState([]);

    const deleteSubscriber = (streamManager) => {
        const newsubscribers = subscribers;
        const index = subscribers.indexOf(streamManager, 0);
        if (index > -1) {
            newsubscribers.splice(index, 1);
            setSubscribers(newsubscribers);
        }
    };

    const joinSession = () => {
        const newOV = new OpenVidu();
        const mySession = newOV.initSession();
        setScreenOV(newOV)
        setSession(mySession)
        console.log('세션 받아온거', mySession)
        console.log('세션 내가 넣을거', session)
        console.log('ov에용', screenOV)

        // 다른사람들 캠 추가하는 로직
        mySession.on('streamCreated', (event) => {
            if (event.stream.typeOfVideo === 'CAMERA') {
                const subscriber = mySession.subscribe(event.stream, undefined);
                setSubscribers(prevSub => [...prevSub, subscriber]);
            }
        })

        // 참가자가 떠날때
        mySession.on('streamDestroyed', (event) => {
            deleteSubscriber(event.stream.streamManager)
        })
        getToken(sessionId).then((res) => {
            console.log(res)
            mySession.connect(res.token, { clientData: storeUser })
                .then(async () => {
                    let publisher = await newOV.initPublisherAsync(undefined, {
                        audioSource: undefined,
                        videoSource: undefined,
                        publishAudio: true,
                        publishVideo: true,
                        resolution: '640x480',
                        frameRate: 30,
                        insertMode: 'APPEND',
                        mirror: false,
                    })

                    mySession.publish(publisher)
                    setPublisher(prevPub => [...prevPub, publisher])
                    console.log('join session중 퍼블리셔', publisher)
                    // var devices = newOV.getDevices();
                    // var videoDevices = devices.filter(device => device.kind === 'videoinput');
                    // var currentVideoDeviceId = publisher.stream.getMediaStream().getVideoTracks()[0].getSettings().deviceId;
                    // var currentVideoDevice = videoDevices.find(device => device.deviceId === currentVideoDeviceId);

                    // this.setState({
                    //     currentVideoDevice: currentVideoDevice,
                    //     mainStreamManager: publisher,
                    //     publisher: publisher,
                    // });
                })
                .catch((err) => {
                    console.log(err)
                })

        })
    }

    useEffect(() => {
        console.log('===========================')
        console.log('서브스크라이버가 바뀌었습니다')
        console.log(subscribers)
        console.log('===========================')
    }, [subscribers])

    useEffect(() => {
        console.log('===========================')
        console.log('퍼블리셔가 바뀌었습니다')
        console.log(publisher)
        console.log('===========================')
    }, [publisher])

    const leaveSession = () => {
        console.log('세션', session)
        if (session) {
            session.disconnect()
        }
        setScreenOV(null)
        setSession(undefined)
        setSubscribers([])
        setPublisher([])
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
                    <button onClick={() => leaveSession(sessionId)}>방 나가기</button>
                    <button onClick={() => deleteSession(sessionId)}>세션 삭제</button>
                </div>
            </div>
        </div>
    );
}
export default GroupRoom;