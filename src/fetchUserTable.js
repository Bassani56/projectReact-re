
import { supabase } from "./supabaseClient";// Caminho para o seu arquivo supabaseClient.js

export async function fetchUserTable(cardIdList) {
  await new Promise(resolve => setTimeout(resolve, 750));
  
  // Converta a lista de card_ids para uma string no formato necessário para a query
  
  let formattedCardIdList;
  if(typeof(cardIdList) !== 'string'){
     formattedCardIdList = `{${cardIdList.map(id => `"${id}"`).join(',')}}`;
  }else{
     formattedCardIdList = cardIdList;
  }
//   console.log('formated Cards: ', formattedCardIdList)
  // Execute a query chamando a função SQL e passando a lista de card_ids
  const { data, error } = await supabase
    .rpc('user_table', { card_id_list: formattedCardIdList });

  if (error) {
    console.error('Erro ao buscar dados:', error);
    return ;
  }
  // console.log(data)
  return data;
  
}


