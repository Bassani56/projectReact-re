import { buscarElementoName } from "../utils/utils"
import { useState } from "react"
import './index.css'

export default function PesquisaName({setPesquisa}){
    async function busca(){
        console.log('aqui')
        const data = await buscarElementoName()
        setPesquisa(data)
    }
    return(
        <>
            <input type="text" id="nameInput" placeholder="Digite o nome"/>
            <button id="buscarName" type="button" onClick={busca}>Buscar</button>
        </>
    )
}