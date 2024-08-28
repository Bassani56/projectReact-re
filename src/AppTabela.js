import React, { useState } from 'react';
import PivotTableComponent from './pivotTable/PivotTable';
import ErrorBoundary from './ErrorBoundary';
import Carousel from './carousel/Carousel';
import { ButtonContext, VoltarContext } from './context/ThemeContext';
import HeaderRight from './header/header';
import Conteudo from './pesquisaCards/Conteudo';

function AppTabela() {
  const [valueCarousel, setGetCarousel] = useState([]);
  const [atualizou, setGetAtualizou] = useState(false);
  const [button, setButton] = useState(null);
  const [voltar, setVoltar] = useState(null);
  const [pesquisa, setPesquisa] = useState([]);
  const [ultimoAtualizado, setUltimoAtualizado] = useState(null); // Novo estado para rastrear o último atualizado

  // Funções para definir os valores e marcar o último atualizado
  const handleSetCarousel = (value) => {
    setGetCarousel(value);
    setUltimoAtualizado('carousel'); // Marca que o último atualizado foi o valueCarousel
  };

  const handleSetPesquisa = (value) => {
    setPesquisa(value);
    setUltimoAtualizado('pesquisa'); // Marca que o último atualizado foi pesquisa
  };
  
  return (
    <ButtonContext.Provider value={{ button, setButton }}>
      <VoltarContext.Provider value={{ voltar, setVoltar }}>
        <div className="total">
          <header className="header">
            <HeaderRight button={button} voltar={voltar} setPesquisa={handleSetPesquisa} />
          </header>

          <div className="app">
            <div className="container">
              <div className="tabela">
                <ErrorBoundary>
                {
  ultimoAtualizado === 'pesquisa' ? (
    <PivotTableComponent
      pesquisa={pesquisa}
      setCarousel={handleSetCarousel}
      setGetAtualizou={setGetAtualizou}
      update={atualizou}
    />
  ) : (
    <PivotTableComponent
      pesquisa={null}
      setCarousel={handleSetCarousel}
      setGetAtualizou={setGetAtualizou}
      update={atualizou}
    />
  )
}

                </ErrorBoundary>
              </div>

              <div className="carousel">
                {/* Renderiza o Carousel com base no último estado atualizado */}
                {ultimoAtualizado === 'pesquisa' && pesquisa.length > 0 ? (
                  <Carousel targetValue={pesquisa} update={setGetAtualizou} />
                ) : ultimoAtualizado === 'carousel' && valueCarousel.length > 0 ? (
                  <Carousel targetValue={valueCarousel} update={setGetAtualizou} />
                ) : null}
              </div>
            </div>
          </div>

          <div>
            <Conteudo update={setGetAtualizou} />
          </div>
        </div>
      </VoltarContext.Provider>
    </ButtonContext.Provider>
  );
}

export default AppTabela;
