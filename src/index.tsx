import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container!); // `container!` is used to assert that the container is non-null

root.render(<App />);
