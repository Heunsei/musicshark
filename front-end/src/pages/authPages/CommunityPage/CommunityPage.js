import React from 'react';
import Navbar from '../../../components/Navbar';
import { makeStyles, withStyles} from '@mui/styles';
import { Table, TableBody, TableCell,TableRow,TableContainer,TableHead,Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { styled } from '@mui/system';

const StyledTableCell=withStyles((theme)=>({
    head:{
        backgroundColor:theme.palette.common.black,
        color:theme.palette.community.white,
    },
    body:{
        fontSize:14,
    },
}))(TableCell);

const StyledTableRow=withStyles((theme)=>({
    root:{
        '&:nth-of-type(odd)':{
            backgroundColor:theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(community_id, community_genre, community_title, community_name, community_views,community_date){
    return {community_id, community_genre, community_title, community_name, community_views,community_date};
}

const rows=[
    createData(1,'자유','가입','kim@ssafy.com',6,'2024-02-01'),
    createData(2,'자유','인사','kim@ssafy.com',6,'2024-02-01'),
];

const useStyles=makeStyles({
    table:{
        minWidth:700,
    },
});

export default function CommunityPage(){
    const classes=useStyles();

    return (
        <>
        <Navbar/>
        
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="cucstomized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>아이디</StyledTableCell>
                        <StyledTableCell align='right'>분류</StyledTableCell>
                        <StyledTableCell align='right'>제목</StyledTableCell>
                        <StyledTableCell align='right'>작성자</StyledTableCell>
                        <StyledTableCell align='right'>조회</StyledTableCell>
                        <StyledTableCell align='right'>날짜</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row)=>(
                        <StyledTableRow key={row.community_id}>
                            <StyledTableCell component="th" scope="row">
                                {row.name}
                            </StyledTableCell>
                            <StyledTableCell align='right'>{row.community_genre}</StyledTableCell>
                            <StyledTableCell align='right'>{row.communuty_name}</StyledTableCell>
                            <StyledTableCell align='right'>{row.community_views}</StyledTableCell>
                            <StyledTableCell align='right'>{row.community_date}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            </TableContainer>
            </>
    );
}
