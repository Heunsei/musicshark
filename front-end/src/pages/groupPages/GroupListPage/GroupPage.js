import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';

import Navbar from '../../../components/Navbar';
import GroupInput from './GroupInput/GroupInput';
import GroupBox from './GroupBox/GroupBox';
import GroupBottom from './GroupBottom/GroupBottom';
import loadGroupAction from './loadGroupAction';
import { useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';

const BoxWrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFEDD8',
    flexDirection: 'column',
    padding: '105px 0 ',
    flex: 5
})

// 그룹페이지가 로드 될 때, back에 내가속한 그룹리스트를 요청하는 코드 실행.
// 그 데이터를 groupbox 에 전달 해주어야함
const GroupPage = () => {
    const [searchText, setSearchText] = useState('')
    const [groupList, setGroupList] = useState([])

    useEffect(() => {
        loadGroupAction(setGroupList)
    }, [])

    useEffect(() => {
        console.log(searchText)
    }, [searchText])

    return (
        <>
            <Navbar />
            <BoxWrapper>
                <GroupInput value={searchText}
                    setValue={setSearchText} />
                <GroupBox groupList={groupList} setGroupList={setGroupList} />
            </BoxWrapper>
        </>

    );
};

export default GroupPage;