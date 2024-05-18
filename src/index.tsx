import { render } from 'preact';
import React from 'preact';
import './index.css';

const App = () => {
  return (
    <div
      className="bg-blue-800"
      //   style={{
      //     position: 'absolute',
      //     width: '100vw',
      //     height: '100vh',
      //     // backgroundColor: '#461f1f',
      //   }}
    >
      <div
        style={{
          color: 'white',
        }}
      >
        Hello, Preact!
      </div>
    </div>
  );
};

render(<App />, document.getElementById('root'));
