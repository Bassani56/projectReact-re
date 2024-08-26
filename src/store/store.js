import create from 'zustand';

// Definindo a store global com Zustand
const useStore = create((set) => ({
    isButtonClicked: false, // Estado inicial
    setClicked: (value) => set({ isButtonClicked: value }), // Função para atualizar o estado
}));

export { useStore };
