import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system';

import Navbar from '../../../components/Navbar';
import GroupInput from './GroupInput/GroupInput';
import GroupBox from './GroupBox/GroupBox';
import GroupBottom from './GroupBottom/GroupBottom';
import loadGroupAction from './loadGroupAction';
import { useDispatch, useSelector } from 'react-redux';
import { redirect, useNavigate } from 'react-router-dom';
import { logoutAction } from '../../authPages/LoginPage/logoutAction';

const BoxWrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFEDD8',
    flexDirection: 'column',
    flex: 5,
    position: 'relative'
})

// 그룹페이지가 로드 될 때, back에 내가속한 그룹리스트를 요청하는 코드 실행.
// 그 데이터를 groupbox 에 전달 해주어야함
const GroupPage = () => {
    const [searchText, setSearchText] = useState('')
    const [groupList, setGroupList] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        loadGroupAction(setGroupList, navigate, dispatch)
    }, [])

    useEffect(() => {
        console.log(searchText)
    }, [searchText])

    return (
        <>
            <Navbar />
            <BoxWrapper>
                <GroupInput value={searchText}
                    setValue={setSearchText} groupList={groupList} setGroupList={setGroupList} />
                <GroupBox groupList={groupList} setGroupList={setGroupList} />
            </BoxWrapper>
        </>

    );
};

export default GroupPage;