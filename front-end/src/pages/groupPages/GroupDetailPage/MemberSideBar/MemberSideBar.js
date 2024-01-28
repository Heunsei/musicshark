import React from 'react';
import { styled } from '@mui/material';
import MemberIcon from './MemberIcon';
import AddMemberButton from './AddMemberButton';

const MainContainer = styled("div")({
    width: "72px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#C0AB9A",
  });

const MemberSideBar = () => {
    return (
        <MainContainer>
            <MemberIcon/>

            <AddMemberButton/>
        </MainContainer>
    );
};



export default MemberSideBar;