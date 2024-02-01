import React, { useState } from 'react';
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
    const { groupList } = props
    const itemsPerPage = 4
    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const lastItem = currentPage * itemsPerPage
    const fisrtItem = lastItem - itemsPerPage
    const showGroup = groupList.slice(fisrtItem, lastItem);
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
                            <Pagination
                                count={Math.ceil(groupList.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handleChange}
                            />
                        </Stack>
                    </div>
                </div>
                <GroupCreateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            </div>
        </>
    );
};

export default GroupBox;