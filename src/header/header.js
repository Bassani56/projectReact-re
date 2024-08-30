import PesquisaName from "../pesquisaCards/PesquisaName"
import PesquisaId from "../pesquisaCards/PesquisaId"
import { useContext } from "react"

import { CurrentContext } from "../context/ThemeContext";

export default function HeaderRight({button, setPesquisaName, setPesquisaId}){
   
    const { current, setCurrent } = useContext(CurrentContext);

    function handleBack(){
        setCurrent(prev => {
            if(prev > 0){
                return prev - 1;
            } return 0;
        })
    }

    return(
        <>
            <div className='esq'>
                <button id='botaoVoltar' type="button" onClick={handleBack}>Voltar</button>
                <PesquisaName setPesquisa={setPesquisaName}/>
                <PesquisaId setPesquisa={setPesquisaId}/>
            </div>

            <div className='dir'>
                {button}
            </div>
        </>
    )
}
