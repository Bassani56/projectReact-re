import React, { useEffect, useState, useContext, Suspense } from 'react';
import { SwiperSlide, Swiper } from 'swiper/react';
import './Carousel.css'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Navigation } from 'swiper/modules'; // Importação corrigida

import Cards from './cards/Cards';
import { buscaStruct } from '../utils/buscaStruct';


import { CurrentContext } from '../context/ThemeContext';

const Carousel = ({ targetValue}) => {
  const [specificCardIds, setSpecificCardIds] = useState([]);
  const [texts, setTexts] = useState({});
  const [structData, setStructData] = useState({});
  const [swiperInstance, setSwiperInstance] = useState(null);

  const {setIndexSwiper} = useContext(CurrentContext);

  useEffect(() => {
    setSpecificCardIds(targetValue);
    // console.log('targetValue: ', targetValue)
    if (specificCardIds.length > 0) {
      const atualizar = async () => {
        // console.log('especificCardsIds: ', specificCardIds)
        const data = await buscaStruct(specificCardIds);
        if (data) {
          setStructData(data);
        }
      };
     
      atualizar();
    }

    if (swiperInstance) {
      swiperInstance.slideTo(0);
    }

  }, [specificCardIds, swiperInstance, targetValue]);

  const handleChange = (id, event) => {
    if (event && event.target) {
      setTexts(prevTexts => ({
        ...prevTexts,
        [id]: event.target.value
      }));
    } else {
      console.warn('event.target é undefined');
    }
  };

  const handleSlideChange = (swiper) => {   
    setIndexSwiper(swiper.activeIndex);
  };

  return (
    <div className='swiper-container'>
      {!targetValue && <p id='mensagem'>Clique na tabela para pesquisar por Cards Específicos</p>}
      <div className="swiper-button-prev">{"<"}</div>
      <div className="swiper-button-next">{">"}</div>
        <Swiper
        className='swiper'
        onSwiper={(swiper) => setSwiperInstance(swiper)}
        modules={[Navigation]}
        spaceBetween={50} // Espaço entre slides
        slidesPerView={1}
        navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: false }} // Desativa a rolagem
        simulateTouch={false} // Desativa o arrasto com o mouse/touch
        allowTouchMove={false} // Desativa a navegação por toque
        style={{
            alignItems: 'center',
            width: '1000px',
            height: '100%',
            boxSizing: 'border-box', // Inclui padding e border no tamanho total
        }}
        onSlideChange={handleSlideChange}
        >
          {Object.keys(structData).map((key, index) => (
            <Suspense fallback={<div>Carregando ... </div>} key={index}>
              <SwiperSlide className="swiper-slide-fixed" key={index}>
                <div >
                  <h2 style={{marginTop:'1px', fontSize: '10px'}}>Slide: {index + 1} / {Object.keys(structData).length}</h2>
                  <div style={{ fontSize: '10px', color: 'black', display: 'flex'}} >
                    <div id={`cardId-${index}`}> {specificCardIds[index]}</div>
                  </div>
                  
                  {structData[specificCardIds[index]]?.folder_link ? (
                    <h2 style={{fontSize: '10px'}}>
                      Link: <a href={structData[specificCardIds[index]].folder_link} target="_blank" rel="noopener noreferrer">acessar documento</a>
                    </h2>
                  ) : (
                    <div>Sem link</div>
                  )}

                  <div style={{
                    fontSize: '10px',
                    color: '#333',
                    fontFamily: 'Arial, sans-serif',
                    padding: '10px',
                    border: '1px solid #ddd',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9'
                  }}>
                    {structData[specificCardIds[index]]?.description ? (
                      <>Descrição: {structData[specificCardIds[index]].description}</>
                    ) : (
                      <div>Sem descrição</div>
                    )}
                  </div>

                </div>
                
                <Cards
                  cardId={specificCardIds[index]}
                  text={texts[specificCardIds[index]] || JSON.stringify(structData[specificCardIds[index]], null, 2) || ''}
                  handleChange={handleChange}
                />
              </SwiperSlide>
            </Suspense>
          ))}
        </Swiper>
    </div>
  );
};

export default Carousel;
