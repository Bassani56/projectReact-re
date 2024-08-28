import { supabase } from './supabaseClient';

function arrumaArrayId(id) {
  let cleanedInput = id.replace(/[;,\[\]']\s*/g, '').replace(/\s+/g, '');

  // Separa os IDs com base nas aspas duplas
  let ids = cleanedInput.split('"').filter(Boolean);

  // Adiciona aspas simples a cada ID e retorna o array de IDs formatados
  let formattedIds = ids.map(id => `'${id}'`);
  
  // Cria o formato de array com colchetes e aspas simples
  return `[${formattedIds.join(', ')}]`;
}

export async function fetchData(id) {
  console.log(id);
  
  // let arrayIds = arrumaArrayId(id);
  // console.log('Array de IDs: ', arrayIds);
  
  try {
    const { data, error } = await supabase
      .from('cardsn')
      .select('struct, card_id')
      .in('card_id', id); // Passa o array de IDs diretamente
    
    if (error) {
      console.error('Erro ao buscar dados:', error);
      return null;
    }

    console.log(data)

    if (data && data.length > 0) {
      const json_text = JSON.stringify(data[0].struct, null, 2); // Ajustado para 'struct'
      console.log("json_text: ", json_text);
      return json_text;
    } else {
      console.log('Nenhum dado encontrado para o ID:', id);
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar dados:', error.message);
    return null;
  }
}
