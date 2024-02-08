import React, { useEffect, useRef, useState } from 'react';

import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import Modal from '@mui/material/Modal';

import styles from './SingleRecordPage.module.css'
import { useNavigate } from 'react-router-dom';
import { uploadVideoAction } from './actions/uploadVideoAction';
import { getSingleRecordListAction } from './actions/getSingleRecordListAction';
import { checkDuplicateTitle } from './actions/checkDuplicateTitle';

const SingleRecordPage = () => {
    const [isRecording, setIsRecording] = useState(false)
    const navigate = useNavigate()

    // 해당 값이 null -> 연결이 종료
    const [stream, setStream] = useState(null);
    // 녹화를 저장할 blob
    const [recordedBlobs, setRecordedBlobs] = useState([]);
    const [isDuplicateTitle, setIsDuplicateTitle] = useState(false)
    // 녹화 영상 제목
    const [videoTitle, setVideoTitle] = useState('')
    // 녹화 영상 리스트
    const [recordList, setRecordList] = useState([])
    // 녹화되는 화면을 표시해주는 듯한 느낌을 줄 ref
    const mirrorVideoRef = useRef(null);
    // 녹화 화면을 담을 ref
    const mediaRecorderRef = useRef(null);


    // modal state
    const [open, setOpen] = React.useState(false);
    const handleClose = () => { setOpen(false); setIsDuplicateTitle(false); setVideoTitle('') }

    /**
     *  유저의 미디어를 받아오고 마이크가 없을 시 오류를 콘솔로 띄워줌
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

    /**
     *  녹화를 시작하는 함수
     */
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
    };


    /**
     * 다운로드 함수
     */
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

    /**
    *  blob객체를 생성하고 입력받은 videoTitle과 함께 데이터 폼으로 전달
    */
    const handleUpload = async () => {
        const blob = new Blob(recordedBlobs, { type: "video/webm" });
        const formData = new FormData()
        formData.append('videoFile', blob)
        formData.append('videoTitle', videoTitle)
        const isduplicated = await checkDuplicateTitle(videoTitle)
        console.log(isduplicated)

        if (!isduplicated) {
            await uploadVideoAction(formData)
            handleClose()
            setTimeout(() => {
                setRecordedBlobs([])
            }, 100);
        } else {
            setIsDuplicateTitle(isduplicated)
        }
    }

    /**
     * 업로드용 확인 modal을 열어주는 함수
     */
    const openUploadModal = () => {
        setOpen(true);
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

    useEffect(() => {
        const getList = async () => {
            const res = await getSingleRecordListAction()
            setRecordList(res)
        }
        getList()
    }, [open])

    return (
        <>
            <div className={styles.background}>
                <div className={styles.container}>
                    <div className={styles.topBox}>
                        <div className={styles.screenBox}>
                            <video ref={mirrorVideoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }} />
                        </div>
                        <div className={styles.recordList}>
                            {
                                // 녹화한 영상들을 띄워주는 코드
                                // ref={testRef} 삭제했음
                                recordList.length !== 0 ?
                                    (recordList.map((element, i) => {
                                        return (
                                            <video controls style={{ width: '200px', height: '200px' }}>
                                                <source src={element.presigned_url} type='video/webm' />
                                            </video>
                                        )
                                    })) : null
                            }

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
                            recordedBlobs.length !== 0 ?
                                <button onClick={() => openUploadModal()}>업로드</button> : null
                        }
                        <button onClick={() => navigate('/single')} style={{ position: 'absolute', right: '30px' }}>
                            <LogoutIcon />
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
                    <input value={videoTitle} onChange={(event) => { setVideoTitle(event.target.value); console.log(videoTitle) }} placeholder='영상 제목을 입력해주세요' />
                    {isDuplicateTitle ? <p style={{ padding: '0', margin: '0' }}>중복되는 이름의 영상이 존재합니다</p> : null}
                    <div className={styles.modalButtonBox}>
                        <button onClick={() => { handleUpload(); }}>저장</button>
                        <button onClick={() => { setRecordedBlobs([]); handleClose() }}>취소</button>
                    </div>
                </div>
            </Modal >
        </>
    );
};

export default SingleRecordPage;