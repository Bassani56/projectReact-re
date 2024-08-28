import { getAccountingSummary } from "../server";
import { useEffect, useState } from "react";
import $, { get } from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'pivottable';
import 'pivottable/dist/pivot.css';
import { fetchUserTable } from "../fetchUserTable";
import { useContext } from "react";
import { VoltarContext } from '../context/ThemeContext';

function PivotTableComponent({setCarousel, setGetAtualizou, update}) {
    const [data, setData] = useState([]);
    const [currentViewIndex, setCurrentViewIndex] = useState(-1);
    const [history, setHistory] = useState([]);
    const[cardsAtual, setCardsAtual] = useState([])
    const [pivotOptions, setPivotOptions] = useState({
        rows: ["conta"],
        cols: ["ano"],
        aggregatorName: "Sum",
        vals: ["total_value"],
        rendererName: "Table",
        rendererOptions: {
            table: {
                clickCallback: handleClick
            }
        }
    });

    const[buffer, setBuffer] = useState(false)

    function handleClick(e, value, filters, pivotData) {
        e.preventDefault();
        let card_ids_list = [];
    
        pivotData.forEachMatchingRecord(filters, (record) => {
            card_ids_list.push(record.card_ids); 
        });

        const getUniqueItems = (array) => Array.from(new Set(array));
        const combinedCardIdsList = getUniqueItems(card_ids_list.flat()); // Achata os arrays em um único array

        setCardsAtual(combinedCardIdsList);
        
        // console.log('combinedCardIdsList: ', combinedCardIdsList)
    }

    useEffect(() => {
        if (data.length > 0) {
            try {
                $("#output").pivotUI(data, pivotOptions);
                // console.log('data: ', data)
            } catch (error) {
                console.error("Error rendering PivotTable UI:", error);
            }
        } else {
            $("#output").empty();
        }
    }, [data, pivotOptions]);

    // console.log('currentViewIndex: ', currentViewIndex)
    // if (update) {
    //     const update = async () =>{
    //         try{
    //             console.log('history[currentViewIndex].data: ', history[currentViewIndex].data)
    //             const accountingData = await fetchUserTable(history[currentViewIndex].data);
    //             setData(accountingData);
    //             setGetAtualizou(false)
    //         } catch(error){
    //             console.error(error)
    //         }
    //     }

    //     update()

    //   } else {
    //     // console.log('falso');
    //   }
      
    useEffect(() => {    
        const fetchAccountSummary = async () => {
            try {
                const accountingData = await getAccountingSummary();
                setData(accountingData);
                setCurrentViewIndex(0)
                setHistory([{ data: accountingData, filters: {} }]);
            } catch (error) {
                console.error('Erro ao buscar accountData:', error);
            }
        }
        
        fetchAccountSummary();
    }, []);

    useEffect(() =>{
        console.log('currentViewIndex: ', currentViewIndex)   
    },[currentViewIndex])
    
    useEffect(()=>{
        console.log('history: ', history)
    },[history])

    useEffect(() =>{
        let flag = true;
        
        if (currentViewIndex >= 1) {
            if (Array.isArray(history)) {
                if(history[currentViewIndex].data.length === cardsAtual.length){
                    for(let i = 0; i < history[currentViewIndex].data.length; i++){
                        if(history[currentViewIndex].data[i] === cardsAtual[i]){
                            // console.log(history[currentViewIndex].data[i] + '  =  ' + cardsAtual[i])
                            flag = false;
                            break;
                        }
                    }
                }
                
            } else {
                console.warn('`history` não é um array');
            }
        }
        
       if (flag) {
            setCurrentViewIndex(prevIndex => {
                return prevIndex + 1;
            });

            setHistory(prevHistory => { 
                const newHistory = [...prevHistory.slice(0, currentViewIndex + 1), { data: cardsAtual }];
                
                // console.log('New History:', newHistory); // Adiciona log para depuração
                return newHistory;
            });
        }
        
    },[cardsAtual])

    useEffect(() => {
        const fetchData = async () => {
            if (cardsAtual.length > 0) {
                try {
                    const cardsSpecifics = await fetchUserTable(cardsAtual);
                    setData(cardsSpecifics);
                    setCarousel(cardsAtual)

                } catch (error) {
                    console.error('Erro ao buscar fetchData:', error);
                }
            }
        };

        fetchData();
    }, [cardsAtual]);

    // console.log('history current: ', history[currentViewIndex])

    function goBack () {
        setCurrentViewIndex(prevIndex => { if(prevIndex > 1) {return prevIndex - 1;} else{return 0}});
        setBuffer(true);
    };

    if(buffer){
        // console.log("prevHistory: ", history[currentViewIndex]);
        // console.log(currentViewIndex)
            if (currentViewIndex > 0) {
                const previousView = history[currentViewIndex];
                // console.log('previousView: ', previousView)
                if (previousView) {
                    console.log("previousView: ", previousView.data)
                    setCarousel(previousView.data)
                    setCardsAtual(previousView.data);
                            
                    setHistory(prevHistory => {
                        // Remove o último item do histórico
                        const newHistory = prevHistory.slice(0, -1);
                        return newHistory;
                    });
                    
                } else {
                    console.error('Dados inválidos no histórico.');
                }
            }
             
        if(currentViewIndex === 0){
            setCarousel('')
            console.log(" <<<<<<<<<<<<<< prevHistory  >>>>>>>>> ", history[0].data)
            setData(history[currentViewIndex].data)
        }

        setBuffer(false);
    }
       
    const { setVoltar } = useContext(VoltarContext);

    useEffect(() => {
        const returnBotao = () => {
          return (
            <button id='botaoVoltar' type="button" onClick={() => {goBack()}}>Voltar</button>
          );
        };
    
        setVoltar(returnBotao()); // Atualize o botão no contexto
    
        return () => setVoltar(null); // Limpe o botão quando o componente for desmontado
      }, [setVoltar]);

    return (
        <>
            <div id="output" style={{ margin: '30px' }} />
        </>
    );
}

export default PivotTableComponent;