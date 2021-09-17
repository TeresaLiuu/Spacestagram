import React from 'react';
import Loader from 'react-loader-spinner';

const style = { position: 'fixed', top: '65%', left: '50%', transform: 'translate(-50%, -50%)' };

export const LoaderLarge = () => (
  <div className='loader' style={style}>
    <Loader type='ThreeDots' color='#F88DCB' height={100} width={100} />
  </div>
);
