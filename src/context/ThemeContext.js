import React, { createContext, useState, useContext } from 'react';

// Crie o contexto para o botão
const ButtonContext = createContext({
  setButton: () => {},
  button: null
});

export {ButtonContext}

const VoltarContext= createContext({
  setVoltar: () => {},
  voltar: null
});

export {VoltarContext}