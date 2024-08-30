import { useState } from "react";
import { updateElemento } from "../utils/utils";
import { inserirElemento } from "../utils/utils";

export default function Conteudo(){

    return( 
        <>
            <div className="conteudo">
                <div className="input-group">
                    <label htmlFor="jsonInput">Conteúdo Json:</label>
                    <input id="jsonInput" type="text" placeholder="Digite seu id"/>
                </div>

                <div className="input-group">
                    <textarea id="jsonText" name="json" rows="32" cols="84"></textarea>
                </div>

                <div className="button-group">
                    <button id="inserirJson" type="button" onClick={inserirElemento}>Inserir JSON</button>
                </div>

                <div className="input-group">
                    <label htmlFor="modeloInput">Modelo Fixo:</label>
                    <textarea id="modeloInput" name="json" rows="32" cols="50" readOnly></textarea>
                </div>
            </div>


        </>
    )
}