// import { useState } from "react";
// import { supabase } from "./supabaseClient";

// export default function teste(){

//     const[nome, setNome] = useState(null)

//     async function foundData(name){
//         try{
//             const { data, error } = await supabase
//             .rpc('search_for_name', { name });
    
//             if(data){
//                 console.log(data)
//                 setNome(data)
//             }
    
//             if (error) {
//                 console.error('Error:', error);
//                 return;
//             }
//         }
    
//         catch(error){
//             console.error('Erro: ', error)
//         }
    
//     }
//     foundData('W')

//     return(
//         <>
//             {nome}
//         </>
//     )

// }