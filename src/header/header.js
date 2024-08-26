import updateElemento from '../utils/update';
import { useStore } from '../Store/Store';

export default function HeaderRight(){
    const setIsButtonClicked = useStore((state) => state.setClicked);

    const atualizarElemento = async (someById, someId, boolean) => {
        const result = await updateElemento({ ById: someById, id: someId, valor: boolean });
        if (result) {
            window.alert('Atualização realizada com sucesso');
            // setIsButtonClicked(true);
        } else {
            console.log('Falha na atualização');
        }
      };
    return(
        <>
            <div className="swiper-button-prev">{"<"}</div>
            <div className="swiper-button-next">{">"}</div>
            <button id='botaoCards' type="button" onClick={() => { 
                atualizarElemento('card', document.getElementById('cardId').textContent, true);
            }}>Salvar</button>
        </>
    )
}
