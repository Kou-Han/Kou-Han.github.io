// 动态高度适配（增强方案）
    window.addEventListener('DOMContentLoaded', () => {
      const nav = document.querySelector('.genshin-nav');
      const placeholder = document.querySelector('.nav-placeholder');
      
      // 获取实际渲染高度
      const updateNavHeight = () => {
        const height = nav.offsetHeight;
        document.documentElement.style.setProperty('--nav-height', `${height}px`);
        placeholder.style.height = `${height}px`;
      };

      // 初始化计算
      updateNavHeight();
      
      // 响应窗口变化
      window.addEventListener('resize', updateNavHeight);
    });