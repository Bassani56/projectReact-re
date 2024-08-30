import { supabase } from "./supabaseClient";

export async function fetchUserTable(cardIdList) {
  await new Promise(resolve => setTimeout(resolve, 750));
  
  let formattedCardIdList;
  if(typeof(cardIdList) !== 'string'){
     formattedCardIdList = `{${cardIdList.map(id => `"${id}"`).join(',')}}`;
  }else{
     formattedCardIdList = cardIdList;
  }
  //console.log('formated Cards: ', formattedCardIdList)
  
  const { data, error } = await supabase
    .rpc('user_table', { card_id_list: formattedCardIdList });

  if (error) {
    console.error('Erro ao buscar dados:', error);
    return ;
  }
  // console.log(data)
  return data;
  
}


