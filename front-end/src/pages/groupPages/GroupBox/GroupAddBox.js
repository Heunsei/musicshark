import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const GroupAddBox = () => {
    return (
        <Card sx={{
            width: 300, margin: 2, height: 300, display: 'flex',
            justifyContent: 'center', alignItems: 'center'
        }}>
            <Typography>
                <span class="material-symbols-outlined">
                    add
                </span>
            </Typography>
        </Card>
    )
};

export default GroupAddBox;