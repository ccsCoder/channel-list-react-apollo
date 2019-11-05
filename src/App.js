import './App.css';
import React from 'react';
import ChannelsList from './app/components/ChannelList/ChannelList';
import CreateChannel from './app/components/CreateChannel/CreateChannel';
import Notification from './app/components/Notification/Notification';
import styled from 'styled-components';

function App() {
    const H1 = styled.h1`
        font-size: 30px;
        font-weight: 400;
    `;
    return (
        <div className="App">
            <H1>Best News Channels in India.</H1>
            <ChannelsList />
            <CreateChannel />
            <Notification />
        </div>
    );
}

export default App;
