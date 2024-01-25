import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SelectGenderBox = (props) => {

    const { gender, setGender } = props

    const handleValueChange = (event) => {
        setGender(event.target.value)
    }

    return (
        <Box sx={{ minWidth: 120, my : 2}}>
            <FormControl fullWidth>
                <InputLabel>성별</InputLabel>
                <Select
                    value={gender}
                    label="Gender"
                    onChange={handleValueChange}
                >
                    <MenuItem value='남자'>남자</MenuItem>
                    <MenuItem value='여자'>여자</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
};

export default SelectGenderBox;