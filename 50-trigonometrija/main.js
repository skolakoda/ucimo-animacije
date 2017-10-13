
let canvas
let context
let obrniBoju = false
const prvaBoja = 'rgb(200,200,20)'
const drugaBoja = 'rgb(20,20,200)'
const modifikatorVremena = 0.002

function init() {
  canvas = document.createElement('canvas')
  canvas.width = 800
  canvas.height = 800
  context = canvas.getContext('2d')
  document.body.appendChild(canvas)
}

function crtaj() {
  const time = new Date().getTime() * modifikatorVremena
  console.log(time)
  const x = Math.sin(time) * 192 + 256
  const y = Math.cos(time * 0.9) * 192 + 256
  obrniBoju = !obrniBoju

  context.fillStyle = obrniBoju ? prvaBoja : drugaBoja
  context.beginPath()
  context.arc(x, y, 10, 0, Math.PI * 2, true)
  context.closePath()
  context.fill()
}

function update() {
  requestAnimationFrame(update)
  crtaj()
}

init()
update()
