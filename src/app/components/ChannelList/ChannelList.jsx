import React from 'react';
import { gql } from 'apollo-boost';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';

// This is a query to fetch all channels
// GQL is a template tag which allows you to define GraphQL queries
// in your Apollo Client Apps
const CHANNELS_LIST_QUERY = gql`
    query ChannelListQuery {
        channels {
            id
            name
        }
    }
`;

const ChannelsList = () => {
    // Use the useQuery Hook to run the query and give the data.
    const { loading, error, data } = useQuery(CHANNELS_LIST_QUERY);

    if (loading) {
        return <p>Fetching Data...</p>;
    }
    if (error) {
        return <p>{error.message}</p>;
    }
    const StyledList = styled.ul`
        list-style: none;
        text-align: left;
        color: tomato;
        margin-left: -50px;

        & > li {
            border: 1px solid gray;
            padding: 5px;
            border-radius: 10px;
            width: 200px;
        }
        & > li:even {
            border-bottom: none;
        }
    `
    return <StyledList className="list-group">
        { data.channels.map( channel => <li key={channel.id}>{channel.name}</li> ) }
    </StyledList>;
}

export default ChannelsList;
