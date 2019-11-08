import React from 'react'
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

// Mutation for creating a new channel
const CREATE_CHANNEL_MUTATION = gql`
  mutation addChannel($name: String!) {
    addChannel(name: $name) {
      id
      name
    }
  }
`;


const CreateChannel = () => {
    const [addChannel] = useMutation(CREATE_CHANNEL_MUTATION);

    const handleKeyUp = evt => {
        if (evt.keyCode === 13) {
            evt.persist();
            addChannel({
                variables: { name: evt.target.value }
            })
            .then(res => {
                const database = window.firebase.database();
                database.ref('/').set(evt.target.value);
                evt.target.value = '';
            });
        }
    };

    const CreateChannelInput = styled.input`
        width: 40%;
        height: 40px;
        border: 1px solid tomato;
        border-radius: 10px;
        font-size: 24px;
        margin-top: 50px;
        background: transparent;
        color: lightgray;
    `;
    return (
        <CreateChannelInput placeholder="Enter Channel and press Enter" onKeyUp={handleKeyUp}/>
    )
}

export default CreateChannel;
