import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { OpenVidu } from 'openvidu-browser';

import LogoutIcon from '@mui/icons-material/Logout';
import AirplayIcon from '@mui/icons-material/Airplay';
import Modal from '@mui/material/Modal';

import GroupCallButton from '../../../components/GroupRoomButtons/GroupCallButton';
import MuteMicButton from '../../../components/GroupRoomButtons/MuteMicButton';
import MuteCamButton from '../../../components/GroupRoomButtons/MuteCamButton';
import RecordButton from '../../../components/GroupRoomButtons/RecordButton';

import { getToken } from './groupActions'
import styles from './GroupRoom.module.css'
import VideoScreen from './VideoScreen';
import { setLoby } from '../../../redux/store/lobySlice';
import { uploadGroupVideoAction } from './uploadGroupVideoAction';
import { getGroupRecordListAction } from '../GroupDetailPage/actions/getGroupRecordListAction';
import { searchGroupRecord } from './searchGroupRecord';

const GroupRoom = (props) => {
    const { id, session, setSession, screenOV, setScreenOV, recordList, setRecordList } = props
    const dispatch = useDispatch()
    const navigate = useNavigate()
    // const { id } = useParams()
    const storeUser = useSelector((state) => state.user.nickname)
    const sessionId = id

    // openvidu 관련 state
    // const [screenOV, setScreenOV] = useState(undefined)
    // const [session, setSession] = useState(undefined)

    // 참가자 관련 state
    const [publisher, setPublisher] = useState(undefined)
    const [subscribers, setSubscribers] = useState([])
    const [player, setPlayer] = useState([]);

    // 버튼 관리할 state
    const [isJoin, setIsJoin] = useState(false)
    const [isMicMute, setIsMicMute] = useState(false)
    const [isCamMute, setIsCamMute] = useState(false)
    const [isRecording, setIsRecording] = useState(false)

    // modal 관련 state
    const [open, setOpen] = useState(false)
    const handleClose = () => {
        setOpen(false)
        setVideoTitle('')
    }

    // 녹화 관련 state
    const [recordedBlobs, setRecordedBlobs] = useState([])
    // 녹화 영상 제목
    const [videoTitle, setVideoTitle] = useState('')
    const [isDuplicate, setIsDuplicate] = useState(false)
    // 녹화를 담을 ref
    const mediaRecorderRef = useRef(null);

    const [videoURL, setVideoUrl] = useState('')
    // 녹화를 담을 stream
    const [stream, setStream] = useState(null);
    /**
     *  그룹에 진입 시 녹화를 할 media를 등록
     */
    const getMedia = async () => {
        try {
            const constraints = {
                audio: true,
                video: {
                    width: 640,
                    height: 480,
                },
            };
            const mediaStream =
                await navigator.mediaDevices.getUserMedia(constraints);
            setStream(mediaStream);
            console.log('미디어 연결 성공')
        } catch (e) {
            console.log(`현재 마이크와 카메라가 연결되지 않았습니다`);
        }
    };

    /**
    *  녹화를 시작하는 함수
    */
    const handleStartRecording = () => {
        if (isJoin) {
            console.log('녹화 시작')
            setRecordedBlobs([]);
            setIsRecording(true)
            try {
                mediaRecorderRef.current = new MediaRecorder(stream, {
                    audioBitsPerSecond: 100000,
                    videoBitsPerSecond: 100000,
                    mimeType: "video/webm",
                });
                mediaRecorderRef.current.ondataavailable = (event) => {
                    if (event.data && event.data.size > 0) {
                        setRecordedBlobs((prev) => [...prev, event.data]);
                    }
                };
                mediaRecorderRef.current.start();
                setIsRecording(true);
                console.log('녹화 시작')
            } catch (e) {
                console.log(`MediaRecorder error`, e);
                setIsRecording(false)
            }
        }
    };

    /**
     * 녹화를 종료하는 함수
     */
    const handleStopRecording = () => {
        setIsRecording(false)
        console.log('녹화 종료')
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
        setOpen(true)
    };


    /**
     * @todo 저장시 중복 확인하기
     */
    const handleUpload = async () => {
        const blob = new Blob(recordedBlobs, { type: "video/webm" });
        const formData = new FormData()
        formData.append('videoFile', blob)
        formData.append('videoTitle', videoTitle)
        await uploadGroupVideoAction(formData, id)
        setTimeout(() => {
            setRecordedBlobs([])
        }, 100);
    }

    const deleteSubscriber = useCallback((streamManager) => {
        setSubscribers((prevSubscribers) => {
            const index = prevSubscribers.indexOf(streamManager);
            if (index > -1) {
                const newSubscribers = [...prevSubscribers];
                newSubscribers.splice(index, 1);
                return newSubscribers;
            } else {
                return prevSubscribers;
            }
        });
    }, []);


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
        console.log('REACT OPENVIDU APP URL : ', process.env.REACT_APP_OPENVIDU_URL);
        // stream없으면 stream추가
        if (!stream) {
            getMedia()
        }

        // 다른사람들 캠 추가하는 로직
        mySession.on('streamCreated', (event) => {
            console.log('==============================================')
            console.log('streamCreate 실행')
            console.log('==============================================')
            if (event.stream.typeOfVideo === 'CAMERA') {
                const subscriber = mySession.subscribe(event.stream, undefined);
                console.log(subscriber)
                setSubscribers((prevSub) => [...prevSub, subscriber])
                // setSubscribers(subscriber)
            }
        })

        // 참가자가 떠날때
        mySession.on('streamDestroyed', (event) => {
            deleteSubscriber(event.stream.streamManager)
        })

        mySession.on('signal:nextPlayer', (event) => {
            changePlayer(event.from)
        })

        getToken(sessionId).then((res) => {
            console.log('내가 제출하는 토큰', res)
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
                    // setPlayer(publisher)
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

    const changePlayer = (from) => {
        console.log('누른사람 확인 : ', from.stream.streamManager)
        console.log('플레이어 확인', player)
        const newPlayer = from.stream.streamManager
        if (player[0] === newPlayer) {
            console.log('player가 같습니다')
            console.log(player[0])
            console.log(newPlayer)
            setPlayer([])
        } else if (player[0] === undefined) {
            player.push(newPlayer)
            setPlayer([...player])
            console.log('빈배열에서의 플레이어', player)
        }
    }

    /**
     *@todo 만약 안돼면 joinSession안에있는 setPlayer 주석해제 
     */
    const nextPlayer = () => {
        // 세션이 있을때만 퍼블리셔를 사용해서 체인지?
        if (session) {
            session.signal({
                type: 'nextPlayer',
                to: [],
                data: ''
            });
        }
    }

    // 출력용 useEffect
    // useEffect(() => {
    //     console.log('===========================')
    //     console.log('서브스크라이버가 바뀌었습니다')
    //     console.log(subscribers)
    //     subscribers.forEach((element) => {
    //         console.log(element.id)
    //     })
    //     console.log('===========================')
    // }, [subscribers])

    // useEffect(() => {
    //     console.log('===========================')
    //     console.log('퍼블리셔가 바뀌었습니다')
    //     console.log(publisher)
    //     console.log('===========================')
    // }, [publisher])

    // useEffect(() => {
    //     if (session) {
    //         console.log('player확인', player)
    //     }
    // }, [session, player])

    useEffect(() => {
        const getList = async () => {
            const res = await getGroupRecordListAction(id)
            setRecordList(res)
        }
        getList()
    }, [open, id, setRecordList])

    // leave session
    const leaveSession = () => {
        // 세션 나갈때 녹화 캠 켜져있으면 연결 해제
        if (stream) {
            stream.getTracks().forEach((track) => {
                track.stop()
            });
        }
        // 세션 종류 후 혹시나모를 데이터 초기화
        console.log('세션', session)
        if (session) {
            session.disconnect()
        }
        setIsJoin(false)
        setScreenOV(null)
        setSession(undefined)
        setIsRecording(false)
        setSubscribers([])
        setPublisher(undefined)
        setPlayer([])
    }

    // 마이크 끄기
    const muteMic = () => {
        const micState = isMicMute
        if (isJoin) {
            setIsMicMute(!micState)
            publisher.publishAudio(isMicMute)
        }
    }

    // 캠 끄기
    const muteCam = () => {
        const camState = isCamMute
        if (isJoin) {
            setIsCamMute(!camState)
            publisher.publishVideo(isCamMute)
        }
    }

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setVideoTitle(inputValue);

        // 사용자가 입력한 videoTitle이 배열 안에 있는지 확인
        const hasDuplicate = recordList.some((video) =>
            video.video_title.toLowerCase() === inputValue.toLowerCase()
        );

        // 중복 여부 업데이트
        setIsDuplicate(hasDuplicate);
    };

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.innerBox}>
                    <div className={styles.subScreen}>
                        {
                            publisher !== undefined ?
                                <div className={styles.subScreenVideo}>
                                    <VideoScreen streamManager={publisher} key={publisher.id} />
                                </div> : null
                        }
                        {
                            subscribers !== undefined ?
                                subscribers.map(sub => {
                                    return (
                                        <div className={`${styles.subScreenVideo}`}>
                                            <VideoScreen streamManager={sub} key={sub.stream.streamId} />
                                        </div>)
                                }) : null
                        }
                    </div>
                    <div className={`${styles.mainScreen}`}>
                        {
                            player !== undefined ?
                                player.map((player) => {
                                    return (
                                        <div >
                                            <VideoScreen streamManager={player} />
                                        </div>
                                    )
                                })
                                : null
                        }
                    </div>
                    <div className={styles.buttonBox}>
                        <GroupCallButton isJoin={isJoin} leaveSession={leaveSession} joinSession={joinSession} sessionId={sessionId} />
                        <MuteMicButton muteMic={muteMic} isMicMute={isMicMute} />
                        <MuteCamButton muteCam={muteCam} isCamMute={isCamMute} />
                        <RecordButton isRecording={isRecording} stream={stream}
                            handleStartRecording={handleStartRecording} handleStopRecording={handleStopRecording} />
                        <button className={`${styles.groupRoomBtn}`} onClick={() => nextPlayer()}>< AirplayIcon sx={{ color: 'white' }} /></button>
                        <button className={`${styles.outBtn} ${styles.groupRoomBtn}`} onClick={() => { leaveSession(); dispatch(setLoby(true)) }}>
                            <LogoutIcon sx={{ color: '#ffffff' }} />
                        </button>
                    </div>
                </div>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={styles.modalContainer}>
                    <header>영상을 저장 하시겠습니까?</header>
                    <input value={videoTitle} onChange={handleInputChange} placeholder='영상 제목을 입력해주세요' />
                    {
                        isDuplicate ? <p>중복된 이름의 영상이 존재합니다</p> : null
                    }
                    <div className={styles.modalButtonBox}>
                        <button onClick={() => { handleUpload(); handleClose() }} disabled={isDuplicate}>저장</button>
                        <button onClick={() => { setRecordedBlobs([]); handleClose() }}>취소</button>
                    </div>
                </div>
            </Modal >
        </>

    );
}
export default GroupRoom;