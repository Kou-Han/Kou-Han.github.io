/**
 * 首页交互逻辑
 * 功能：元素系统动画、时间轴交互
 */

const homeModule = (() => {
  // 元素卡片动画
  const initElementCards = () => {
    const cards = document.querySelectorAll('.element-card');
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.05)';
        card.querySelector('img').style.transform = 'rotate(15deg)';
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.querySelector('img').style.transform = '';
      });
    });
  };

  // 时间轴交互
  const initTimeline = () => {
    const eras = document.querySelectorAll('.era');
    eras.forEach(era => {
      era.addEventListener('click', () => {
        eras.forEach(e => e.classList.remove('active'));
        era.classList.add('active');
      });
    });
  };

  return {
    init: () => {
      initElementCards();
      initTimeline();
    }
  };
})();

document.addEventListener('DOMContentLoaded', homeModule.init);