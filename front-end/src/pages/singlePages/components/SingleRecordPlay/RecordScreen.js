import React, { useEffect, useRef, useState } from 'react';

const RecordScreen = () => {

    // MediaStream을 받아서 연결함, 모든 ref에 audio, video등 web Api를 연결하는 역할
    // 해당 값이 null이 된다면 연결이 종료되었음을 의미
    const [stream, setStream] = useState(null);
    // 녹화 여부를 확인하는 state, 해당 페이지에서 폭넓게 사용될 예정
    const [recording, setRecording] = useState(false);
    // 녹화된 결과물이 저장됩니다. type은 Blob[] 입니다. 
    const [recordedBlobs, setRecordedBlobs] = useState([]);
    
    // 핵심이 되는 내용입니다. 오로지 "거울"역할만을 수행하며, 마치 화면이 녹화되는 듯한 UX를 제공합니다.
    const mirrorVideoRef = useRef(null);
    // dom내부에선 보여지지 않지만, 내부에서 "녹화"에 대한 기능만을 수행합니다. 
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
            setStream(mediaStream); // 해당 stream은 아래의 recorder에서도 동일하게 사용됩니다. 
            if (mirrorVideoRef.current) { // 현재 페이지에서 거울 역할을 할 video 태그입니다.
                mirrorVideoRef.current.srcObject = mediaStream;
            }
        } catch (e) {
            console.log(`현재 마이크와 카메라가 연결되지 않았습니다`);
        }
    };

    useEffect(() => {
        // 미디어 스트림이 설정되지 않았을 때 getMedia 호출
        if(!stream){
            getMedia()
        }
        // 트랙 종료시 stream unmount
        return () => {
            if(stream){
                stream.getTracks().forEach((track) => {
                    track.stop()
                });
            }
        }
    },[stream])

    return (
        <div style={{width: '100%', height : '100%'}}>
            <video ref={mirrorVideoRef} autoPlay muted playsInline style={{width: '100%', height : '100%'}}/>
        </div>
    );
};

export default RecordScreen;