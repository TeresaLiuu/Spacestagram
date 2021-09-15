import React from 'react';
import Header from '../src/components/Header';
import DisplayImage from '../src/components/DisplayImage';
import Container from '@material-ui/core/Container';

function App() {
    return (
        <div>
          <Container maxWidth="md">
            <Header />
            <DisplayImage />
          </Container>
        </div>
    );
}

export default App;
