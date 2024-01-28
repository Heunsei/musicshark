import React from 'react';
import { styled } from "@mui/system";
import { useParams } from 'react-router-dom';
import MemberSideBar from './MemberSideBar/MemberSideBar';
import RightChatBox from './RightChatBox/RightChatBox';

const Wrapper = styled("div")({
    width: "100%",
    height: "100vh",
    display: "flex",
  });

const GroupDetailPage = () => {
    let {id} = useParams()
    const getCurrentGroupDetail = () => {
        // 현재 들어온 그룹 상세 페이지에 대한 정보를 요청할 axios 요청
    }
    return (
        <Wrapper>
            <MemberSideBar/>

            <RightChatBox/>
        </Wrapper>
    );
};

export default GroupDetailPage;