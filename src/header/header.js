import Pesquisa from "../pesquisaCards/Pesquisa"
export default function HeaderRight({button}){
    
    return(
        <>
            <div className='esq'>
                <Pesquisa/>
            </div>

            <div className='dir'>
                {button}
            </div>
        </>
    )
}
