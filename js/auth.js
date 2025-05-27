// Sistema de autenticação para a aba de T.I
document.addEventListener('DOMContentLoaded', () => {
    console.log('Inicializando sistema de autenticação...');

    const tiTab = document.querySelector('[data-sector="ti"]');
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const closeModalBtn = document.querySelector('.close-modal');

    // Verifica se todos os elementos necessários foram encontrados
    if (!tiTab || !loginModal || !loginForm || !closeModalBtn) {
        console.error('Elementos necessários não encontrados:', {
            tiTab: !!tiTab,
            loginModal: !!loginModal,
            loginForm: !!loginForm,
            closeModalBtn: !!closeModalBtn
        });
        return;
    }

    console.log('Elementos encontrados com sucesso!');

    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    loginForm.appendChild(errorMessage);

    // Função para mostrar o modal de login
    function showLoginModal() {
        console.log('Mostrando modal de login...');
        loginModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        errorMessage.textContent = '';
    }

    // Função para fechar o modal de login
    function closeLoginModal() {
        console.log('Fechando modal de login...');
        loginModal.classList.remove('active');
        document.body.style.overflow = '';
        loginForm.reset();
        errorMessage.textContent = '';
    }

    // Função para mostrar mensagem de erro
    function showError(message) {
        console.log('Mostrando erro:', message);
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Evento de clique na aba de T.I
    tiTab.addEventListener('click', (e) => {
        console.log('Clique na aba de T.I detectado');
        e.preventDefault();
        showLoginModal();
    });

    // Evento de fechar o modal
    closeModalBtn.addEventListener('click', () => {
        console.log('Botão de fechar clicado');
        closeLoginModal();
    });

    // Evento de clique fora do modal para fechá-lo
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            console.log('Clique fora do modal detectado');
            closeLoginModal();
        }
    });

    // Evento de submit do formulário de login
    loginForm.addEventListener('submit', (e) => {
        console.log('Formulário de login submetido');
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log('Tentando validar usuário:', username);

        if (!window.database) {
            console.error('Banco de dados não encontrado!');
            showError('Erro interno do sistema. Por favor, recarregue a página.');
            return;
        }

        const result = window.database.validateUser(username, password);
        console.log('Resultado da validação:', result);

        if (result.success) {
            console.log('Login bem-sucedido!');
            closeLoginModal();
            window.switchTab('ti');
            // Armazena o estado de autenticação
            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem('currentUser', username);
            localStorage.setItem('userRole', result.role);
        } else {
            console.log('Falha no login');
            showError(result.message);
        }
    });

    console.log('Sistema de autenticação inicializado com sucesso!');
}); 