import { JSComponents } from './JSComponents';

export const App = () => {
  return (
    <div className=" btn-blue bg-orange-300 h-1/2">
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
