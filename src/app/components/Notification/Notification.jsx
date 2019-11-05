import React from 'react';
import { gql } from 'apollo-boost';
import { useSubscription } from '@apollo/react-hooks';


const CHANNELS_SUBSCRIPTION = gql`
    subscription onChannelAdded($repoFullName: String!) {
        channelAdded(repoFullName: $repoFullName) {
            id
            name
        }
    }
`;

const Notification = () => {
    const { data, loading } = useSubscription(CHANNELS_SUBSCRIPTION);
    console.log(data);
    
    return (
        <div style={{color: 'white'}}>
            {/* {!loading && channelAdded.name } was added */}
        </div>
    )
}

export default Notification;
