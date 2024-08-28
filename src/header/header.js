import Pesquisa from "../pesquisaCards/Pesquisa"
export default function HeaderRight({button, voltar}){
    // console.log(voltar)
    return(
        <>
            <div className='esq'>
                {voltar}
                <Pesquisa/>
            </div>

            <div className='dir'>
                {button}
            </div>
        </>
    )
}
