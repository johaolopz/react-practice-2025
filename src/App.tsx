import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import gsap from 'gsap';

function App() {
  const initNumber = 1;
  const finalNumber = 3;
  const [ secJump, setSecJump ] = useState<number>(initNumber);
  const jumperElementRef = useRef<HTMLHeadingElement>(null);
  const intervalSecs: number = 1000;
  const timelineGsap = gsap.timeline();

  secJump === finalNumber && (() => {
    timelineGsap.to(jumperElementRef.current, { y: -10 })
      .to(jumperElementRef.current, { y: 0, ease: 'bounce.out' });
  })()

  useEffect(() => {
    if (secJump >= finalNumber) return; // Detener si alcanzó el límite

    const intervalId = setInterval(() => {
      setSecJump(prev => {
        if (prev < finalNumber) {
          return prev + 1;
        } else {
          clearInterval(intervalId); // Por si acaso
          return prev;
        }
      });
    }, intervalSecs);

    return () => clearInterval(intervalId); // Limpieza del intervalo
  }, [secJump, finalNumber]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <h1>Prueba GSAP</h1>
        <h2 ref={ jumperElementRef }>{ secJump }</h2>
        <button
          onClick={() => {
            setSecJump(initNumber);
          }}
        >
          Refresh
        </button>
      </main>
    </div>
  );
}

export default App;
