import { supabase } from '../supabaseClient';
import { getTextAreaValue } from './buscaTexteArea';

import foundData from '../foundData';

  async function buscarElementoName() {
    var userId = document.getElementById('nameInput').value; // Obtém o conteudo do input
    console.log('nameInput: ', userId)
    try {
      const json_text = await foundData(userId);
      if (json_text) {
        console.log("buscarElementoName: ", json_text)
        return json_text;
        
      } else { 
        console.log('Não foi possível encontrar dados para o ID:', userId);
        return null;
       }
    } 
    
    catch (error) { 
      console.error('Erro ao buscar dados:', error.message); 
      return null;
    }
  }

function validarJson(ById) {
  var jsonInput = document.getElementById(ById).value;
  console.log(jsonInput);

  try {
    const data = JSON.parse(jsonInput);
    console.log('JSON válido:', data);
    return true;
  } catch (error) {
    console.error('JSON inválido:', error.message);
    window.alert('JSON inválido: ' + error.message);
    return false;
  }
}
async function inserirElemento() {
    let cardId = document.getElementById('jsonInput').value.trim()

    if(!cardId){
      alert('Precisa colocar um id para inserir')
      return;
    }

    if(validarJson('jsonText')){window.alert('JSON válido!');} 

    let newContent = document.getElementById('jsonText').value.trim();
   
    if (!newContent) {
        alert('Conteúdo JSON não pode estar vazio!');
        return;
    }

    try { newContent = JSON.parse(newContent); } 
    catch (e) {
        window.alert('Conteúdo inválido! Certifique-se de inserir um JSON válido.');
        console.error('Erro ao parsear JSON:', e.message);
        return;
    }

    console.log('Tentando inserir dados para o card_id:', cardId);
    console.log('Conteúdo a ser inserido:', newContent);

    try {
        const { data, error } = await supabase
            .from('cardsn')
            .insert([{ card_id: cardId, struct: newContent }])
            .select(); // Adiciona a seleção para obter os dados inseridos

        if (error) {
            console.error('Erro ao inserir dados:', error);
            window.alert('Erro ao inserir dados: ' + error.message);
            return;
        }

        console.log('Dados inseridos com sucesso:', data);
        window.alert('Dados inseridos com sucesso!');
        return;
    } catch (error) {
        console.error('Erro ao inserir dados:', error.message);
        window.alert('Erro ao inserir dados: ' + error.message);
        return;
    }
}

async function updateElemento({ ById, id, valor }) {
  let newContent;
  console.log(ById, id, valor);

  if (!valor) {
    newContent = document.getElementById(ById).value;
  }

  if (valor) {
    newContent = getTextAreaValue(id);
  }

  // console.log('Conteúdo antes do parse:', newContent);

  if (!newContent) {
    window.alert('Conteúdo JSON não pode estar vazio!');
    return false;
  }

  try {
    newContent = JSON.parse(newContent);
  } catch (e) {
    window.alert('Conteúdo inválido! Certifique-se de inserir um JSON válido.');
    console.error('Erro ao parsear JSON:', e.message);
    return false;
  }

  try {
    const { data, error } = await supabase
      .from('cardsn')
      .update({ struct: newContent })
      .eq('card_id', id.trim())
      .select(); // Obtém os dados atualizados

    if (error) {
      console.error('Erro ao atualizar dados:', error);
      window.alert('Erro ao atualizar dados: ' + error.message);
      return false;
    } else {
      // console.log('Dados atualizados com sucesso:', data);
      // window.alert('Dados atualizados com sucesso!');
      return true;
    }
  } catch (error) {
    console.error('Erro ao atualizar dados:', error.message);
    window.alert('Erro ao atualizar dados: ' + error.message);
    return false;
  }
}
 
async function processarEmail() {
  const texto = document.getElementById('emailContent').value;
  const response = await fetch('/processar_email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ texto })
  });
  const data = await response.json();
  document.getElementById('mensagemInput').innerText = data.resultado;
}

export { buscarElementoName, validarJson, updateElemento, processarEmail, inserirElemento};