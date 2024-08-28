import { buscarElemento } from "../utils/utils"
import { useState } from "react"
export default function Pesquisa({setPesquisa}){
    async function busca(){
        console.log('aqui')
        const data = await buscarElemento()
        setPesquisa(data)
    }
    return(
        <>
            <input type="text" id="idInput"/>
            <button id="buscarBotao" type="button" onClick={busca}>Buscar no Supabase</button>
        </>
    )
}