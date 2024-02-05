import React, { useEffect, useState } from 'react';
import { styled } from "@mui/system";
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios'

import MemberSideBar from './MemberSideBar/MemberSideBar';
import RightChatBox from './RightChatBox/RightChatBox';
import CenterInfoBox from './CenterInfoBox/CenterInfoBox';
import GroupRoom from '../GroupRoom/GroupRoom';
import { getGroupDetailAction } from './getGroupDetailAction';
import { getGroupMemberAction } from './getGroupMemberAction';

const Wrapper = styled("div")({
    width: "100%",
    height: "100vh",
    display: "flex",
    backgroundColor: "#FFEDD8",
    margin: '0',
    padding: '0',
});

// 그룹 디테일 페이지에 들어올때 마다
const GroupDetailPage = () => {
    let { id } = useParams()
    const navigate = useNavigate()
    let lobyState = useSelector((state) => state.isLoby)
    const userName = useSelector((state) => state.user.nickname)

    const [groupDetail, setGroupDetail] = useState([])
    const [groupMembers, setGroupMembers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getGroupDetailAction(id, setGroupDetail)
                await getGroupMemberAction(id, setGroupMembers)
                setIsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [id])

    useEffect(() => {
        if (!isLoading && (!groupDetail || !groupMembers)) {
            navigate('/group');
        }
        if (!isLoading && groupMembers) {
            let isMemberInGroup = false
            groupMembers.map((e) => {
                if (e.nickname === userName) {
                    isMemberInGroup = true
                }
            })
            if (!isMemberInGroup) {
                navigate('/group');
            }
        }
    }, [isLoading, navigate]);

    if (isLoading) {
        return (
            <p>로딩중</p>
        )
    }
    return (
        <Wrapper>
            <MemberSideBar groupMembers={groupMembers} setGroupMembers={setGroupMembers} setGroupDetail={setGroupDetail} />
            {
                // 유저가 연습이동을 누르면 state를 변경하고 infobox를 practicebox로 변경
                lobyState.isLoby && groupDetail ? <CenterInfoBox groupDetail={groupDetail} /> : <GroupRoom />
            }
            <RightChatBox />
        </Wrapper>
    );
};

export default GroupDetailPage;