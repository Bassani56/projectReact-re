export const getTextAreaValue = (card_id) => {
    console.log(card_id, typeof(card_id))
    const textarea = document.getElementById(`textarea-${card_id.trim()}`) 
   
    if (textarea) { return cleanJSONInput(textarea.innerHTML); } 
    
    else {
      console.warn(`Textarea with id textarea-${card_id} not found`);
      return null;
    }
  };
  

function cleanJSONInput(input) {
  // Substitui as tags <br> por quebras de linha
  return input.replace(/<br\s*\/?>/gi, '\n').trim();
}
  