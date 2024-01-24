import React from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateField  } from '@mui/x-date-pickers/DateField';
import dayjs from 'dayjs';

const BirthDateInput = (props) => {
    const { birth, setBirth } = props

    const SetDateString = (birth) => {
        let year = birth.$d.getFullYear()
        let month = ('0' + (birth.$d.getMonth() + 1)).slice(-2)
        let date = birth.$d.getDate()
        let dateString = year + "-" + month + "-" + date
        setBirth(dateString)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={['DateField']}>
                <DateField
                    label="생년월일을 입력하세요"
                    value={birth}
                    onChange={(birth) => SetDateString(birth)}
                    format='YYYY-MM-DD'
                />
            </DemoContainer>
        </LocalizationProvider>
    );
}


export default BirthDateInput;