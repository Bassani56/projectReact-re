import React, { useEffect, useState } from 'react';
import { SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Navigation } from 'swiper/modules'; // Importação corrigida

import Cards from './cards/Cards';

import { buscaStruct } from '../utils/buscaStruct';

import { updateElemento } from '../utils/utils';

import { useContext } from 'react';

import { ButtonContext } from '../context/ThemeContext';


import { Suspense } from 'react';

import { Swiper } from 'swiper/react';

const Carousel = ({ targetValue, update}) => {
  const [specificCardIds, setSpecificCardIds] = useState([]);
  const [texts, setTexts] = useState({});
  const [structData, setStructData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [busca, setBusca] = useState(false);

  // console.log('targetValue: ', targetValue)

  // const{theme} = useContext(ThemeContext)


  const { setButton } = useContext(ButtonContext);


  useEffect(() => {
    setSpecificCardIds(targetValue);
    // console.log('targetValue: ', targetValue)
    if (specificCardIds.length > 0) {
      setBusca(true);
      
      const atualizar = async () => {
        console.log('especificCardsIds: ', specificCardIds)
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
    setCurrentIndex(swiper.activeIndex);
  };

  useEffect(() => {
    const returnBotao = () => {
      return (
        <button id='botaoCards' type="button" onClick={() => { 
          atualizarElemento('card', document.getElementById('cardId').textContent, true);
        }}>Update JSON</button>
      );
    };

    setButton(returnBotao()); // Atualize o botão no contexto

    return () => setButton(null); // Limpe o botão quando o componente for desmontado
  }, [setButton]);


  const atualizarElemento = async (someById, someId, boolean) => {
    console.log(someById, someId, boolean);
    const result = await updateElemento({ ById: someById, id: someId, valor: boolean });
    
    if (result) {
        window.alert('Atualização realizada com sucesso');
        update(true);
    } else {
        console.log('Falha na atualização');
    }
  };

  return (
    <div>
      {!targetValue && <p id='mensagem'>Clique na tabela para pesquisar por Cards Específicos</p>}
      <div className="swiper-button-prev">{"<"}</div>
      <div className="swiper-button-next">{">"}</div>

      <Suspense fallback={<div>Carregando ... </div>}>
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
          <Suspense fallback={<div>Carregando ... </div>}>
          {Object.keys(structData).map((key, index) => (
            <SwiperSlide className="swiper-slide-fixed" key={index}>
              <div >
                <h2 style={{marginTop:'1px', fontSize: '10px'}}>Slide: {index + 1} / {Object.keys(structData).length}</h2>
                <div style={{ fontSize: '10px', color: 'black', display: 'flex'}} >
                  <div id='cardId'>{specificCardIds[index]}</div>
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
          ))}
          </Suspense>
          
        </Swiper>
      </Suspense>
    </div>
  );
};

export default Carousel;
