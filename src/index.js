import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '../src/fonts/OpenSans-Regular.ttf';
import '../src/fonts/OpenSans-Bold.ttf';
import '../src/fonts/OpenSans-SemiBold.ttf';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

