import React, { Component } from 'react';
import { gql } from 'apollo-boost';
import { useSubscription } from '@apollo/react-hooks';

const CHANNELS_SUBSCRIPTION = gql`
    subscription channelAdded {
        channelAdded {
            id
            name
        }
    }
`;

class Notification extends Component {

    state = {
        newChannel: null,
    }

    listen = () => {
        const self = this;
        const starCountRef = window.firebase.database().ref('/');
        starCountRef.on('value', function(snapshot) {
            const val = snapshot.val();
            if (val && val.trim().length > 0) {
                self.setState({
                    newChannel: val,
                });
                setTimeout(() => {
                    starCountRef.set('');
                    self.setState({
                        newChannel: null,
                    }); 
                }, 2000);
            }
        });
    }

    componentDidMount = () => {
        this.listen();
    }

    render = () => {
        if (this.state.newChannel === null) {
            console.log('DATA is NULL...');
            return null;
        }
        return (
            <div style={{color: 'white', marginTop: '30px'}}>
                {this.state.newChannel } was added...
            </div>
        )
    }
    
}

export default Notification;
