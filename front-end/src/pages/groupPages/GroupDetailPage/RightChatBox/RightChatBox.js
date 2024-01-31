import React from 'react';
import { styled } from "@mui/system";

const MainContainer = styled("div")({
    width: "25%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#C0AB9A",
    right : '0px',
    position : 'absolute'
  });


const RightChatBox = () => {
    return (
        <MainContainer>
            채팅박스가 들어갈 공간입니다
        </MainContainer>
    );
};

export default RightChatBox;