import React, { useEffect, useState } from 'react';

import styles from './RightChatBox.module.css'
import { getGroupRecordListAction } from '../actions/getGroupRecordListAction';

// const MainContainer = styled("div")({
//     width: "25%",
//     height: "100%",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     backgroundColor: "#C0AB9A",
//     right: '0px',
// });


const RightChatBox = (props) => {
    // 채팅을 연결할 세션, ov를 받아와야함, 유저네임을
    const { id, userName } = props
    const [recordList, setRecordList] = useState([])
    // 기본적으로 채팅박스를 보여주고 그게 아니라면 영상 리스트를 제공
    const [isChatBoxOpen, setIsChatBoxOpen] = useState(true)

    const openChatBox = () => {
        if (!isChatBoxOpen) {
            setIsChatBoxOpen(true)
        }
    }

    const openVideoBox = () => {
        if (isChatBoxOpen) {
            setIsChatBoxOpen(false)
        }
    }

    useEffect(() => {
        const getRecoudList = async () => {
            console.log('getRecordList 무한로딩 확인')
            const res = await getGroupRecordListAction(id)
            setRecordList(res)
        }
        getRecoudList()
    }, [isChatBoxOpen, id])

    return (
        <div className={styles.mainContainer}>
            <div className={styles.topButtonTap}>
                <button onClick={() => { openChatBox() }}>채팅</button>
                <button onClick={() => { openVideoBox() }}>그룹 녹화 영상</button>
            </div>
            <div>
                {
                    isChatBoxOpen ?
                        <>
                            <div className={styles.chatContainer}>
                                채팅박스
                            </div>
                            <div className={styles.messageInput}>
                                input박스
                            </div>
                        </>

                        :
                        <div>
                            {
                                recordList.length !== 0 ?
                                    (recordList.map((element, i) => {
                                        return (
                                            <video key={i} controls style={{ width: '200px', height: '200px' }}>
                                                <source src={element.presigned_url} type='video/webm' />
                                            </video>
                                        )
                                    })) : null
                            }
                        </div>
                }
            </div>
        </div>
    );
};

export default RightChatBox;