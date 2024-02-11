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

    const [screenOV, setScreenOV] = useState(undefined)
    const [session, setSession] = useState(undefined)

    const [groupDetail, setGroupDetail] = useState([])
    const [groupMembers, setGroupMembers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [recordList, setRecordList] = useState([])

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
            // 0209 -> change map to forEach
            groupMembers.forEach((e) => {
                if (e.nickname === userName) {
                    isMemberInGroup = true
                }
            })
            if (!isMemberInGroup) {
                navigate('/group');
                alert('접근할 수 없는 페이지 입니다')
            }
        }
    }, [isLoading, navigate, groupDetail, groupMembers, userName]);

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
                lobyState.isLoby && groupDetail ? <CenterInfoBox groupDetail={groupDetail} setGroupDetail={setGroupDetail} />
                    :
                    <GroupRoom screenOV={screenOV} setScreenOV={setScreenOV} session={session} setSession={setSession}
                        recordList={recordList} setRecordList={setRecordList} />
            }
            <RightChatBox id={id} userName={userName} session={session} setSession={setSession}
                recordList={recordList} setRecordList={setRecordList} />
        </Wrapper>
    );
};

export default GroupDetailPage;