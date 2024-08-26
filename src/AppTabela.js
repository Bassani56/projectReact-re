import './index.css';

import PivotTableComponent from './pivotTable/PivotTable';
import ErrorBoundary from './ErrorBoundary';

import Carousel from './carousel/Carousel';
import { useState } from 'react';


function AppTabela() {

  const[getCarousel, setGetCarousel] = useState([])

  return (
    <>
      <header className='header'>
        CONTEUDO TEXTO
      </header>

      <div className='app'>
        <div className='container'>
          <div className='tabela'>
            <ErrorBoundary>
              <PivotTableComponent setCarousel={setGetCarousel}/>
            </ErrorBoundary>
          </div>

          <div className='carousel'>
            {getCarousel.length > 0 ? (
              <Carousel targetValue={getCarousel} />
            ) : null}
          </div>

        </div>
      </div>
    </>
    
  );
}

export default AppTabela;
