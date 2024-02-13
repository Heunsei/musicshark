import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';

import getGroupListAction from './getGroupListAction';
import styles from './GroupInput.module.css'

const GroupInput = (props) => {
    const { value, setValue, groupList, setGroupList } = props
    const navigate = useNavigate()
    // searchGroup state
    const [originalList, setOriginalList] = useState([])
    const [filterGroup, setFilterGroup] = useState([])
    // modal state
    const [open, setOpen] = React.useState(false);
    // 닫을 때, 검색기록(setValue), 필터된 채널들 초기화
    const handleClose = () => {
        setOpen(false)
        setValue('')
        setFilterGroup([])
    };

    const handleMoveToGroup = (channelIdx) => {
        console.log('이동')
        navigate(`/group/${channelIdx}`)
    }


    useEffect(() => {
        const getGroupList = async () => {
            const response = await getGroupListAction()
            setOriginalList([...response])
        }
        getGroupList()
    }, [])

    const checkGroupList = (event) => {
        if (!value) {
            setGroupList([...originalList])
        }
        else if (event.key === 'Enter' || event.type === 'click') {
            console.log(originalList)
            const tempGroup = groupList.filter((group) => group.channelName.toLowerCase().includes(value.toLowerCase()))
            setFilterGroup([...tempGroup])
            setOpen(true)
        }
    }

    return (
        <>
            <div className={styles.groupInputBox}>
                <input className={styles.customInput}
                    placeholder='검색할 그룹명을 입력하세요'
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    onKeyDown={(event) => checkGroupList(event)}
                    maxLength={20}
                />
                <button className={styles.searchSubmitButton} onClick={(event) => checkGroupList(event)} disabled={!value}>
                    <SearchIcon />
                </button>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={styles.modalStyle}>
                    <p className={styles.modalHeader}>검색 그룹 목록</p>
                    {
                        filterGroup.length ?
                            filterGroup.map((element, i) => {
                                return (
                                    <div className={styles.searchResult} key={i}>
                                        <p className={styles.searchGroupName}>{element.channelName}</p>
                                        <button className={styles.searchGroupButton} onClick={() => handleMoveToGroup(element.channelIdx)}>이동하기</button>
                                    </div>
                                )
                            }) : <p>검색 결과가 없습니다</p>
                    }
                </div>
            </Modal>
        </>
    );
};

export default GroupInput;