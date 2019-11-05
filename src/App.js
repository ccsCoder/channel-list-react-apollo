import './App.css';
import React from 'react';
import ChannelsList from './app/components/ChannelList/ChannelList';
import CreateChannel from './app/components/CreateChannel/CreateChannel';

function App() {
  return (
    <div className="App">
        <h2>Best Channels in India</h2>
        <ChannelsList />
        <CreateChannel />
    </div>
  );
}

export default App;
