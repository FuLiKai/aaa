import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';

const App: React.FC = () => {
    return (
        <div className="App">
            <header className="App-header">
                <img
                    alt="logo"
                    className="App-logo"
                    src={logo}
                />
                <p>
          Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    rel="noopener noreferrer"
                    target="_blank"
                >
          Learn React
                </a>
                <Button type="primary">hello</Button>
            </header>
        </div>
    );
};

export default App;
