import { Menu } from './modules/menu.js';
import { Background } from './modules/background.js';
import { Auth } from './auth.js';

class CursorEffect {
    constructor() {
        this.cursor = null;
        this.container = null;
        this.particles = [];
        this.isMoving = false;
        this.moveTimeout = null;
        this.lastX = 0;
        this.lastY = 0;
        this.particleCount = 10;
        this.init();
    }

    init() {
        // Cria o container do cursor
        this.container = document.createElement('div');
        this.container.className = 'cursor-container';
        document.body.appendChild(this.container);

        // Cria o cursor principal
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor-trail';
        this.container.appendChild(this.cursor);

        // Cria as partículas
        for (let i = 0; i < this.particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            this.container.appendChild(particle);
            this.particles.push({
                element: particle,
                x: 0,
                y: 0,
                delay: i * 2
            });
        }

        // Adiciona eventos
        this.addEventListeners();
    }

    addEventListeners() {
        // Evento de movimento do mouse
        document.addEventListener('mousemove', this.handleMouseMove.bind(this));
        
        // Evento quando o mouse sai da janela
        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        
        // Evento quando o mouse entra na janela
        document.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
        
        // Eventos de hover nos botões
        document.querySelectorAll('.menu-button').forEach(button => {
            button.addEventListener('mouseenter', this.handleButtonEnter.bind(this));
            button.addEventListener('mouseleave', this.handleButtonLeave.bind(this));
        });
    }

    handleMouseMove(e) {
        if (!this.isMoving) {
            this.isMoving = true;
            this.cursor.style.opacity = '1';
        }

        // Atualiza a posição do cursor usando transform
        this.cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;

        // Atualiza as partículas
        this.updateParticles(e.clientX, e.clientY);

        // Limpa o timeout anterior
        if (this.moveTimeout) {
            clearTimeout(this.moveTimeout);
        }

        // Define um novo timeout
        this.moveTimeout = setTimeout(() => {
            this.isMoving = false;
            this.cursor.style.opacity = '0.5';
            this.hideParticles();
        }, 100);

        this.lastX = e.clientX;
        this.lastY = e.clientY;
    }

    updateParticles(x, y) {
        const dx = x - this.lastX;
        const dy = y - this.lastY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx);

        this.particles.forEach((particle, index) => {
            const delay = particle.delay;
            const offsetX = -Math.cos(angle) * delay * 2;
            const offsetY = -Math.sin(angle) * delay * 2;

            particle.element.style.transform = `translate(${x + offsetX}px, ${y + offsetY}px)`;
            particle.element.style.opacity = '1';
            particle.element.style.scale = `${1 - (index / this.particleCount)}`;
        });
    }

    hideParticles() {
        this.particles.forEach(particle => {
            particle.element.style.opacity = '0';
        });
    }

    handleMouseLeave() {
        this.cursor.style.opacity = '0';
        this.hideParticles();
    }

    handleMouseEnter() {
        this.cursor.style.opacity = '1';
    }

    handleButtonEnter() {
        this.cursor.style.width = 'var(--cursor-size-hover)';
        this.cursor.style.height = 'var(--cursor-size-hover)';
    }

    handleButtonLeave() {
        this.cursor.style.width = 'var(--cursor-size)';
        this.cursor.style.height = 'var(--cursor-size)';
    }

    destroy() {
        this.particles.forEach(particle => particle.element.remove());
        this.container.remove();
        document.removeEventListener('mousemove', this.handleMouseMove);
    }
}

// Função para inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    // Inicializa o menu
    const menu = new Menu();
    
    // Inicializa o background com efeito de movimento
    const background = new Background();
    
    // Inicializa o efeito do cursor
    const cursorEffect = new CursorEffect();

    // Inicializa o sistema de autenticação
    const auth = new Auth();

    // Adiciona estilo para o efeito ripple
    const style = document.createElement('style');
    style.textContent = `
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Adiciona o efeito de brilho no background
    const backgroundElement = document.querySelector('.background');
    
    document.addEventListener('mousemove', (event) => {
        // Calcula a posição relativa do mouse em relação à janela
        const percentX = (event.clientX / window.innerWidth) * 100;
        const percentY = (event.clientY / window.innerHeight) * 100;

        // Atualiza as variáveis CSS com a nova posição
        document.documentElement.style.setProperty('--x', `${percentX}%`);
        document.documentElement.style.setProperty('--y', `${percentY}%`);
    });

    // Gerenciamento das abas dos setores
    const sectorTabs = document.querySelectorAll('.sector-tab');
    const sectorPanels = document.querySelectorAll('.sector-panel');

    // Função para alternar entre as abas
    function switchTab(tabId) {
        // Remove a classe active de todas as abas e painéis
        sectorTabs.forEach(tab => tab.classList.remove('active'));
        sectorPanels.forEach(panel => panel.classList.remove('active'));

        // Adiciona a classe active na aba e painel selecionados
        const selectedTab = document.querySelector(`[data-sector="${tabId}"]`);
        const selectedPanel = document.getElementById(`${tabId}-panel`);
        
        if (selectedTab && selectedPanel) {
            selectedTab.classList.add('active');
            selectedPanel.classList.add('active');
        }
    }

    // Adiciona o evento de clique em cada aba
    sectorTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sectorId = tab.getAttribute('data-sector');
            switchTab(sectorId);
        });
    });
}); 