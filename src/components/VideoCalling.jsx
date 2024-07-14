import React, { useEffect, useState } from 'react';
import { CallingState, StreamCall, StreamVideo, StreamVideoClient, useCall, useCallStateHooks, StreamTheme, SpeakerLayout, CallControls, CallParticipantsList } from '@stream-io/video-react-sdk';

const apiKey = 'mmhfdzb5evj2';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiQm9zc2siLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0Jvc3NrIiwiaWF0IjoxNzIwODgwNTA3LCJleHAiOjE3MjE0ODUzMTJ9.WA874oS05ejXvcDu6v32WsGFHxwM7L2P3sK_THaKCds';
const userId = 'Bossk';
const callId = 'mL8T5HhLminQ';

import '@stream-io/video-react-sdk/dist/css/styles.css';


const user = {
    id: userId,
    name: 'Oliver',
    image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
};

const VideoCalling = () => {
    const [client, setClient] = useState(null);
    const [call, setCall] = useState(null);

    useEffect(() => {
        const initClientAndCall = async () => {
            const clientInstance = new StreamVideoClient({ apiKey, user, token });
            setClient(clientInstance);
            const callInstance = clientInstance.call('default', callId);
            setCall(callInstance);
            await callInstance.join({ create: true });
        };

        initClientAndCall();
    }, []);

    if (!client || !call) {
        return <div>Loading...</div>;
    }

    return (
        <StreamVideo client={client}>
            <StreamTheme>
                <StreamCall call={call}>
                    <SpeakerLayout />
                    <CallControls />

                </StreamCall>
            </StreamTheme>
        </StreamVideo>
    );
};


// export const MyUILayout = () => {
//     const {
//         useCallCallingState,
//         useLocalParticipant,
//         useRemoteParticipants,
//     } = useCallStateHooks();

//     const callingState = useCallCallingState();
//     const localParticipant = useLocalParticipant();
//     const remoteParticipants = useRemoteParticipants();

//     if (callingState !== CallingState.JOINED) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <StreamTheme>
//             <MyParticipantList participants={remoteParticipants} />
//             <MyFloatingLocalParticipant participant={localParticipant} />
//         </StreamTheme>
//     );
// };



export default VideoCalling;
