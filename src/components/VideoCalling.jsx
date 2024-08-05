import React, { useEffect, useState } from 'react';
import '@stream-io/video-react-sdk/dist/css/styles.css';
import {
    StreamCall,
    StreamVideo,
    StreamVideoClient,
    StreamTheme,
    CallControls,
    SpeakerLayout,
    useCall,
    useCallStateHooks,
    CallingState,
} from '@stream-io/video-react-sdk';

const VideoCalling = () => {
    const [token, setToken] = useState(null);
    const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);

    const fetchToken = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/stream/generate-token`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();
            setToken(data.data.token);
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const initializeClient = async (token) => {
        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        const user_obj = JSON.parse(localStorage.getItem('user'));
        const user = {
            id: user_obj.user_id,
            name: user_obj.name,
            image: user_obj.image,
        };

        const clientInstance = new StreamVideoClient({ apiKey, user, token });
        setClient(clientInstance);
        await joinCall(clientInstance);
    };

    const joinCall = async (clientInstance) => {
        const callInstance = clientInstance.call('default', 'test-call-0010101');
        await callInstance.join({ create: true });
        setCall(callInstance);
    };

    useEffect(() => {
        if (token) {
            initializeClient(token);
        }
    }, [token]);

    useEffect(() => {
        fetchToken();
    }, []);

    return (
        <>
            {call && client ? (
                <StreamVideo client={client}>
                    <StreamTheme className='Dark'>
                        <StreamCall call={call}>
                            <SpeakerLayout />
                            <CallControls />
                            <MyUILayout />
                        </StreamCall>
                    </StreamTheme>
                </StreamVideo>
            ) : (
                <div>Loading...</div>
            )}
        </>
    );
};

export default VideoCalling;

export const MyUILayout = () => {
    const call = useCall();

    const { useCallCallingState, useParticipantCount } = useCallStateHooks();
    const callingState = useCallCallingState();
    const participantCount = useParticipantCount();

    if (callingState !== CallingState.JOINED) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            Call "{call.id}" has {participantCount} participants
        </div>
    );
};
