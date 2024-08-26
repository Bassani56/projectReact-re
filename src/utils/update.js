export default async function updateElemento({ ById, id, valor }) {
    let newContent;
    let userId = id;
  
    if(!valor){ newContent = document.getElementById(ById).value; }
  
    if(valor){ newContent = getTextAreaValue(id); }
  
    if (!newContent) {
      window.alert('Conteúdo JSON não pode estar vazio!');
      return false;
    }
  
    try { newContent = JSON.parse(newContent); } 
    catch (e) {
      window.alert('Conteúdo inválido! Certifique-se de inserir um JSON válido.');
      console.error('Erro ao parsear JSON:', e.message);
      return false;
    }
}