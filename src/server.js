import { supabase } from "./supabaseClient"; // Ajuste o caminho se necessário

const getAccountingSummary = async () => {
  await new Promise(resolve => setTimeout(resolve, 750));
  try {
    const { data, error } = await supabase.rpc('user_table');
    // console.log("data: ", data)
    if (error) { throw error; }

    return data;
  } 
  
  catch (error) { console.error('Error fetching accounting summary:', error); }
};

export { getAccountingSummary };