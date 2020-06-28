import React from 'react';

export const paceCalculator = (time, distance) => {
  return time/distance;
};

export const timeCalculator = (pace, distance) => {
  return pace * distance;
}

export const convertSecToTime = secs => {
  let seconds = secs % 60;
  let minutes = Math.floor(secs / 60) % 60;
  let hours = Math.floor(secs / 60 / 60);

  seconds = seconds.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  hours = hours.toString().padStart(2, "0");

  return `${hours}${minutes}${seconds}`;
};

export const convertTimeToSec = (value) => {
  const time = value.padStart(6, "0");
  let hours = parseInt(time.slice(0,2));
  let minutes = parseInt(time.slice(2,4));
  let seconds = parseInt(time.slice(4,6));

  return hours * 60 * 60 + minutes * 60 + seconds;
};

export const fixInputTime = value => {
  const time = value.padStart(6, "0");
  let hours = parseInt(time.slice(0,2));
  let minutes = parseInt(time.slice(2,4));
  let seconds = parseInt(time.slice(4,6));

  if (seconds > 59) {
    minutes+=1;
    seconds%=60;
  }
  if (minutes > 59) {
    hours+=1;
    minutes%=60;
  }

  seconds = seconds.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  hours = hours.toString().padStart(2, "0");

  return `${hours}${minutes}${seconds}`;
}

export const displayTime = (value, focused) => {
  if (value.length > 6) return 'MAX';
  const time = value.padStart(6, "0");
  let hours = time.slice(0,2);
  let minutes = time.slice(2,4);
  let seconds = time.slice(4,6);
  return (
    <div className="display">
      {
        focused ?
        <span>{hours > 0 && <span>{hours}<span className="unit">h</span></span>} {(hours > 0 || minutes > 0) && <span>{minutes}<span className="unit">m</span></span>} {seconds}<span className="chev" /><span className="unit">s</span></span> :
        <span>{hours > 0 && <span>{parseInt(hours)}<span className="unit">h</span></span>} {(hours > 0 || minutes > 0) && <span>{parseInt(minutes)}<span className="unit">m</span></span>} {parseInt(seconds)}<span className="chev" /><span className="unit">s</span></span>
      }
    </div>
  );
}
