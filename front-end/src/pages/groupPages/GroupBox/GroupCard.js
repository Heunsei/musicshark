import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

const GroupCard =(props) => {
    const channelInfo = props.arr
    return (
        <Card sx={{ width: 300, margin : 2, height : 300}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {channelInfo.channel_name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {`${channelInfo.channel_cur}/${channelInfo.channel_max}`}
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}

export default GroupCard;