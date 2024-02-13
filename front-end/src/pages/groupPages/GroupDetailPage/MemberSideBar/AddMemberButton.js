import React, { useEffect, useRef, useState } from 'react';
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SearchIcon from '@mui/icons-material/Search';

import styles from './AddMemberButton.module.css'
import { useParams } from 'react-router-dom';
import { validateMail } from '../../../authPages/validator';
import { searchUserByNameAction } from './searchUserByNameAction';
import { searchUserByMailAction } from './searchUserByMailAction';
import { getGroupMemberAction } from '../getGroupMemberAction';
import { getGroupDetailAction } from '../getGroupDetailAction';
import SearchListBox from './SearchListBox';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    width: 400,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    flexDirection: 'column'
};

const AddMemberButton = (props) => {
    const { id } = useParams()
    const { setGroupMembers, setGroupDetail } = props
    // 검색 모달을 관리할 state
    const [open, setOpen] = useState(false);
    const [btnDisable, setBtnDisable] = useState(true)
    // 검색 텍스트
    const [inviteUser, SetInviteUser] = useState('')
    // mail or nickname 타입으로 검색했다는걸 표시해줄 state
    const [searchType, setSearchType] = useState('')
    // 검색해온 유저리스트
    const [searchData, setSearchData] = useState([])


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        getGroupMemberAction(id, setGroupMembers)
        getGroupDetailAction(id, setGroupDetail)
    }, [open, id, setGroupMembers, setGroupDetail])

    const handleValueChange = (event) => {
        const inputValue = event.target.value;
        SetInviteUser(inputValue)
        setBtnDisable(inputValue.length === 0);
    }

    const handleAddMember = async (inviteUser) => {
        // 기본적으로 검색을 실행한다면 이전의 데이터는 지우고 실행
        setSearchData([])
        setSearchType('')
        console.log('재 검색시 data초기화 확인', searchData)
        if (validateMail(inviteUser)) {
            await searchUserByMailAction(inviteUser, setSearchData)
            setSearchType('mail')
            console.log('데이터 확인', searchData)
        } else {
            setSearchType('name')
            await searchUserByNameAction(inviteUser, setSearchData)
            console.log('데이터 확인', searchData)
        }
    }

    return (
        <>
            <Button
                onClick={handleOpen}
                style={{
                    witdh: '5%',
                    height: '5%',
                    borderRadius: "16px",
                    margin: 0,
                    padding: 0,
                    minWitdh: 0,
                    marginTop: '10px',
                    color: 'white',
                    backgroundColor: '#997B66'
                }}
            >
                <AddIcon />
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.header}>
                        <p style={{ fontWeight: 'bolder', fontFamily: 'Pretendard-Bold', fontSize: '24px' }}>멤버 초대</p>
                    </div>
                    <div className={styles.inviteBox}>
                        <div className={styles.searchBox}>
                            <input className={styles.memberInput} minLength={1} placeholder={`텍스트를 입력해 주세요`}
                                type="text" value={inviteUser} onChange={handleValueChange} />
                            <button className={`${styles.addMemberBtn} ${btnDisable ? styles.btnDisable : ''} ${styles.groupRoomBtn}`}
                                onClick={() => handleAddMember(inviteUser)} disabled={btnDisable}>
                                <SearchIcon />
                            </button>
                        </div>
                    </div>
                    <div className={styles.resultBox}>
                        {
                            searchData.map((e, i) => {
                                return (
                                    <SearchListBox key={i} emailOrNickname={e.emailOrNickname} profileImage={e.profileImage} userIdx={e.userIdx} setOpen={setOpen} />
                                )
                            })
                        }
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default AddMemberButton;