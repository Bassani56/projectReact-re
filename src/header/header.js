import PesquisaName from "../pesquisaCards/PesquisaName"
import PesquisaId from "../pesquisaCards/PesquisaId"
import { useContext } from "react"

import { CurrentContext } from "../context/ThemeContext";

import { updateElemento } from "../utils/utils";

export default function HeaderRight({update, setPesquisaName, setPesquisaId}){
   
    const { indexSwiper ,setIndexSwiper, current, setCurrent } = useContext(CurrentContext);
    
    function handleBack(){
        setCurrent(prev => {
            if(prev > 0){
                return prev - 1;
            } return 0;
        })
    }

    async function handleUpdate(){
        // console.log(document.getElementById(`cardId-${indexSwiper}`).textContent);
        console.log('indexSwiper: ', indexSwiper)

        const result = await updateElemento({ ById: 'card', id: document.getElementById(`cardId-${indexSwiper}`).textContent, valor: true });
        
        if (result) {
            window.alert('Atualização realizada com sucesso');
            update(true);
        } else {
            console.log('Falha na atualização');
        }
    }

    return(
        <>
            <div className='esq'>
                <button id='botaoVoltar' type="button" onClick={handleBack}>Voltar</button>
                <PesquisaName setPesquisa={setPesquisaName}/>
                <PesquisaId setPesquisa={setPesquisaId}/>
            </div>

            <div className='dir'>
                <button id='botaoCards' type="button" onClick={handleUpdate}>Salvar</button>
            </div>
        </>
    )
}
