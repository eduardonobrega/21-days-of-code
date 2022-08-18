let ball = document.getElementById('ball');
export const themer = {
  dark() {
    document.body.style.backgroundColor = 'var(--dark)';
    localStorage.setItem('themer', 'dark');
    ball.classList.add('dark');
  },
  ligth() {
    document.body.style.backgroundColor = 'var(--light)';
    localStorage.setItem('themer', 'ligth');
    ball.classList.remove('dark');
  },
};
