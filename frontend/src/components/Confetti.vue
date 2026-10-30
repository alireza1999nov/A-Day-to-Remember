<template>
  <canvas ref="canvas" class="confetti-canvas"></canvas>
</template>

<script setup>
import { ref } from 'vue'

const canvas = ref(null)

function launch() {
  const c = canvas.value
  if (!c) return

  const ctx = c.getContext('2d')
  c.width = window.innerWidth
  c.height = window.innerHeight

  const pieces = []
  const colors = ['#e88a9c', '#d4788a', '#f8c8d4', '#e6d5f2', '#f5e6c8', '#ff9eb5', '#c97b84']
  const shapes = ['♥', '✦', '●', '◆']

  for (let i = 0; i < 75; i++) {
    pieces.push({
      x: Math.random() * c.width,
      y: -20 - Math.random() * 80,
      size: 8 + Math.random() * 11,
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      speedY: 2.2 + Math.random() * 3.8,
      speedX: (Math.random() - 0.5) * 2.8,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 7,
      opacity: 1
    })
  }

  let frame = 0
  function animate() {
    ctx.clearRect(0, 0, c.width, c.height)
    frame++
    let alive = false

    pieces.forEach(p => {
      if (p.opacity <= 0) return
      alive = true
      p.y += p.speedY
      p.x += p.speedX
      p.rotation += p.rotSpeed
      if (p.y > c.height * 0.72) p.opacity -= 0.014

      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate((p.rotation * Math.PI) / 180)
      ctx.globalAlpha = Math.max(0, p.opacity)
      ctx.fillStyle = p.color
      ctx.font = `${p.size}px serif`
      ctx.textAlign = 'center'
      ctx.fillText(p.shape, 0, 0)
      ctx.restore()
    })

    if (alive && frame < 170) requestAnimationFrame(animate)
    else ctx.clearRect(0, 0, c.width, c.height)
  }

  animate()
}

defineExpose({ launch })
</script>

<style scoped>
.confetti-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
}
</style>
