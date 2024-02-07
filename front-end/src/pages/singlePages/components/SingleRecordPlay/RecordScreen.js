import React, { useEffect, useRef, useState } from 'react';

const RecordScreen = (props) => {
    const { isRecording, setIsRecording } = props

    // 해당 값이 null -> 연결이 종료
    const [stream, setStream] = useState(null);
    // 녹화를 저장할 blob
    const [recordedBlobs, setRecordedBlobs] = useState([]);

    // 녹화되는 화면을 표시해주는 듯한 느낌을 줄 ref
    const mirrorVideoRef = useRef(null);
    // 녹화 화면을 담을 ref
    const mediaRecorderRef = useRef(null);

    const getMedia = async () => {
        try {
            const constraints = {
                audio: true,
                video: {
                    width: 1280,
                    height: 720,
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
        try {
            mediaRecorderRef.current = new MediaRecorder(stream, {
                audioBitsPerSecond: 128000,
                videoBitsPerSecond: 2500000,
                mimeType: "video/webm",
            });
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data && event.data.size > 0) {
                    setRecordedBlobs((prev) => [...prev, event.data]);
                }
            };
            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (e) {
            console.log(`MediaRecorder error`, e);
            setIsRecording(false)
        }
    };

    const handleStopRecording = () => {
        console.log('stop')
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
        <div style={{ width: '100%', height: '100%' }}>
            <video ref={mirrorVideoRef} autoPlay muted playsInline style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }} />
        </div>
    );
};

export default RecordScreen;