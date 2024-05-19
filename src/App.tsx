import { JSComponents } from './JSComponents';

export const App = () => {
  return (
    <div className=" btn-blue ">
      <div
        style={{
          color: 'white',
        }}
      >
        Hello, Preact!
      </div>
      <JSComponents text={'Custom prop'} />
    </div>
  );
};
