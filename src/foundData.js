
import { supabase } from "./supabaseClient";

export default async function foundData(nome) {
    try {
        const { data, error } = await supabase
            .rpc('search_for_name', { party_name: nome });

        if (error) {
            console.error('Error:', error);
            return;
        }

        if (data) {
            console.log('found data: ', data)
            return data;
        }
    } catch (error) {
        console.error('Erro: ', error);
        return;
    }
}



  
