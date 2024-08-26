import { getAccountingSummary } from "../server";
import { useEffect, useState } from "react";
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'pivottable';
import 'pivottable/dist/pivot.css';
import { fetchUserTable } from "../fetchUserTable";

function PivotTableComponent({setCarousel}) {
    const [data, setData] = useState([]);
    const [cardsTable, setCardsTable] = useState([]);

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

    function handleClick(e, value, filters, pivotData) {
        e.preventDefault();
        let card_ids_list = [];
    
        pivotData.forEachMatchingRecord(filters, (record) => {
            card_ids_list.push(record.card_ids); 
        });

        const getUniqueItems = (array) => Array.from(new Set(array));
        const combinedCardIdsList = getUniqueItems(card_ids_list.flat()); // Achata os arrays em um único array

        setCardsAtual(combinedCardIdsList);
    }

    useEffect(() => {
        if (data.length > 0) {
            try {
                $("#output").pivotUI(data, pivotOptions);
            } catch (error) {
                console.error("Error rendering PivotTable UI:", error);
            }
        } else {
            $("#output").empty();
        }
    }, [data, pivotOptions]);

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
        // console.log('currentViewIndex: ', currentViewIndex)
    },[currentViewIndex])

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
        
        if(flag){
            setCurrentViewIndex(prevIndex =>{
                return prevIndex + 1;
            })
    
            setHistory(prevHistory => { 
                const newHistory = [...prevHistory.slice(0, currentViewIndex + 1), { data: cardsAtual }];
                return newHistory;
            });
            setCardsTable(cardsAtual)
            setCarousel(cardsAtual)
        }

        // console.log(cardsAtual)
        
    },[cardsAtual])

    useEffect(()=>{
        // console.log('history: ', history)
        // const res = require('C:\Users\User\Desktop\ProjetoReactMelhorado\my-app\backend\server')
    },[history])


    useEffect(() => {
        const fetchData = async () => {
            if (cardsAtual.length > 0) {
                try {
                    const cardsSpecifics = await fetchUserTable(cardsAtual);
                    setData(cardsSpecifics);
                    // console.log('pega cards filtrados')
                } catch (error) {
                    console.error('Erro ao buscar fetchData:', error);
                }
            }
        };

        fetchData();
    }, [cardsAtual]);

    return (
        <>
            <div id="output" style={{ margin: '30px' }} />
        </>
    );
}

export default PivotTableComponent;