import React, { useEffect, useState } from 'react';
import { styled } from "@mui/system";
import { useParams } from 'react-router-dom';
import axios from 'axios'
import MemberSideBar from './MemberSideBar/MemberSideBar';
import RightChatBox from './RightChatBox/RightChatBox';
import CenterInfoBox from './CenterInfoBox/CenterInfoBox';
import GroupRoom from '../GroupRoom/GroupRoom';
import getGroupDetailAction from './getGroupDetailAction';
import getGroupMemberAction from './getGroupMemberAction';

const Wrapper = styled("div")({
    width: "100%",
    height: "100vh",
    display: "flex",
    backgroundColor: "#FFEDD8",
});

// 그룹 디테일 페이지에 들어올때 마다
const GroupDetailPage = () => {
    let { id } = useParams()
    const [isUserInLobby, setIsUserInLobby] = useState(true)
    const [groupDetail, setGroupDetail] = useState([])
    const [groupMembers, setGroupMembers] = useState([])
    console.log(`그룹 멤버들${groupMembers}`)
    useEffect(() => {
        getGroupDetailAction(id, setGroupDetail)
        getGroupMemberAction(id, setGroupMembers)
    }, [id])

    return (
        <Wrapper>
            <MemberSideBar groupMembers={groupMembers} />
            {
                // 유저가 연습이동을 누르면 state를 변경하고 infobox를 practicebox로 변경
                isUserInLobby ? <CenterInfoBox groupDetail={groupDetail} /> : <GroupRoom />
            }
            <RightChatBox />
        </Wrapper>
    );
};

export default GroupDetailPage;