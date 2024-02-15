import styles from './PerfectPlayPlayPage.module.css';
import React, { useRef, useEffect, useState } from 'react';
import { PitchDetector } from 'pitchy';
import { useCanvas } from './useCanvas';
import { useAnimation } from './useAnimation';
import randomData from './randomData.json';
import * as data from './PerfectScoreData';
import Popup from './Popup';
import './Popup.css';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { postPlayScoreAction } from '../../actions/postPlayScoreAction';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../../../util/cookie';
import axios from 'axios'
import { getSongListAction } from '../../actions/getSongListAction';
import { getSongDetailAction } from '../../actions/getSongDetailAction';

const PlayScreen = ({ songIdx }) => {
    const [isAudioContextInitialized, setAudioContextInitialized] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEndOpen, setIsEndOpen] = useState(false);
    const [number, setNumber] = useState(3);
    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState([]);
    const [songInfo, setSongInfo] = useState([]);    

    const getSongInfo = async () => {
        try{
            const response = await getSongDetailAction(1);
            const data = response.data.data;
            console.log(data);
            setSongInfo(data);
            

        }catch(error){
            console.error(error);
        }
    }

    const startButtonClick = async () => {
        setIsPlaying(true);
        try {
            if (!isAudioContextInitialized) {
                await audioCtx.resume();
                setAudioContextInitialized(true);
            }
            startTimeRef.current = Date.now();
            particles.length = 0; // 파티클 초기화
            console.log('AudioContext resumed successfully.');

            setTimeout(() => {
                setNumber(3);
            }, 1000);

            setTimeout(() => {
                // Step 2: 2초 후에 숫자 변경
                setNumber(2);
            }, 2000);

            setTimeout(() => {
                // Step 2: 3초 후에 숫자 변경
                setNumber(1);
            }, 3000);
            setTimeout(() => {
                // Step 3: 3초 후에 숫자를 없애는 로직
                setNumber("시작!");
            }, 4000);
            // setIsPlaying(true);

        } catch (error) {
            console.error('Error resuming AudioContext:', error);
        }
    };
    const stopButtonClick = async () => {
        pausedTimeRef.current = Date.now(); // 멈춘 시간 저장
        setIsPlaying(false);
        setIsModalOpen(true);
    }

    const restartPlayback = () => {
        setIsEndOpen(false)
        startTimeRef.current = Date.now();
        particles.length = 0; // 파티클 초기화

        setTimeout(() => {
            setNumber(3);
        }, 1000);

        setTimeout(() => {
            // Step 2: 2초 후에 숫자 변경
            setNumber(2);
        }, 2000);

        setTimeout(() => {
            // Step 2: 3초 후에 숫자 변경
            setNumber(1);
        }, 3000);
        setTimeout(() => {
            // Step 3: 3초 후에 숫자를 없애는 로직
            setNumber("시작!");
        }, 4000);
        setIsPlaying(true);
    };
    const halfSize = data.NOTE_WINDOW_SIZE / 2;
    const voiceNoteWindowRef = useRef(new Array(halfSize));
    const songNoteWindowRef = useRef(Array.from({ length: data.NOTE_WINDOW_SIZE }, () => [0, 0, 0]));
    const songDataRef = useRef([]); //note,time,cnt
    const startTimeRef = useRef(0);
    const pausedTimeRef = useRef(0);
    const particles = [];

    // particles.push(exampleParticle);

    //캔버스
    const canvasWidth = 950;
    const canvasHeight = 450;
    const canvasRef = useCanvas(canvasWidth, canvasHeight);

    // 파티클
    const drawParticle = (noteWindow, ctx) => {
        if (noteWindow[halfSize][0] < 10) return;

        const makeParticle = (particleNum) => {
            const particleY = canvasHeight - noteWindow[halfSize][0] * 3;

            for (let i = 0; i < particleNum; i++) {
                const speed = {
                    x: Math.random() * 2,
                    y: Math.random() * 2 - 1,
                };
                const radius = Math.random();
                const color = data.PARTICLE_COLOR;
                const dy = Math.random() * 10;
                const startY = particleY + dy;
                const startX =
                    Math.random() * (5 - Math.abs(dy - 5)) + canvasWidth * 0.5 + 2;
                const life = Math.random() * 5 + 5;

                particles.push({
                    speed,
                    startX,
                    startY,
                    radius,
                    color,
                    life,
                });
            }
        };

        // 파티클 유지 여부
        for (let i = 0; i < particles.length; i++) {
            const particle = particles[i];
            particle.startX += particle.speed.x;
            particle.startY += particle.speed.y;
            particle.life -= 1;

            if (particle.life < 0) {
                particles.splice(i, 1);
            }
        }

        if (particles.length < data.PARTICLE_COUNT) {
            makeParticle(data.PARTICLE_COUNT - particles.length);
        }

        // 파티클 그리기
        for (let i = 0; i < particles.length; i++) {
            ctx.beginPath();
            ctx.fillStyle = particles[i].color;
            ctx.arc(
                particles[i].startX,
                particles[i].startY,
                particles[i].radius,
                0,
                Math.PI * 2
            );
            ctx.fill();
            ctx.closePath();
        }
    };

    //음성
    const audioCtx = new AudioContext();
    const analyser = audioCtx.createAnalyser();

    analyser.minDecibels = data.MIN_DB;
    analyser.smoothingTimeConstant = data.SMOOTHING_TIME_CONSTANT;
    analyser.fftSize = data.FFT_SIZE;

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(stream => {
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
        })
        .catch(error => {
            console.error('Error accessing microphone:', error);
        });

    //마이크 음정   
    const voiceNoteWindow = voiceNoteWindowRef.current;
    const songNoteWindow = songNoteWindowRef.current;
    const songData = songDataRef.current;

    //음정 분석 데이터 배열
    const dataArrayRef = useRef(new Float32Array(data.BUFFER_SIZE));

    const pitchDetectorRef = useRef(
        PitchDetector.forFloat32Array(data.BUFFER_SIZE)
    );

    const isSilentBuffer = (buffer) => {
        let ret = 0;
        for (let i = 0; i < buffer.length; i++) {
            ret += buffer[i] * buffer[i];
        }
        return Math.sqrt(ret / buffer.length) < data.SILENCE_THRESHOLD;
    };

    let songIndex = 0;
    let block = 1;
    let scoreText = '';
    let barColor = '';

    // 유저 정보
    const getUserAction = async () => {
        const URL = process.env.REACT_APP_API_URL
        const accessToken = getCookie('accessToken')
        try {
            const response = await axios({
                method: 'get',
                url: `${URL}/user/`,
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            return response
        } catch (err) {
            console.log(err)
        }
    }
    const getUser = async () => {
        try {
            const response = await getUserAction();
            const data = response.data;
            setUserInfo(data);
        }
        catch (error) {
            console.log(error);
        }
    }

    let totalScore = 0;
    let avgScore = 0;
    let flag = false;

    const play = () => {

        if (
            !dataArrayRef.current ||
            !pitchDetectorRef.current ||
            !analyser ||
            !songData
        ) return;

        const canvas = canvasRef.current;
        const ctx = canvas ? canvas.getContext('2d') : null;
        if (!ctx) return;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        //음정 분석
        const dataArray = dataArrayRef.current;
        const pitchDetector = pitchDetectorRef.current;

        analyser.getFloatTimeDomainData(dataArray);

        // 주어진 dataArray를 사용하여 소리가 없는지 확인
        // 소리가 없다면 [-1, -1]을, 있으면 주파수를 찾아 pitch에 저장
        const pitch = isSilentBuffer(dataArray)
            ? [-1, -1]
            : pitchDetector.findPitch(dataArray, analyser.context.sampleRate);

        //음높이를 MIDI 노트로 변환하는 함수
        function freqToNote(freq) {
            return Math.round(12 * (Math.log(freq / 440.0) / Math.log(2))) + 69;
        }

        // 음정 분석 결과를 노트 윈도우에 저장
        let note = freqToNote(pitch[0]);
        if (note < 40 || note > 90) { // 노트가 40보다 작거나 90보다 크면 -1로 설정
            note = -1;
        }

        voiceNoteWindow.push(note); // 노트를 음성 노트 윈도우에 추가

        if (voiceNoteWindow.length > halfSize) { // 노트 윈도우의 길이가 halfSize보다 크면 첫 번째 요소를 제거
            voiceNoteWindow.shift();
        }

        // console.log('Pitch:', pitch);

        //현재 시간에 맞는 노래 데이터 저장
        const currentTime = (Date.now() - startTimeRef.current) / 1000;

        if (songData[songIndex].cnt == songData[songData.length - 1].cnt) {

            setIsPlaying(false);
            if (!flag) {
                flag = true;
                setIsEndOpen(true);
                postPlayScoreAction(userInfo.userIdx, songIdx, avgScore);
            }
        }
        if (songIndex >= songData.length) {
            console.log("!!종료!!");
            return;
        }
        if (currentTime > songData[songIndex].time) {
            songIndex += 1;
        }

        if (
            songNoteWindow[halfSize][0] !== -1 &&
            songNoteWindow[halfSize][0] === songNoteWindow[halfSize + 1][0]
        ) {
            block += 1;
        } else if (
            songNoteWindow[halfSize][0] !== -1 &&
            songNoteWindow[halfSize][0] !== songNoteWindow[halfSize + 1][0]
        ) {
            let correct = 0;
            block = Math.min(block, halfSize);
            for (let i = 0; i < block; i++) {
                if (
                    Math.abs(
                        voiceNoteWindow[halfSize - i] - songNoteWindow[halfSize - i][0],
                    ) < 3
                ) {
                    correct += 1;
                }
            }
            if (correct > block * 0.5) {
                barColor = 1;
                scoreText = 'PERFECT';
                totalScore += 100;
                avgScore = totalScore / randomData.length;
            } else if (correct > block * 0.3) {
                barColor = 2;
                scoreText = 'GREAT';
                totalScore += 75;
                avgScore = totalScore / randomData.length;
            } else if (correct > block * 0.1) {
                barColor = 3;
                scoreText = 'GOOD';
                totalScore += 50;
                avgScore = totalScore / randomData.length;
            } else if (correct > 0) {
                barColor = 4;
                scoreText = 'NORMAL';
                totalScore += 25;
                avgScore = totalScore / randomData.length;
            } else {
                barColor = 5;
                scoreText = 'BAD';
                totalScore += 0;
                avgScore = totalScore / randomData.length;
            }
            for (let i = 0; i < block; i++) {
                songNoteWindow[halfSize - i][1] = barColor;
            }
            block = 1;
        }
        if (songIndex < songData.length) {
            songNoteWindow.push([songData[songIndex].note, 0, songData[songIndex].cnt]);
        }
        if (songNoteWindow.length > data.NOTE_WINDOW_SIZE) {
            songNoteWindow.shift();
        }

        const barWidth = canvasWidth / data.NOTE_WINDOW_SIZE;
        const barHeight = 10;

        //마이크 음정 출력
        const drawMicNote = () => {
            let x = 0;
            for (let i = 0; i < voiceNoteWindow.length; i++) {
                const y = canvasHeight - voiceNoteWindow[i] * 3;

                if (!Number.isNaN(y)) {
                    ctx.fillStyle = `rgba(255, 255, 255, 0.5)`;
                }
                ctx.beginPath();
                if (
                    i !== 0 &&
                    i !== voiceNoteWindow.length - 1 &&
                    voiceNoteWindow[i] !== voiceNoteWindow[i - 1] &&
                    voiceNoteWindow[i] !== voiceNoteWindow[i + 1]
                ) {
                    ctx.roundRect(x, y, barWidth, barHeight, [5, 5, 5, 5]);
                } else if (i !== 0 && voiceNoteWindow[i] !== voiceNoteWindow[i - 1]) {
                    ctx.roundRect(x, y, barWidth, barHeight, [5, 0, 0, 5]);
                } else if (
                    i !== voiceNoteWindow.length - 1 &&
                    voiceNoteWindow[i] !== voiceNoteWindow[i + 1]
                ) {
                    ctx.roundRect(x, y, barWidth, barHeight, [0, 5, 5, 0]);
                } else {
                    ctx.rect(x, y, barWidth, barHeight);
                }
                ctx.fill();
                x += barWidth;
            }
        };

        const barColorList = [
            data.NOTE_COLOR.gray,
            data.NOTE_COLOR.skyblue,
            data.NOTE_COLOR.green,
            data.NOTE_COLOR.yellow,
            data.NOTE_COLOR.purple,
            data.NOTE_COLOR.red,
        ];

        // 노래 음정 출력
        const drawMusicNote = () => {
            let musicX = barWidth * 2;
            for (let i = 1; i < data.NOTE_WINDOW_SIZE - 2; i++) {
                const musicY = canvasHeight - songNoteWindow[i][0] * 3;
                if (!Number.isNaN(musicY)) {
                    const gradient = ctx.createLinearGradient(
                        musicX,
                        musicY,
                        musicX + barWidth + 1,
                        musicY + barHeight,
                    );
                    gradient.addColorStop(0, barColorList[songNoteWindow[i][1]]);
                    gradient.addColorStop(1, '#fff5f5');
                    ctx.fillStyle = gradient;
                }

                ctx.beginPath();
                if (i !== 2 && songNoteWindow[i][0] !== songNoteWindow[i - 1][0]) {
                    ctx.roundRect(musicX, musicY, barWidth, barHeight, [5, 0, 0, 5]);
                } else if (
                    i !== data.NOTE_WINDOW_SIZE - 3 &&
                    songNoteWindow[i][0] !== songNoteWindow[i + 1][0]
                ) {
                    ctx.roundRect(musicX, musicY, barWidth, barHeight, [0, 5, 5, 0]);
                } else {
                    if (songNoteWindow[i][2] != songNoteWindow[i + 1][2]) {//같은데 다음 json 객체면 라운드 
                        ctx.roundRect(musicX, musicY, barWidth - 5, barHeight, [0, 5, 5, 0]);
                    }
                    else {
                        ctx.rect(musicX, musicY, barWidth + 1, barHeight);
                    }
                }
                ctx.fill();
                musicX += barWidth;
            }
        };

        if (isAudioContextInitialized) {
            drawMusicNote();
            drawMicNote();
            drawParticle(songNoteWindow, ctx);

            ctx.beginPath();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = 3;
            ctx.moveTo(canvasWidth * 0.5, 0);
            ctx.lineTo(canvasWidth * 0.5, canvasHeight - 55);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

            ctx.font = 'bold 30px Jalnan';
            ctx.fillStyle = barColorList[barColor];
            ctx.textAlign = 'center';
            ctx.fillText(scoreText, canvasWidth * 0.4, 50);
            ctx.fillStyle = 'white';
            ctx.fillText(avgScore.toFixed(2), canvasWidth / 2, canvasHeight - 20);
        }
    };

    useAnimation(() => {
        if (isPlaying) {
            play();
        }
    }, 0, [dataArrayRef, pitchDetectorRef, analyser]);

    // 노래 재생
    useEffect(() => {

        getSongInfo();
        getUser();
        const fetchMusic = async () => {
            for (let i = 0; i < randomData.length; i++) {
                songData.push(randomData[i]);
            }
            startTimeRef.current = Date.now();
        };
        fetchMusic();

    }, []);

    return (
        <div className={styles.body}>
            <div className={styles.container}>
                <div className={styles.infoBox}>
                    <div className={styles.card}>
                        <div className={styles.img}><img src={songInfo.songImg}></img></div>
                        <div className={styles.content}>
                            <div className={styles.title}>{songInfo.title}</div>
                            <div className={styles.singer}>{songInfo.singer}</div>
                        </div>
                    </div>
                </div>
                <div className={styles.screenBox}>
                    <NumberDisplay number={number} />
                    <canvas
                        id="screen-screen"
                        width={canvasWidth}
                        height={canvasHeight}
                        ref={canvasRef}
                    />
                    <div className={styles.buttonBox}>
                        {
                            !isPlaying ?
                                (<button onClick={() => startButtonClick()}>
                                    <PlayCircleFilledWhiteIcon /> <span>시작하기</span>
                                </button>) :
                                (<button onClick={() => stopButtonClick()}>
                                    <StopCircleIcon /> <span>중지</span>
                                </button>)
                        }
                        <button onClick={() => navigate('/single/perfect')} style={{ position: 'absolute', right: '30px' }}>
                            <LogoutIcon />
                        </button>
                    </div>
                </div>

                {isEndOpen && <Popup onClose={() => setIsModalOpen(false)} onRestartPlayback={restartPlayback} />}
                {isModalOpen && <Popup onClose={() => setIsModalOpen(false)} onRestartPlayback={restartPlayback} />}
            </div>
        </div>

    );
};

const NumberDisplay = ({ number }) => (
    <div>
        <h1>{number}</h1>
    </div>
);

export default PlayScreen;