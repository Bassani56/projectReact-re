import { getAccountingSummary } from "../server";
import { useCallback, useEffect, useState } from "react";
import $, { get } from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'pivottable';
import 'pivottable/dist/pivot.css';
import { fetchUserTable } from "../fetchUserTable";
import { useContext } from "react";
import { CurrentContext } from '../context/ThemeContext';

function PivotTableComponent({pesquisa,  setCarousel, setGetAtualizou, update}) {
    const [data, setData] = useState([]);
    
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

    const {history, setHistory, current, setCurrent } = useContext(CurrentContext);
    
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
                // console.log('pivotUI: ', data)
            } catch (error) {
                console.error("Error rendering PivotTable UI:", error);
            }
        } else {
            $("#output").empty();
        }
    }, [data, pivotOptions]);

    // console.log('current: ', current)
    if (update) {
        const update = async () =>{
            try{
                // console.log('history[current].data: ', history[current].data)
                let accountingData;

                if(current != 0){
                    accountingData = await fetchUserTable(history[current].data);
                } else{
                    accountingData = await getAccountingSummary();
                }

                setData(accountingData);
                setGetAtualizou(false)
            } catch(error){
                console.error(error)
            }
        }

        update()
    } 
      
    useEffect(() => {    
        const fetchAccountSummary = async () => {
            try {
                const accountingData = await getAccountingSummary();
                setData(accountingData);
                setCurrent(0);
                setHistory([{ data: accountingData, filters: {} }]);
            } catch (error) {
                console.error('Erro ao buscar accountData:', error);
            }
        };
    
        if (!pesquisa) {
            fetchAccountSummary();
        } else {
            setData(pesquisa);
            setCurrent(0);
            setHistory([{ data: pesquisa, filters: {} }]);
        }
    
    }, []);  
    
    // useEffect(() =>{
    //     console.log('current: ', current)   
    // },[current])
    
    console.log('current FORA: ', current)

    useEffect(()=>{
        console.log('history: ', history)
    },[history])

    useEffect(() =>{
        let flag = true;
        
        if (current >= 1) {
            if (Array.isArray(history)) {
                if(history[current].data.length === cardsAtual.length){
                    for(let i = 0; i < history[current].data.length; i++){
                        if(history[current].data[i] === cardsAtual[i]){
                            // console.log(history[current].data[i] + '  =  ' + cardsAtual[i])
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
            setCurrent(prevIndex => {
                return prevIndex + 1;
            });

            setHistory(prevHistory => { 
                const newHistory = [...prevHistory.slice(0, current + 1), { data: cardsAtual }];
                
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

    // console.log('history current: ', history[current])

    useEffect(()=>{
        async function carrega(){
            const previousView = history[current];
            // console.log('previousView: ', previousView)

            if (previousView) {
                // console.log("previousView: ", previousView.data)            
                setCarousel(previousView.data)
                setCardsAtual(previousView.data);
                                
                setHistory(prevHistory => {
                    // Remove o último item do histórico
                    const newHistory = prevHistory.slice(0, current + 1);
                    return newHistory;
                });
                        
            } 
        }

        if (current > 0) {
            carrega();
            
        }
         
        if(current === 0){
            setCarousel('')
            setData(history[current].data)
        }
    },[current])

    return (
        <>
            <div id="output" style={{ margin: '30px' }} />
        </>
    );
}

export default PivotTableComponent;