import './index.css';

import PivotTableComponent from './pivotTable/PivotTable';
import ErrorBoundary from './ErrorBoundary';

import Carousel from './carousel/Carousel';
import React, {Children, createContext, useState } from 'react';

import { ButtonContext } from './context/ThemeContext';
import { VoltarContext } from './context/ThemeContext';
import Pesquisa from './pesquisaCards/Pesquisa';

import HeaderRight from './header/header';
import Conteudo from './pesquisaCards/Conteudo';

function AppTabela() {

  const[getCarousel, setGetCarousel] = useState([])
  const[atualizou, setGetAtualizou] = useState(false)

  const [button, setButton] = useState(null);
  const[voltar, setVoltar] = useState(null)

  return (
    <ButtonContext.Provider value={{ button, setButton}}>
      <VoltarContext.Provider value={{voltar, setVoltar}}>
        <div className='total'>
          <header className='header'>
            <HeaderRight button={button} voltar={voltar}/>
          </header>

          <div className='app'>
            <div className='container'>
              <div className='tabela'>
                <ErrorBoundary>
                  <PivotTableComponent setCarousel={setGetCarousel} setGetAtualizou={setGetAtualizou} update={atualizou}/>
                </ErrorBoundary>
              </div>

              <div className='carousel'>
                {getCarousel.length > 0 ? (
                  <Carousel targetValue={getCarousel} update={setGetAtualizou}/>
                ) : null}
              </div>

            </div>
          </div>

          <div>
              <Conteudo update={setGetAtualizou}/>
          </div>

        </div>
      </VoltarContext.Provider>

    </ButtonContext.Provider>
  );
}

export default AppTabela;

