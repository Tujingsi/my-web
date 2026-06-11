// 网格背景（与之前相同）
const canvas = document.getElementById('gridCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawGrid();
}

function drawGrid() {
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.strokeStyle = '#0ff';
    ctx.lineWidth = 0.8;
    const stepX = 50, stepY = 50;
    ctx.beginPath();
    for (let x = 0; x < w; x += stepX) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
    for (let y = 0; y < h; y += stepY) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
    ctx.stroke();
    ctx.fillStyle = '#f0f';
    for (let x = 0; x < w; x += stepX/2) {
        for (let y = 0; y < h; y += stepY/2) {
            if ((x+y) % 100 < 20) ctx.fillRect(x-1, y-1, 2, 2);
        }
    }
    const time = Date.now() / 300;
    for (let i = 0; i < 40; i++) {
        const tx = (time + i * 37) % w;
        const ty = (time * 0.7 + i * 83) % h;
        ctx.fillStyle = `rgba(0, 255, 255, ${0.3 + Math.sin(time + i) * 0.2})`;
        ctx.fillRect(tx-2, ty-2, 4, 4);
        ctx.fillStyle = `rgba(255, 0, 255, 0.5)`;
        ctx.fillRect(tx-1, ty-1, 2, 2);
    }
}

function animateGrid() {
    drawGrid();
    requestAnimationFrame(animateGrid);
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateGrid();

// 随机闪烁故障（背景白闪）
setInterval(() => {
    if (Math.random() > 0.85) {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,255,255,0.08);pointer-events:none;z-index:999';
        document.body.appendChild(overlay);
        setTimeout(() => overlay.remove(), 80);
    }
}, 3000);

// ========== 按钮：故障特效 + 跳转到个人简介页面 ==========
const viewBtn = document.getElementById('viewProfileBtn');
if (viewBtn) {
    viewBtn.addEventListener('click', () => {
        // 1. 禁用按钮，防止连点
        viewBtn.disabled = true;
        viewBtn.textContent = '⌇ 档案加载中... ⌇';
        
        // 2. 故障特效：主容器抖动
        const main = document.querySelector('.cyber-container');
        if (main) {
            main.style.transform = `translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
            setTimeout(() => main.style.transform = '', 200);
        }
        
        // 3. 扫描线变色
        const scan = document.querySelector('.scan-line');
        if (scan) {
            scan.style.background = `linear-gradient(to bottom, transparent 50%, rgba(255, 0, 255, 0.2) 50%)`;
            setTimeout(() => {
                scan.style.background = "linear-gradient(to bottom, transparent 50%, rgba(0, 255, 255, 0.03) 50%)";
            }, 200);
        }
        
        // 4. 标题文字故障
        const glitchH1 = document.querySelector('.glitch-text');
        if (glitchH1) {
            glitchH1.style.textShadow = `0.1em 0 0 rgba(255,0,0,0.8), -0.1em -0.05em 0 rgba(0,255,0,0.8)`;
            setTimeout(() => {
                glitchH1.style.textShadow = "0.05em 0 0 rgba(255, 0, 100, 0.75), -0.05em -0.025em 0 rgba(0, 255, 255, 0.75)";
            }, 200);
        }
        
        // 5. 白色闪屏
        const flash = document.createElement('div');
        flash.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(255,255,255,0.15);pointer-events:none;z-index:1000';
        document.body.appendChild(flash);
        setTimeout(() => flash.remove(), 100);
        
        // 6. 延迟后跳转到个人简介页面（profile.html）
        setTimeout(() => {
            window.location.href = 'profile.html';
        }, 400);
    });
}