import React from 'react';
import { styled } from '@mui/system'

import InnerContainer from './InnerContainer'

const InfoContainer = styled('div')({
    display: 'flex',
    width: '69%',
    justifyContent: 'center',
    alignItems: 'center',
})

// InnerContainer > 요소들을 감쌀 div안의 작은 div
const CenterInfoBox = (props) => {
    const { groupDetail } = props
    return (
        <InfoContainer>
            <InnerContainer groupDetail={groupDetail} />
        </InfoContainer>
    );
};

export default CenterInfoBox;