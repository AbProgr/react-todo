// ------------dependencies-------------
import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// -----------module dependecies--------
import './index.css';
import App from './App';

export const client = new ApolloClient({
    uri: "http://localhost:4000/graphql"
});

// -----------root rendering------------
ReactDOM.render(
    <ApolloProvider client={client}>
        <App /> 
    </ApolloProvider>
    , document.getElementById('root')
);
  