// 修改筛选逻辑
document.querySelectorAll('.element-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // 移除所有激活状态
        document.querySelectorAll('.element-btn').forEach(b => 
            b.classList.remove('active'));
        
        // 设置当前激活
        this.classList.add('active');
        
        // 获取筛选元素
        const filter = this.dataset.element;
        const container = document.querySelector('.character-grid');
        
        // 优化筛选逻辑
        const cards = Array.from(container.children);
        
        // 先隐藏所有元素
        cards.forEach(card => card.style.display = 'none');
        
        // 使用requestAnimationFrame优化渲染
        requestAnimationFrame(() => {
            // 显示符合条件的元素
            cards.forEach(card => {
                if(filter === 'all' || card.querySelector('.character-card').dataset.element === filter) {
                    card.style.display = 'block';
                }
            });
            
            // 强制触发重排（关键步骤）
            void container.offsetHeight;
            
            // 重新排序元素（参考网页5）
            const visibleCards = cards.filter(card => card.style.display === 'block');
            visibleCards.forEach((card, index) => {
                container.appendChild(card); // 通过重新插入实现顺序重置
            });
        });
    });
});

// 平滑滚动
document.querySelector('.back-top').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// 模拟无限加载
let loading = false;
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
        loading = true;
        setTimeout(() => {
            // 模拟加载新数据
            console.log('Loading more characters...');
            loading = false;
        }, 1000);
    }
});