import React, { useEffect, useState } from 'react';
import { styled } from "@mui/system";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import MemberSideBar from './MemberSideBar/MemberSideBar';
import RightChatBox from './RightChatBox/RightChatBox';
import CenterInfoBox from './CenterInfoBox/CenterInfoBox';
import GroupRoom from '../GroupRoom/GroupRoom';

const Wrapper = styled("div")({
    width: "100%",
    height: "100vh",
    display: "flex",
    backgroundColor: "#FFEDD8",
});

const GroupDetailPage = () => {
    let { id } = useParams()
    const [isUserInLobby, setIsUserInLobby] = useState(false)
    const [groupDetail, setGroupDetail] = useState([])
    const [groupMembers, setGroupMembers] = useState([
        {
            user_nickname : 'heunoh',
        },
        {
            user_nickname : 'wowow',
        },

    ])
    const getCurrentGroupDetail = () => {
        setGroupDetail({
            channel_name: '채널1',
            channel_intro: '채널 1 intro',
            channel_max: 6,
            channel_cur: 3,
            channel_date: '2024-01-01',
        })
    }
    useEffect(() => {
        getCurrentGroupDetail()
    },[])
    return (
        <Wrapper>
            <MemberSideBar groupMembers={groupMembers}/>
            {   
                // 유저가 연습이동을 누르면 state를 변경하고 infobox를 practicebox로 변경
                isUserInLobby ? <CenterInfoBox groupDetail={groupDetail} /> : <GroupRoom/>
            }
            <RightChatBox />
        </Wrapper>
    );
};

export default GroupDetailPage;