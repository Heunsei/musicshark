import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';

import Navbar from '../../../components/Navbar';
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
    padding:'105px 0 ',
    flex:5
})

// 그룹페이지가 로드 될 때, back에 내가속한 그룹리스트를 요청하는 코드 실행.
// 그 데이터를 groupbox 에 전달 해주어야함
const GroupPage = () => {
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
                <GroupBox/>
            </BoxWrapper>
        </>

    );
};

export default GroupPage;