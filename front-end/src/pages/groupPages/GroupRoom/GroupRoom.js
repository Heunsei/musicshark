import { OpenVidu } from 'openvidu-browser';
import React, { useState } from 'react';

const GroupRoom = () => {
    const [session, setSession] = useState('')
    const [mainStreamManager, setMainStreamManager] = useState('')
    const [publisher, setPublisher] = useState('')
    const [subscriber, setSubscribers] = useState([])

    const joinSession = () => {
        const myOV = new OpenVidu();
        setSession(myOV.initSession())

        session.on('streamCreated' , (event) => {
            setSubscribers(session.subscribe(event.stream, undefined));

            setSubscribers([...])
        })
    }

    return (
        <div>
            
        </div>
    );
};

export default GroupRoom;