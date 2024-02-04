import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { OpenVidu } from 'openvidu-browser';

import CallEndIcon from '@mui/icons-material/CallEnd';
import CallIcon from '@mui/icons-material/Call';
import LogoutIcon from '@mui/icons-material/Logout';

import GroupCallButton from '../../../components/GroupRoomButtons/GroupCallButton';
import MuteMicButton from '../../../components/GroupRoomButtons/MuteMicButton';
import MuteCamButton from '../../../components/GroupRoomButtons/MuteCamButton';

import { getToken, createToken, createSession, deleteSession } from './groupActions'
import styles from './GroupRoom.module.css'
import VideoScreen from './VideoScreen';

const GroupRoom = () => {
    const dispatch = useDispatch();
    // const storeUser = useSelector((state) => state.user.nickname)
    const storeUser = 'test1234'
    const sessionId = 'test123411'

    // openvidu 관련 state
    const [screenOV, setScreenOV] = useState(undefined);
    const [session, setSession] = useState(undefined);

    // 참가자 관련 state
    const [publisher, setPublisher] = useState(undefined);
    const [subscribers, setSubscribers] = useState([]);
    const [player, setPlayer] = useState([]);

    // 버튼 관리할 state
    const [isJoin, setIsJoin] = useState(false)
    const [isMicMute, setIsMicMute] = useState(false)
    const [isCamMute, setIsCamMute] = useState(false)


    const deleteSubscriber = (streamManager) => {
        setSubscribers((prevSub) => {
            const index = [...prevSub].indexOf(streamManager, 0)
            if (index > -1) {
                prevSub.splice(index, 1)
                return prevSub
            }
        })
    };

    // 세선 접속
    const joinSession = () => {
        const newOV = new OpenVidu();
        const mySession = newOV.initSession();
        setIsJoin(true)
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
                    setPublisher(publisher)
                    console.log('join session중 퍼블리셔', publisher)
                    setPlayer(publisher)
                    console.log('=================================')
                    console.log('님아 제발좀 나와주세요 ', player)
                    console.log('=================================')
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

    // 출력용 useEffect
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

    // leave session
    const leaveSession = () => {
        console.log('세션', session)
        if (session) {
            session.disconnect()
        }
        setIsJoin(false)
        setScreenOV(null)
        setSession(undefined)
        setSubscribers([])
        console.log('나갔어용', subscribers)
        setPublisher(undefined)
    }

    const muteMic = () => {
        const micState = isMicMute
        if (isJoin) {
            setIsMicMute(!micState)
            publisher.publishVideo(isMicMute)
        }
    }

    const muteCam = () => {
        const camState = isCamMute
        if (isJoin) {
            setIsCamMute(!camState)
            publisher.publishVideo(isCamMute)
        }
    }

    return (
        <div className={styles.mainContainer}>
            <div className={styles.innerBox}>
                <div className={styles.subScreen}>
                    {storeUser}
                    {
                        publisher !== undefined ?
                            <VideoScreen streamManager={publisher} key={publisher.id} /> : null
                    }
                    {
                        subscribers !== undefined ?
                            subscribers.map(sub => {
                                return <VideoScreen streamManager={sub} key={sub.stream.streamId} />
                            }) : null
                    }
                </div>
                <div className={styles.mainScreen}>
                    {
                        player.length !== 0 ?
                            <VideoScreen streamManager={player} /> : null
                    }
                </div>
                <div className={styles.buttonBox}>
                    <GroupCallButton isJoin={isJoin} leaveSession={leaveSession} joinSession={joinSession} sessionId={sessionId} />
                    <MuteMicButton muteMic={muteMic} isMicMute={isMicMute} />
                    <MuteCamButton muteCam={muteCam} isCamMute={isCamMute} />
                    <button className={styles.outBtn} onClick={() => deleteSession(sessionId)}>
                        <LogoutIcon sx={{ color: '#ffffff' }} />
                    </button>
                </div>
            </div>
        </div>
    );
}
export default GroupRoom;