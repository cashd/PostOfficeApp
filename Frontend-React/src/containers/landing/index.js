import React from 'react'
import './modalCss.css'

const Landing = () => (
  <div className='background22'>
    <div>
    <div className='textBlock' style={{ display: 'block', textAlign: 'center', paddingTop: '20%', color: 'white'}}>
      <h1 style={h1Style}>Team 9 Post Office</h1>
      <p style={pStyle}>Supporting and delivering your domestic shipping needs since 2019.</p>
    </div>
  </div>

  </div>
);

const h1Style = {
  fontSize: '2.5rem',
  fontWeight: 500
};

const pStyle = {
  display: 'block',
  fontSize: '1.25rem',
  fontWeight: 250,
};

export default Landing
