import React from 'react';
import './App.css';
import Nav from "./common/index";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <BrowserRouter>
                <Nav />
            </BrowserRouter>
        </Provider>
    </div>
  );
}

export default App;
