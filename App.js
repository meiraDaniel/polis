import React from 'react';
import './App.css';
import ConfiguraVideoChat from './configuraVideoChat';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Lobby VideoChat</h1>
      </header>

      <main className="App-main">
          <ConfiguraVideoChat/>
      </main>

      <footer className="App-footer">
        Salas criadas por mim.
      </footer>
    </div>
  );
}

export default App;
