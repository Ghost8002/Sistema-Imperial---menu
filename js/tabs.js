// Gerenciamento das abas dos setores
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando sistema de abas...');

    // Seleciona todas as abas e painéis
    const sectorTabs = document.querySelectorAll('.sector-tab');
    const sectorPanels = document.querySelectorAll('.sector-panel');

    // Função para trocar de aba
    window.switchTab = (sector) => {
        console.log('Trocando para a aba:', sector);
        
        // Remove a classe active de todas as abas e painéis
        sectorTabs.forEach(tab => tab.classList.remove('active'));
        sectorPanels.forEach(panel => panel.classList.remove('active'));
        
        // Adiciona a classe active na aba e painel selecionados
        const selectedTab = document.querySelector(`[data-sector="${sector}"]`);
        const selectedPanel = document.getElementById(`${sector}-panel`);
        
        if (selectedTab && selectedPanel) {
            selectedTab.classList.add('active');
            selectedPanel.classList.add('active');
        }
    };

    // Adiciona o evento de clique em cada aba
    sectorTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sector = tab.getAttribute('data-sector');
            
            // Se for a aba de T.I, deixa o sistema de autenticação lidar com o clique
            if (sector === 'ti') {
                return;
            }
            
            window.switchTab(sector);
        });
    });

    // Define a aba Home como padrão
    window.switchTab('home');

    console.log('Sistema de abas inicializado com sucesso!');
}); 