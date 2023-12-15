/*
 * File: getTtime.js
 * Project: weatherapp
 * File Created: Thursday, 14th December 2023 12:20:23 pm
 * Author: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Last Modified: Thursday, 14th December 2023 12:30:44 pm
 * Modified By: Jackson Thounaojam (jackson.thounaojam@mutualmobile.com)
 * -----
 * Copyright 2020 - 2023 Mutual Mobile, Mutual Mobile
 */
export function msToTime(duration) {
  var milliseconds = Math.floor((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = `${hours<=0 ?'':(hours < 10) ? "0" + hours+':' : hours+':'}`;
  minutes = `${(minutes < 10) ? "0" + minutes+':' : minutes+':'}`;
  seconds = seconds<=0 ?'':(seconds < 10) ? "0" + seconds : seconds;
  return hours  + minutes  +  seconds 
}
