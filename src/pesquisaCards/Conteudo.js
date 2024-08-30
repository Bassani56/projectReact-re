import { useState } from "react";
import { updateElemento } from "../utils/utils";
import { inserirElemento } from "../utils/utils";

export default function Conteudo({update}){

    const atualizarElemento = async (someById, someId, boolean) => {
        console.log("ById: ", someById, "    id: ", someId, "    valor: ", boolean);
        const result = await updateElemento({ ById: someById, id: someId, valor: boolean });
        
        // Verificar resultado da atualização
        if (result) {
            update(true)
            window.alert('Atualização realizada com sucesso'); 
        } 
        
        else { console.log('Falha na atualização'); }
    };

    return( 
        <>
            <div>
            <label htmlFor="conteudoLabel"><br /> Conteúdo Json:</label><br />
            <textarea id="jsonInput" name="json" rows="32" cols="84" ></textarea><br />
            <button id="inserirJson" type="button" onClick={inserirElemento}>Inserir JSON</button>
            
            <label htmlFor="modeloLabel"><br /> Modelo Fixo:</label><br />
            <textarea id="modeloInput" name="json" rows="32" cols="50" readOnly></textarea><br />
            </div>
        </>
    )
}