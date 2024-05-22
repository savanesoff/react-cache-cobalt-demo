import { render } from 'preact';
import { App } from './App';
import './tailwindcss/styles.scss';
const container = document.getElementById('root');
if (!container) {
    throw new Error('No container found');
}
render(<App />, container);
