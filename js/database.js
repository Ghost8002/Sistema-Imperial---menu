// Sistema de banco de dados local
class Database {
    constructor() {
        console.log('Inicializando banco de dados...');
        this.initializeDatabase();
    }

    initializeDatabase() {
        // Verifica se já existe um banco de dados
        if (!localStorage.getItem('users')) {
            console.log('Criando banco de dados inicial...');
            // Cria o banco de dados inicial com alguns usuários
            const initialUsers = {
                'adonai': {
                    password: 'a2d0o0n8ay',
                    role: 'admin'
                },
                'matheus': {
                    password: '123456',
                    role: 'user'
                }
            };
            localStorage.setItem('users', JSON.stringify(initialUsers));
            console.log('Banco de dados criado com sucesso!');
        } else {
            console.log('Banco de dados já existe!');
        }
    }

    validateUser(username, password) {
        console.log('Validando usuário:', username);
        const users = JSON.parse(localStorage.getItem('users'));
        const user = users[username];
        
        if (user && user.password === password) {
            console.log('Usuário validado com sucesso!');
            return {
                success: true,
                role: user.role
            };
        }
        
        console.log('Falha na validação do usuário');
        return {
            success: false,
            message: 'Usuário ou senha inválidos'
        };
    }

    addUser(username, password, role = 'user') {
        const users = JSON.parse(localStorage.getItem('users'));
        
        if (users[username]) {
            return {
                success: false,
                message: 'Usuário já existe'
            };
        }

        users[username] = {
            password,
            role
        };

        localStorage.setItem('users', JSON.stringify(users));
        
        return {
            success: true,
            message: 'Usuário criado com sucesso'
        };
    }
}

// Exporta a instância do banco de dados
console.log('Criando instância do banco de dados...');
window.database = new Database();
console.log('Banco de dados pronto para uso!'); 