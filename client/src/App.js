import React from 'react';
import HomeScreen from './screens/HomeScreen';
import './App.css'; // On importe le fichier CSS

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="container">
          <h2>Abstergo Store</h2>
        </div>
      </header>
      <main className="container">
        <HomeScreen />
      </main>
      <footer className="app-footer">
        <div className="container">
          <p>Copyright &copy; Abstergo Store</p>
        </div>
      </footer>
    </div>
  );
}

export default App;