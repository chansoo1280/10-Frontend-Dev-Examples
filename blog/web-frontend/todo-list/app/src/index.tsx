import React from 'react';
import ReactDOM from 'react-dom/client';
import 'Assets/styles/reset.css';
import 'Assets/styles/fonts.css';
import 'Assets/styles/style.css';
import 'Assets/js/date_format';
import App from './App';
import reportWebVitals from './reportWebVitals';
declare global {
  interface Date {
      format(arg0: string): string;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
