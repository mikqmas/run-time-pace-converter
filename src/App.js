import React, {useState} from 'react';
import './App.css';
import {convertSecToTime, convertTimeToSec, displayTime, fixInputTime} from './utils/calculator.js';

function App() {
  const [unit, setUnit] = useState('mi');
  const [pace, setPace] = useState('');
  const [distance, setDistance] = useState('26.2');
  const [time, setTime] = useState('');

  const [timeFocused, setTimeFocused] = useState(false);
  const [paceFocused, setPaceFocused] = useState(false);
  const [dropdown, setDropdown] = useState(false);


  const calcFromDistance = (value) => {
    if(/[a-zA-Z]/.test(value)) return;
    value = value.slice(-5);
    if (time) {
      const secs = convertTimeToSec(time);
      const pace = Math.floor(secs / value);
      setPace(convertSecToTime(value ? pace : 0));
    } else if (pace) {
      const secs = convertTimeToSec(pace);
      setTime(convertSecToTime(Math.floor(secs * value)));
    }
    setDistance(value);
  };

  const calcFromTime = (value) => {
    value = value.slice(-6);
    const secs = convertTimeToSec(value);
    if (distance) {
      const pace = convertSecToTime(Math.floor(secs / parseFloat(distance)));
      setPace(pace);
    };
    setTime(value);
  };

  const calcFromPace = (value) => {
    value = value.slice(-6);
    const secs = convertTimeToSec(value);
    if (distance) {
      setTime(convertSecToTime(secs * parseFloat(distance)));
    };
    setPace(value);
  };

  const dropdownClick = (dist) => {
    setDropdown(false);
    let convertedDist;
    switch (dist) {
      case 'marathon':
        convertedDist = unit === 'mi' ? '26.2' : '42.195';
        break;
      case 'half-marathon':
        convertedDist = unit === 'mi' ? '13.1' : '21.0975';
        break;
      case '5k':
        convertedDist = unit === 'mi' ? '3.1' : '5';
        break;
      case '10k':
        convertedDist = unit === 'mi' ? '6.2' : '10';
        break;
      default:
        return;
    }
    calcFromDistance(convertedDist);
  }

  const convertDistance = (selectedUnit) => {
    if (unit !== selectedUnit) {
      setUnit(selectedUnit);
      setDistance(selectedUnit === 'mi' ? (distance/1.60934).toFixed(1) : (distance*1.60934).toFixed(1));
    }
  }

  return (
    <div className="App">
      <h1>Running Time & Pace Converter</h1>
      <div className="container">
        <div className="tabs">
          <div className={"mi select " + (unit === 'mi' ? 'selected': '')} onClick={() => {convertDistance('mi');}}>Miles</div>
          <div className={"km select " + (unit === 'km' ? 'selected': '')} onClick={() => {convertDistance('km');}}>Kilometers</div>
        </div>
        <div className="inputs">
          <div className="distance" onBlur={() => {setTimeout(() => setDropdown(false), 100)}}>
            <label htmlFor="distance">Distance</label>
            <input
              onKeyDown={e => {if ([37,39].includes(e.keyCode)) {e.preventDefault()}}}
              type="tel"
              id="distance"
              pattern="\d*"
              value={distance}
              onChange={event => {calcFromDistance(event.target.value)}}
            />
            <div className="displayInput" onClick={() => {document.getElementById('distance').focus()}}>
              {distance ? distance : '0'}
              <span className="chev"/>
              <span className="down-arrow" onClick={() => setDropdown(true)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black" width="28px" height="28px"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg></span>
            </div>
            <span style={{display: 'flex', justifyContent: 'flex-end'}}>{unit === 'mi' ? 'mi' : 'km'}</span>
            {
              dropdown && <div className="dropdown">
                <div onClick={() => dropdownClick('marathon')}>marathon</div>
                <div onClick={() => dropdownClick('half-marathon')}>half-marathon</div>
                <div onClick={() => dropdownClick('10k')}>10k</div>
                <div onClick={() => dropdownClick('5k')}>5k</div>
              </div>
            }
          </div>

          <div className="time">
            <label htmlFor="time">Time</label>
            <input
              onKeyDown={e => {if ([37,39, 189].includes(e.keyCode)) {e.preventDefault()}}}
              type="number"
              min="0"
              id="time"
              value={time}
              onBlur={() => {
                setTime(fixInputTime(time));
                setTimeFocused(false);
              }}
              onChange={event => calcFromTime(event.target.value)}
            />
            <div className="displayInput" onClick={() => {document.getElementById('time').focus(); setTimeFocused(true);}}>{displayTime(time, timeFocused)}</div>
          </div>

          <div className="pace">
            <label htmlFor="pace">Pace</label>
            <input
              onKeyDown={e => {if ([37,39,189].includes(e.keyCode)) {e.preventDefault()}}}
              type="number"
              min="0"
              id="pace"
              value={pace}
              onBlur={() => {
                setPace(fixInputTime(pace));
                setPaceFocused(false);
              }}
              onChange={event => calcFromPace(event.target.value)}/>
            <div className="displayInput" onClick={() => {document.getElementById('pace').focus(); setPaceFocused(true);}}>{displayTime(pace, paceFocused)}</div>
            <span style={{display: 'flex', justifyContent: 'flex-end'}}>per {unit === 'mi' ? 'mi' : 'km'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
