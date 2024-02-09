import React, { useEffect, useState } from 'react'

import styles from './RightChatBox.module.css'
import { getGroupRecordListAction } from '../actions/getGroupRecordListAction'

const RightChatBox = (props) => {
    // 채팅을 연결할 세션, ov를 받아와야함
    const { id, userName, session, setSession } = props

    // 기본적으로 채팅박스를 보여주고 그게 아니라면 영상 리스트를 제공
    const [recordList, setRecordList] = useState([])
    const [chatList, setChatList] = useState([])
    const [message, setMessage] = useState([])


    const [isChatBoxOpen, setIsChatBoxOpen] = useState(true)

    useEffect(() => {
        if (session) {
            session.on('signal:chat', (event) => {
                const data = JSON.parse(event.data);
                let messageList = [...chatList]
                messageList.push({ connectionId: event.from.connectionId, nickname: data.nickname, message: data.message });
                setChatList(messageList)
            });
        }
    }, [session, chatList])

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

    const sendMessage = () => {
        console.log('현재 보내는 메세지 : ', message)
        // 세션이 있을때만 메세지를 보내게 해야함
        if (session) {
            let newMessage = message.replace(/ +(?= )/g, '');
            if (newMessage !== '' && newMessage !== ' ') {
                const data = { message: newMessage, nickname: userName, streamId: session.streamId };
                session.signal({
                    data: JSON.stringify(data),
                    type: 'chat',
                });
            }
        }
        setMessage('')
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
                <button className={`${isChatBoxOpen ? styles.selected : null}`} onClick={() => { openChatBox() }}>채팅</button>
                <button className={`${!isChatBoxOpen ? styles.selected : null}`} onClick={() => { openVideoBox() }}>그룹 녹화 영상</button>
            </div>
            <div className={styles.container}>
                {
                    isChatBoxOpen ?
                        <>
                            <div className={styles.chatContainer}>
                                {
                                    session === undefined ? <p>그룹 통화에 참여해야 합니다</p> :
                                        chatList.map((e, i) => {
                                            return (
                                                <>
                                                    <div className={`${e.nickname===userName ? styles.myChat : styles.anotherChat} `}>
                                                        <p>{e.nickname}</p>
                                                        <p>{e.message}</p>
                                                    </div>
                                                </>
                                            )
                                        })
                                }
                            </div>
                            <div className={styles.messageInputBox}>
                                <input value={message} onChange={(event) => { setMessage(event.target.value) }}
                                    placeholder='메세지를 입력하세요' className={styles.messageInput} />
                                <button className={styles.sendMessageBtn} onClick={() => sendMessage()}>전송</button>
                            </div>
                        </>

                        :
                        <div>
                            {/* {
                                recordList.length !== 0 ?
                                    (recordList.map((element, i) => {
                                        return (
                                            <video key={i} controls style={{ width: '200px', height: '200px' }}>
                                                <source src={element.presigned_url} type='video/webm' />
                                            </video>
                                        )
                                    })) : null
                            } */}
                        </div>
                }
            </div>
        </div>
    );
};

export default RightChatBox;