import Pesquisa from "../pesquisaCards/Pesquisa"
export default function HeaderRight({button, voltar, setPesquisa}){
    
    return(
        <>
            <div className='esq'>
                {voltar}
                <Pesquisa setPesquisa={setPesquisa}/>
            </div>

            <div className='dir'>
                {button}
            </div>
        </>
    )
}
