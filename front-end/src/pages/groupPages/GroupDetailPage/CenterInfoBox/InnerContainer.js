import React, { useState } from 'react';
import { styled } from '@mui/system'
import GroupInfoBox from './GroupInfoBox';
import GroupBottomBox from './GroupBottomBox';
import Calander from './../../../authPages/MyPage/Calendar'

const Container = styled('div')({
    display: 'flex',
    // position : 'relative',
    backgroundColor: '#C0AB9A',
    justifyContent: 'center',
    alignItems: 'center',
    width: '60%',
    height: '60%',
    flexDirection: 'column',
    borderRadius: '15px',
    boxShadow: '5px 5px black'
})

const InnerContainer = (props) => {
    const { groupDetail, setGroupDetail } = props
    const [isCalander, setIsCalander] = useState(false)
    return (
        <Container>
            {
                isCalander ?
                    <div style={{ height: '70%' }}>
                        <Calander />
                    </div>
                    :
                    < GroupInfoBox groupDetail={groupDetail} setGroupDetail={setGroupDetail} />

            }
            <GroupBottomBox isCalander={isCalander} setIsCalander={setIsCalander} />
        </Container>
    );
};



export default InnerContainer;