import React, { useEffect, useState } from 'react';
import { styled } from '@mui/system'
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import CheckIcon from '@mui/icons-material/Check';
import ClearIcon from '@mui/icons-material/Clear';

import styles from './../../GroupRoom/GroupRoom.module.css'
import InputWithLabel from '../../../../components/InputWithLabel';
import { editGroupAction } from './editGroupAction';
import { getGroupMemberAction } from '../getGroupMemberAction';
import { getGroupDetailAction } from '../getGroupDetailAction';
import { useParams } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    height: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Container = styled('div')({
    fontFamily: 'Pretendard-Medium',
    backgroundColor: 'white',
    width: '90%',
    height: '70%',
    position: 'relative',
    display: 'flex',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    borderRadius: '15px',
    overflow: 'auto',
    marginTop: '15px',
})
// group detail은 GroupDetailPage에서 props 받아옴
const GroupInfoBox = (props) => {
    const { groupDetail, setGroupDetail } = props
    const { id } = useParams()
    // 모달을 열고 닫을 state
    const [open, setOpen] = useState(false);
    // 모달에서 받아올 그룹에 대한 정보
    const [groupName, setGroupName] = useState(groupDetail.channelName)
    const [groupIntro, setGroupIntro] = useState(groupDetail.channelIntro)
    const [groupMax, setGroupMax] = useState(groupDetail.channelMax)

    const [isValidMaxMember, setisValidMaxmember] = useState(true)

    // modal을 열고 닫을때마다 이전데이터로 변경
    const handleOpen = () => {
        setGroupName(groupDetail.channelName)
        setGroupIntro(groupDetail.channelIntro)
        setGroupMax(groupDetail.channelMax)
        setOpen(true);
    }

    const handleClose = () => {
        setGroupName(groupDetail.channelName)
        setGroupIntro(groupDetail.channelIntro)
        setGroupMax(groupDetail.channelMax)
        setOpen(false)
    };

    // useEffect(() => {
    //     if (groupMax < groupDetail.channelCur) {
    //         setisValidMaxmember(false)
    //     } else {
    //         setisValidMaxmember(true)
    //     }
    // }, [groupMax, groupDetail])

    // 수정버튼을 눌렀을 때 정보를 수정하고 reload -> 이걸 reload가 아닌 setData로 데이터 변경으로 변경
    const handleEditGroup = async () => {
        const editInfo = {
            channelId: groupDetail.channelIdx,
            channelName: groupName,
            channelIntro: groupIntro,
            channelMax: groupMax
        }
        await editGroupAction(editInfo)
        await getGroupDetailAction(id, setGroupDetail)
        setOpen(false)
    }

    // 그룹 수정 시, max값이 6을 넘긴다면 입력을 제한할 코드
    useEffect(() => {
        if (groupMax > 10) {
            setGroupMax(groupMax % 10)
        } else if (groupMax > 6) {
            setGroupMax(6)
        }
    }, [groupMax, setGroupMax, groupDetail.channelCur])

    return (
        <>
            <Container>
                <p style={{
                    fontFamily: 'Pretendard-Bold',
                    fontSize: '42px',
                    margin: '0',
                    padding: '0',
                }}>
                    {groupDetail.channelName}</p>
                <hr style={{ color: 'black' }}></hr>
                <div style={{
                    width: '90%',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', align: 'center',
                    overflow: 'scroll', msOverflowStyle: 'none', scrollbarWidth: 'none',
                }}>

                    <p style={{
                        fontSize: '32px', margin: '0 0 20px 0', align: 'center'
                    }}>{groupDetail.channelIntro}</p>
                    <hr></hr>

                    <table style={{
                        fontSize: '20px', borderSpacing: '5px 5px',
                        width: '80%'
                    }}>
                        <tbody>
                            <tr>
                                <td >현재인원 :</td>
                                <td style={{ textAlign: 'right' }}>{groupDetail.channelCur}명</td>
                            </tr>
                            <tr>
                                <td>모집인원 :</td>
                                <td style={{ textAlign: 'right' }}>{groupDetail.channelMax}명</td>
                            </tr>
                            <tr>
                                <td>생성일자 :</td>
                                <td style={{ textAlign: 'right' }}>{groupDetail.channelDate}</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
                <button className={`${styles.groupInfoModifyBtn} ${styles.groupRoomBtn}`} onClick={handleOpen}>
                    <EditIcon />
                </button>
            </Container>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
                        <p style={{ fontFamily: 'Pretendard-Bold', fontSize: '24px', fontWeight: 'bold', margin: '0px' }}>그룹 정보 변경</p>
                    </div>
                    <InputWithLabel value={groupName} setValue={setGroupName}
                        label='그룹명 변경' placeholder="변경할 그룹명을 입력하세요" type='text' />
                    <InputWithLabel value={groupIntro} setValue={setGroupIntro}
                        label='그룹소개 변경' placeholder="변경할 그룹소개를 입력하세요" type='text' />
                    <InputWithLabel value={groupMax} setValue={setGroupMax}
                        label='그룹최대 인원 변경' placeholder="최대 인원을 입력하세요" type='number' />
                    <div>
                        {groupMax >= 6 ? <p>최대 인원수는 6명입니다</p> : null}
                        {groupMax <= groupDetail.channelCur ? <p>최소 인원수는 {groupDetail.channelCur}명입니다</p> : null}
                    </div>
                    <div className={styles.groupInfoBtnBox}>
                        <button className={`${styles.groupRoomBtn} ${groupMax <= groupDetail.channelCur ? styles.btnDisable : ''}`}
                            disabled={groupMax <= groupDetail.channelCur} onClick={handleEditGroup}
                        > <CheckIcon /> </button>
                        <button className={`${styles.groupRoomBtn}`} onClick={handleClose}> <ClearIcon /> </button>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

export default GroupInfoBox;