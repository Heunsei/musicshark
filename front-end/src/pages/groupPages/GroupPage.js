import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Navbar from '../../components/navbar';
import GroupInput from './GroupInput/GroupInput';
import GroupBox from './GroupBox/GroupBox';
import GroupBottom from './GroupBottom/GroupBottom';

const BoxWrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFEDD8',
    flexDirection: 'column',

})


const GroupPage = () => {
    const [isShowBox, setIsShowBox] = useState(true)
    const [searchText, setSearchText] = useState('')
    useEffect(() => {
        console.log(searchText)
    },[searchText])
    return (
        <>
            <Navbar />
            <BoxWrapper>
                <GroupInput value={searchText}
                    setValue={setSearchText} />
                <GroupBox isShowBox={isShowBox}/>
                <GroupBottom />
            </BoxWrapper>
        </>

    );
};

export default GroupPage;