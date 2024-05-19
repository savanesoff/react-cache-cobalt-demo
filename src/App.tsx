import { JSComponents } from './JSComponents';

export const App = () => {
  return (
    <div className="  bg-orange-300 h-1/2">
      <div className="btn-red">Hello, Preact!</div>
      <JSComponents text={'Custom prop'} />
    </div>
  );
};
