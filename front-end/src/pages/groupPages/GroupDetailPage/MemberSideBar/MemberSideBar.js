import React from 'react';
import { styled } from '@mui/material';
import TopIcon from './TopIcon';
import AddMemberButton from './AddMemberButton';
import MemberIcon from './MemberIcon';

const MainContainer = styled("div")({
    width: "6%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#C0AB9A",
    overflow: 'hidden'
});

const MemberSideBar = (props) => {
    const { groupMembers } = props
    console.log(groupMembers)
    return (
        <MainContainer>
            <TopIcon />
            <AddMemberButton />
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