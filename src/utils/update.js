import { getTextAreaValue } from "./buscaTexteArea";
import { supabase } from "../supabaseClient";

export default async function updateElemento({ ById, id, valor }) {
    let newContent;
    let userId = id;
  
    if(!valor){ newContent = document.getElementById(ById).value; }
  
    if(valor){ newContent = getTextAreaValue(id); }
  
    if (!newContent) {
      window.alert('Conteúdo JSON não pode estar vazio!');
      return false;
    }
  
    try { 
        newContent = JSON.parse(newContent); 
    } 
    catch (e) {
      window.alert('Conteúdo inválido! Certifique-se de inserir um JSON válido.');
      console.error('Erro ao parsear JSON:', e.message);
      return false;
    }

    try {
        const { error } = await supabase
          .from('cardsn')
          .update({ struct: newContent })
          .eq('card_id', userId)
    
        if (error) {
          console.error('Erro ao atualizar dados:', error);
          window.alert('Erro ao atualizar dados: ' + error.message);
          return false;
        }
        else{ return true; }
    
      } catch (error) {
        console.error('Erro ao atualizar dados:', error.message);
        window.alert('Erro ao atualizar dados: ' + error.message);
        return false;
      }
    }