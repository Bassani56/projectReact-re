
import { buscarElemento } from "../utils/utils"

export default function Pesquisa(){
    return(
        <>
            <input type="text" id="idInput"/>
            <button id="buscarBotao" type="button" onClick={buscarElemento}>Buscar no Supabase</button>
        </>
    )
}