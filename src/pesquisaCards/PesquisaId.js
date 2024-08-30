
import './index.css'

export default function PesquisaId({setPesquisa}){
    async function busca(){
        const userId = document.getElementById('idInput').value; 
        const arrumado = arrumaArrayId(userId)
        console.log('arrumado: ', arrumado)
        setPesquisa(arrumado)
    }

    function arrumaArrayId(id) {
        let cleanedInput = id.replace(/[;,\[\]']\s*/g, '').replace(/\s+/g, '');
      
        // Separa os IDs com base nas aspas duplas
        let ids = cleanedInput.split('"').filter(Boolean);
      
        // Retorna o array de IDs diretamente, sem formatar como string
        return ids;
    }
      
    return(
        <>
            <input type="text" id="idInput"/>
            <button id="buscarId" type="button" onClick={busca}>Buscar por Id</button>
        </>
    )
}