import React from 'react';
import Header from '../src/components/Header';
import DisplayImage from '../src/components/DisplayImage';
import Container from '@material-ui/core/Container';
import ReactNotification from 'react-notifications-component'


function App() {
    return (
        <div>
          <ReactNotification />
          <Container maxWidth='md'>
            <Header />
            <DisplayImage />
          </Container>
        </div>
    );
}

export default App;
