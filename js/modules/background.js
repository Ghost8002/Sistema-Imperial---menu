export class Background {
  constructor() {
    this.circles = document.querySelectorAll('.circle');
    this.mouseX = 0;
    this.mouseY = 0;
    
    // Cria o elemento de brilho do cursor
    this.cursorGlow = document.createElement('div');
    this.cursorGlow.className = 'cursor-glow';
    document.body.appendChild(this.cursorGlow);
    
    // Posições iniciais dos círculos
    this.initialPositions = Array.from(this.circles).map(circle => {
      const rect = circle.getBoundingClientRect();
      return {
        x: rect.left,
        y: rect.top
      };
    });
    
    this.init();
  }

  init() {
    // Adiciona o evento de movimento do mouse
    document.addEventListener('mousemove', (e) => {
      this.mouseX = e.clientX;
      this.mouseY = e.clientY;
      
      // Atualiza a posição do brilho do cursor
      this.cursorGlow.style.left = `${this.mouseX}px`;
      this.cursorGlow.style.top = `${this.mouseY}px`;
      
      this.updateCircles();
    });

    // Adiciona o evento de redimensionamento da janela
    window.addEventListener('resize', () => {
      this.initialPositions = Array.from(this.circles).map(circle => {
        const rect = circle.getBoundingClientRect();
        return {
          x: rect.left,
          y: rect.top
        };
      });
    });
  }

  updateCircles() {
    this.circles.forEach((circle, index) => {
      // Calcula a distância do mouse em relação ao centro da tela
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calcula o deslocamento do mouse em relação ao centro
      const deltaX = (this.mouseX - centerX) * 0.1; // Aumentado para 0.1 para movimento mais visível
      const deltaY = (this.mouseY - centerY) * 0.1;
      
      // Aplica um efeito de "lag" diferente para cada círculo
      const lag = 0.15 + (index * 0.1); // Aumentado para movimento mais visível
      
      // Calcula a nova posição
      const newX = this.initialPositions[index].x + (deltaX * lag);
      const newY = this.initialPositions[index].y + (deltaY * lag);
      
      // Aplica a transformação
      circle.style.transform = `translate(${newX}px, ${newY}px)`;
    });
  }
} 