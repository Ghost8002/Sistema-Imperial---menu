export const fadeIn = (element, duration = 300) => {
  element.style.opacity = 0;
  element.style.display = 'block';

  let start = null;
  const animate = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.opacity = Math.min(progress / duration, 1);

    if (progress < duration) {
      window.requestAnimationFrame(animate);
    }
  };

  window.requestAnimationFrame(animate);
};

export const fadeOut = (element, duration = 300) => {
  let start = null;
  const animate = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    element.style.opacity = 1 - Math.min(progress / duration, 1);

    if (progress < duration) {
      window.requestAnimationFrame(animate);
    } else {
      element.style.display = 'none';
    }
  };

  window.requestAnimationFrame(animate);
};

export const slideIn = (element, direction = 'up', duration = 300) => {
  const directions = {
    up: 'translateY(20px)',
    down: 'translateY(-20px)',
    left: 'translateX(20px)',
    right: 'translateX(-20px)'
  };

  element.style.transform = directions[direction];
  element.style.opacity = 0;
  element.style.display = 'block';

  let start = null;
  const animate = (timestamp) => {
    if (!start) start = timestamp;
    const progress = timestamp - start;
    const percentage = Math.min(progress / duration, 1);

    element.style.transform = `translate(0, 0)`;
    element.style.opacity = percentage;

    if (progress < duration) {
      window.requestAnimationFrame(animate);
    }
  };

  window.requestAnimationFrame(animate);
}; 