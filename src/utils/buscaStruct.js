import { supabase } from "../supabaseClient";

export const buscaStruct = async (specificCardIds) => {
    await new Promise(resolve => setTimeout(resolve, 750));
    try {
        const { data, error } = await supabase
            .from('cardsn')
            .select('struct, card_id')
            .in('card_id', specificCardIds)
            
        if (error) {
            console.error(`Erro ao executar a query:`, error);
            return null;
        } else {
            const newStructData = {};
            console.log('data busca struct: ', data)
            data.forEach(item => { newStructData[item.card_id] = item.struct; });

            const orderedStructData = specificCardIds.reduce((acc, id) => {
                if (newStructData[id]) {
                    acc[id] = newStructData[id];
                }
                return acc;
            }, {});

            return orderedStructData;
        }
    } catch (error) {
        console.error(`Erro ao executar a query:`, error);
        return null;
    }
};
