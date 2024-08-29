import PesquisaName from "../pesquisaCards/PesquisaName"
import PesquisaId from "../pesquisaCards/PesquisaId"

export default function HeaderRight({button, voltar, setPesquisaName, setPesquisaId}){
    
    return(
        <>
            <div className='esq'>
                {voltar}
                <PesquisaName setPesquisa={setPesquisaName}/>
                <PesquisaId setPesquisa={setPesquisaId}/>
            </div>

            <div className='dir'>
                {button}
            </div>
        </>
    )
}
