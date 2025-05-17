// 动态计算导航栏高度（可选）
    window.addEventListener('DOMContentLoaded', () => {
      const nav = document.querySelector('.genshin-nav');
      const placeholder = document.querySelector('.nav-placeholder');
      const navHeight = nav.offsetHeight;
      
      document.documentElement.style.setProperty('--nav-height', `${navHeight}px`);
      placeholder.style.height = `${navHeight}px`;
    });
    function checkUsernameAvailability(value) {
      const feedback = document.getElementById("usernameFeedback");
      if (value.length < 4) {
        feedback.textContent = "用户名至少4个字符";
        feedback.className = "invalid-feedback";
        return;
      }
      setTimeout(() => {
        const isAvailable = Math.random() > 0.5;
        feedback.textContent = isAvailable ? "✓ 用户名可用" : "⚠ 用户名已存在";
        feedback.className = isAvailable ? "valid-feedback" : "invalid-feedback";
      }, 400);
    }

    function checkPasswordStrength(value) {
      const strengthBar = document.getElementById("strengthBar");
      const hint = document.getElementById("passwordHint");
      let strength = 0;
      if (value.length >= 8) strength++;
      if (/[A-Z]/.test(value)) strength++;
      if (/[0-9]/.test(value)) strength++;
      if (/[^A-Za-z0-9]/.test(value)) strength++;

      const messages = ["极弱", "弱", "中", "强", "极强"];
      hint.textContent = `密码强度：${messages[strength]}`;

      strengthBar.className = "strength-progress " +
        (strength < 2 ? "strength-weak" :
        strength < 3 ? "strength-medium" : "strength-strong");

      strengthBar.style.width = `${(strength / 4) * 100}%`;
    }

    function validateEmailFormat(input) {
      const feedback = document.getElementById("emailFeedback");
      const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (pattern.test(input.value)) {
        feedback.textContent = "";
        input.style.borderColor = "";
      } else {
        feedback.textContent = "⚠ 邮箱格式不正确";
        input.style.borderColor = "var(--error)";
      }
    }

    let isVerified = false;
    const slider = document.getElementById("slider");
    slider.addEventListener("mousedown", startDrag);

    function startDrag(e) {
      document.addEventListener("mousemove", onDrag);
      document.addEventListener("mouseup", stopDrag);
    }

    function onDrag(e) {
      const track = slider.parentElement;
      const trackWidth = track.offsetWidth;
      const offset = e.clientX - track.getBoundingClientRect().left;
      const max = trackWidth - 40;
      const newLeft = Math.max(0, Math.min(offset, max));
      slider.style.left = newLeft + "px";
      isVerified = newLeft > max * 0.8;
    }

    function stopDrag() {
      document.removeEventListener("mousemove", onDrag);
      slider.style.transition = "left 0.3s";
      slider.style.left = isVerified ? "calc(100% - 40px)" : "0";
      setTimeout(() => (slider.style.transition = ""), 300);
    }