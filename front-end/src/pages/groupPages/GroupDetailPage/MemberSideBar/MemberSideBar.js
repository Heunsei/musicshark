import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { styled } from '@mui/material';
import TopIcon from './TopIcon';
import AddMemberButton from './AddMemberButton';
import MemberIcon from './MemberIcon';

const MainContainer = styled("div")({
    width: "5%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#C0AB9A",
    overflow: 'hidden',
});

const MemberSideBar = (props) => {
    const { groupMembers, setGroupMembers, setGroupDetail } = props
    return (
        <MainContainer>
            <TopIcon groupMembers={groupMembers} />
            <AddMemberButton setGroupMembers={setGroupMembers} setGroupDetail={setGroupDetail} />
            {
                groupMembers.map((element, i) => {
                    return (
                        <MemberIcon key={i} member={element} />
                    )
                })
            }
        </MainContainer>
    );
};



export default MemberSideBar;