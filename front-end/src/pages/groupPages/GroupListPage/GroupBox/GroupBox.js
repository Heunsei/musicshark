import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

import GroupAddBox from './GroupAddBox';
import styles from './GroupBox.module.css'
import GroupPagenation from './GroupPagenation'
import GroupCard from './GroupCard';
import GroupCreateModal from './GroupCreateModal';

const GroupBox = (props) => {
    const navigate = useNavigate()
    const { groupList, setGroupList } = props
    const itemsPerPage = 4
    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    let lastItem = currentPage * itemsPerPage
    let fisrtItem = lastItem - itemsPerPage
    const [showGroup, setShowGroup] = useState([])

    useEffect(() => {
        console.log(groupList)
        if (groupList !== null) {
            setShowGroup(groupList.slice(fisrtItem, lastItem));
        }
    }, [currentPage, setShowGroup, groupList, fisrtItem, lastItem, isModalOpen])


    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    const handleOpenGroupCreatePage = () => {
        setIsModalOpen(true)
    }

    return (
        <>
            <div className={styles.groupBox}>
                <div className={styles.innerBox}>
                    <GroupAddBox openModal={handleOpenGroupCreatePage} />
                    {
                        showGroup.map((element, i) => {
                            return (
                                <GroupCard key={i} groupData={element} />
                            )
                        })
                    }
                    <div className={styles.innerFooter}>
                        <Stack spacing={2}>
                            {
                                groupList ? (<Pagination
                                    count={Math.ceil(groupList.length / itemsPerPage)}
                                    page={currentPage}
                                    onChange={handleChange} />) : null
                            }

                        </Stack>
                    </div>
                </div>
                <GroupCreateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setGroupList={setGroupList} />
            </div>
        </>
    );
};

export default GroupBox;