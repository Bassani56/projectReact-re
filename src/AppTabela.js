import React, { useState } from 'react';
import PivotTableComponent from './pivotTable/PivotTable';
import ErrorBoundary from './ErrorBoundary';
// import Carousel from './carousel/Carousel';
import { ButtonContext, CurrentContext } from './context/ThemeContext';
import HeaderRight from './header/header';
import Conteudo from './pesquisaCards/Conteudo';

import { Suspense } from 'react';

const Carousel = React.lazy(() => import('./carousel/Carousel'))

function AppTabela() {
  const [valueCarousel, setGetCarousel] = useState([]);
  const [atualizou, setGetAtualizou] = useState(false);
  const [button, setButton] = useState(null);
  const [current, setCurrent] = useState(-1);
  const [history, setHistory] = useState([]);

  const [pesquisaName, setPesquisaName] = useState([]);
  const [pesquisaId, setPesquisaId] = useState([]);

  const [ultimoAtualizado, setUltimoAtualizado] = useState(null); // Novo estado para rastrear o último atualizado

  // Funções para definir os valores e marcar o último atualizado
  const handleSetCarousel = (value) => {
    setGetCarousel(value);
    setUltimoAtualizado('carousel'); // Marca que o último atualizado foi o valueCarousel
  };

  const handleSetPesquisaName = (value) => {
    setPesquisaName(value);
    setUltimoAtualizado('pesquisaName'); // Marca que o último atualizado foi pesquisa
  };

  const handleSetPesquisaId = (value) =>{
    setPesquisaId(value)
    setUltimoAtualizado('pesquisaId')
  };

  return (
    <ButtonContext.Provider value={{ button, setButton }}>
      <CurrentContext.Provider value={{ current, setCurrent, history, setHistory }}>
        <div className="total">
          <header className="header">
            <HeaderRight button={button} setPesquisaName={handleSetPesquisaName} setPesquisaId={handleSetPesquisaId} />
          </header>

          <div className="app">
            <div className="container">
              <div className="tabela">
                <ErrorBoundary>
                {
                  ultimoAtualizado === 'pesquisaName' ? (
                    <PivotTableComponent
                      pesquisa={pesquisaName}
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
                <Suspense fallback={<div>Carregando</div>}>
                  {ultimoAtualizado === 'pesquisaName' && pesquisaName.length > 0 ? (
                    <Carousel targetValue={pesquisaName} update={setGetAtualizou} />
                  ) : ultimoAtualizado === 'carousel' && valueCarousel.length > 0 ? (
                    <Carousel targetValue={valueCarousel} update={setGetAtualizou} />
                  ) : ultimoAtualizado === 'pesquisaId' && pesquisaId.length > 0 ? (
                    <Carousel targetValue={pesquisaId} update={setGetAtualizou}/>
                  ) : null}
                </Suspense>
              </div>
            </div>
          </div>

          <div>
            <Conteudo update={setGetAtualizou} />
          </div>
        </div>
      </CurrentContext.Provider>
    </ButtonContext.Provider>
  );
}

export default AppTabela;
