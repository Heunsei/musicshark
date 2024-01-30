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

const arr = [
    {
        channel_id : 1,
        channel_name: '채널1',
        channel_intro: '채널 1 intro',
        channel_max: 6,
        channel_cur: 3,
        channel_date: '2024-01-01',
    },
    {
        channel_id : 2,
        channel_name: '채널2',
        channel_intro: '채널 2 intro',
        channel_max: 6,
        channel_cur: 3,
        channel_date: '2024-01-01',
    },
    {
        channel_name: '채널3',
        channel_intro: '채널 3 intro',
        channel_max: 6,
        channel_cur: 3,
        channel_date: '2024-01-01',
    },
    {
        channel_name: '채널4',
        channel_intro: '채널 4 intro',
        channel_max: 6,
        channel_cur: 3,
        channel_date: '2024-01-01',
    },
    {
        channel_name: '채널5',
        channel_intro: '채널 5 intro',
        channel_max: 6,
        channel_cur: 3,
        channel_date: '2024-01-01',
    },
    {
        channel_name: '채널6',
        channel_intro: '채널 6 intro',
        channel_max: 6,
        channel_cur: 3,
        channel_date: '2024-01-01',
    },
    {
        channel_name: '채널7',
        channel_intro: '채널 7 intro',
        channel_max: 6,
        channel_cur: 3,
        channel_date: '2024-01-01',
    },
    {
        channel_name: '채널8',
        channel_intro: '채널 8 intro',
        channel_max: 6,
        channel_cur: 3,
        channel_date: '2024-01-01',
    },
]


const GroupBox = (props) => {
    const navigate = useNavigate()
    const itemsPerPage = 4
    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const lastItem = currentPage * itemsPerPage
    const fisrtItem = lastItem - itemsPerPage
    const showGroup = arr.slice(fisrtItem, lastItem);
    
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
                    <GroupAddBox openModal={handleOpenGroupCreatePage}/>
                    {
                        showGroup.map((element, i) => {
                            return (
                                <GroupCard key={i} arr={element} />
                            )
                        })
                    }
                    <div className={styles.innerFooter}>
                        <Stack spacing={2}>
                            <Pagination
                                count={Math.ceil(arr.length / itemsPerPage)}
                                page={currentPage}
                                onChange={handleChange}
                            />
                        </Stack>
                    </div>
                </div>
                <GroupCreateModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
            </div>
        </>
    );
};

export default GroupBox;