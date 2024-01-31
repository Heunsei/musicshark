import React from 'react';
import Button from '@mui/material/Button'

const MemberIcon = (props) => {
    const { member } = props
    if (member.user_nickname.length >= 4){
        member.user_nickname = member.user_nickname.slice(0, 4) + "...";
    }
    return (
        <Button style={{
            witdh: '5%',
            height: '8%',
            borderRadius: "16px",
            margin: 0,
            padding: 0,
            minWitdh: 0,
            marginTop: '10px',
            color: 'white',
            backgroundColor: '#997B66',
            overflow : 'hidden',
        }}
        >
            {member.user_nickname}
        </Button>
    );
};

export default MemberIcon;