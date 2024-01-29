import React from 'react';
import { styled } from '@mui/system'

const Container = styled('div')({
    backgroundColor : '#C0AB9A',
    width : '90%',
    height : '50%',
    // position : 'absolute',
    display : 'flex',
    textAlign : 'center',
    alignItems : 'center',
    flexDirection: 'column',
    borderRadius : '15px',
    overflow : 'auto'
})

const GroupInfoBox = (props) => {
    const { groupDetail } = props
    return (
        <Container>
            <p>{ groupDetail.channel_name }</p>
            <p>{groupDetail.channel_intro}</p>
            <p>{`현재 인원 : ${groupDetail.channel_cur} / ${groupDetail.channel_max}`}</p>
            <p>{`채널 생성일 : ${groupDetail.channel_date}`}</p>
        </Container>
    );
};

export default GroupInfoBox;