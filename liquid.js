
const c = document.getElementById("liquid");
const ctx2 = c.getContext("2d");
let w2, h2, t = 0;
function resizeLiquid() {
  w2 = c.width = window.innerWidth;
  h2 = c.height = window.innerHeight;
}
resizeLiquid();
window.addEventListener("resize", resizeLiquid);

function animateLiquid() {
  t += 0.01;
  const grd = ctx2.createLinearGradient(0, 0, w2, h2);
  grd.addColorStop(0, `hsl(${t * 40 % 360}, 70%, 60%)`);
  grd.addColorStop(1, `hsl(${(t * 40 + 120) % 360}, 70%, 60%)`);
  ctx2.fillStyle = grd;
  ctx2.fillRect(0, 0, w2, h2);
  ctx2.globalAlpha = 0.4;
  ctx2.beginPath();
  for (let i = 0; i < w2; i += 20) {
    const y = h2/2 + Math.sin(i * 0.01 + t) * 100;
    ctx2.lineTo(i, y);
  }
  ctx2.strokeStyle = "rgba(255,255,255,0.4)";
  ctx2.lineWidth = 2;
  ctx2.stroke();
  requestAnimationFrame(animateLiquid);
}
animateLiquid();
