import { slideIn } from '../utils/animations.js';

export class Menu {
  constructor() {
    this.menuButtons = document.querySelectorAll('.menu-button');
    this.init();
  }

  init() {
    this.addHoverEffects();
    this.addClickEffects();
    this.animateOnLoad();
  }

  addHoverEffects() {
    this.menuButtons.forEach(button => {
      button.addEventListener('mouseenter', () => {
        const icon = button.querySelector('i');
        icon.style.transform = 'scale(1.1) rotate(5deg)';
      });

      button.addEventListener('mouseleave', () => {
        const icon = button.querySelector('i');
        icon.style.transform = 'scale(1) rotate(0deg)';
      });
    });
  }

  addClickEffects() {
    this.menuButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Efeito de ripple
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        button.appendChild(ripple);

        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;

        ripple.addEventListener('animationend', () => {
          ripple.remove();
        });
      });
    });
  }

  animateOnLoad() {
    this.menuButtons.forEach((button, index) => {
      setTimeout(() => {
        slideIn(button, 'up', 500);
      }, index * 100);
    });
  }
} 