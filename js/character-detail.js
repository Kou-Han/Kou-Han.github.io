document.addEventListener('DOMContentLoaded', () => {
    const voiceItems = document.querySelectorAll('.voice-item');
    let currentAudio = null;
    let hasUserInteracted = false;

    // 用户首次交互
    document.addEventListener('click', () => {
        hasUserInteracted = true;
    }, { once: true });

    voiceItems.forEach(item => {
        const audio = item.querySelector('audio');
        const button = item.querySelector('.play-btn');

        // 点击整个 voice-item 区域
        item.addEventListener('click', () => {
            if (!hasUserInteracted) {
                alert('请先点击页面任意位置激活音频权限');
                return;
            }

            // 如果当前点击的是正在播放的音频，切换暂停
            if (currentAudio === audio && !audio.paused) {
                audio.pause();
                button.classList.remove('playing');
                currentAudio = null;
                return;
            }

            // 暂停其他音频
            if (currentAudio && currentAudio !== audio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                document.querySelector('.play-btn.playing')?.classList.remove('playing');
            }

            // 播放当前音频
            audio
                .play()
                .then(() => {
                    button.classList.add('playing');
                    currentAudio = audio;
                })
                .catch(err => {
                    if (err.name === 'NotAllowedError') {
                        audio.muted = true;
                        audio.play().finally(() => {
                            audio.muted = false;
                            alert('浏览器阻止了音频播放，请点击播放按钮解除静音');
                        });
                    }
                });
        });

        // 防止按钮点击事件冒泡
        button.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // 音频播放结束时重置状态
        audio.addEventListener('ended', () => {
            button.classList.remove('playing');
            currentAudio = null;
        });
    });
});