import React from 'react';
import { styled } from '@mui/system'
import GroupInfoBox from './GroupInfoBox';
import GroupBottomBox from './GroupBottomBox';

const Container = styled('div')({
    display: 'flex',
    // position : 'relative',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: '60%',
    flexDirection: 'column'
})

const InnerContainer = (props) => {
    const { groupDetail, setGroupDetail } = props
    return (
        <Container>
            <GroupInfoBox groupDetail={groupDetail} setGroupDetail={setGroupDetail} />
            <GroupBottomBox />
        </Container>
    );
};



export default InnerContainer;