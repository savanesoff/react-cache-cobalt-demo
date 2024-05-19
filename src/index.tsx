import { render } from 'preact';
import React from 'preact';
import './tailwind.scss';

const App = () => {
  return (
    <div className=" btn-blue ">
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
