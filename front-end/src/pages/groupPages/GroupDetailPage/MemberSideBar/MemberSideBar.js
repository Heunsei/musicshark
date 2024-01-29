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
            {
                groupMembers.map((e, i) => {
                    return (
                        <MemberIcon key={i} />
                    )
                })
            }
            <AddMemberButton />
        </MainContainer>
    );
};



export default MemberSideBar;