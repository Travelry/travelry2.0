import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import AuthProvider from './context/AuthContext';
import MapProvider from "./context/MapContext"

ReactDOM.render(<MapProvider><AuthProvider><App /></AuthProvider></MapProvider>, document.getElementById('root'));

