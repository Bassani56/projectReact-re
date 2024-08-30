import React, { createContext, useState, useContext } from 'react';

export const CurrentContext= createContext({
  setCurrent: () => {},
  current: null,
  setHistory: () => {},
  history: null,
  setIndexSwiper: () => {},
  indexSwiper: null
});

