import React, { useEffect, useRef, useState } from 'react';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from './SingleRecordPage.module.css'
import Navbar from '../../components/Navbar';
import { useNavigate } from 'react-router-dom';
import RecordScreen from './components/SingleRecordPlay/RecordScreen';
import { uploadVideoAction } from './actions/uploadVideoAction';
import video from './video.mp4'
import webm from './webm.webm'

const SingleRecordPage = () => {
    const [isRecording, setIsRecording] = useState(false)
    const navigate = useNavigate()
    const handleRecord = () => {
        setIsRecording(!isRecording)
        console.log(isRecording)
    }

    // 해당 값이 null -> 연결이 종료
    const [stream, setStream] = useState(null);
    // 녹화를 저장할 blob
    const [recordedBlobs, setRecordedBlobs] = useState([]);
    // 녹화 영상 제목
    const [videoTitle, setVideoTitle] = useState('')

    // 녹화되는 화면을 표시해주는 듯한 느낌을 줄 ref
    const mirrorVideoRef = useRef(null);
    // 녹화 화면을 담을 ref
    const mediaRecorderRef = useRef(null);
    const testVideoRef = useRef(null)

    /**
     * @returns 유저의 미디어를 받아오고 마이크가 없을 시 오류를 콘솔로 띄워줌
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
            if (mirrorVideoRef.current) {
                mirrorVideoRef.current.srcObject = mediaStream;
            }
        } catch (e) {
            console.log(`현재 마이크와 카메라가 연결되지 않았습니다`);
        }
    };

    const handleStartRecording = () => {
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
    };

    const handleStopRecording = () => {
        setIsRecording(false)
        console.log('녹화 종료')
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
    };

    const handleDownload = () => {
        const blob = new Blob(recordedBlobs, { type: "video/webm" });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'recorded.webm';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            setRecordedBlobs([])
        }, 100);
    }

    const handleUpload = async () => {
        const blob = new Blob(recordedBlobs, { type: "video/webm" });
        const formData = new FormData()
        formData.append('videoFile', blob)
        formData.append('videoTitle', "타이틀!")
        await uploadVideoAction(formData)
        setTimeout(() => {
            setRecordedBlobs([])
        }, 100);
    }

    useEffect(() => {
        if (!stream) {
            getMedia()
        }
        // 트랙 종료시 stream unmount
        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => {
                    track.stop()
                });
            }
        }
    }, [stream])


    return (
        <>
            <div className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.screenBox}>
                        <div className={styles.screen}>
                            <div style={{ width: '100%', height: '100%' }}>
                                <video ref={mirrorVideoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }} />
                            </div>
                        </div>
                        <div className={styles.recordList}>
                            <video ref={testVideoRef} controls style={{ width: '200px', height: '200px' }}>
                                <source src={webm} type='video/webm' />
                            </video>
                        </div>
                    </div>
                    <div className={styles.buttonBox}>
                        {
                            !isRecording ?
                                (<button onClick={() => handleStartRecording()}>
                                    <PlayCircleFilledWhiteIcon /> <span>녹화 시작</span>
                                </button>) :
                                (<button onClick={() => handleStopRecording()}>
                                    <StopCircleIcon /> <span>중지</span>
                                </button>)
                        }
                        {
                            recordedBlobs.length !== 0 ? <button onClick={() => handleDownload()}>다운로드</button> : null
                        }
                        {
                            recordedBlobs.length !== 0 ? <button onClick={() => handleUpload()}>이건 업로드</button> : null
                        }
                        <button onClick={() => navigate('/single')} style={{ position: 'absolute', right: '30px' }}>
                            <LogoutIcon />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleRecordPage;