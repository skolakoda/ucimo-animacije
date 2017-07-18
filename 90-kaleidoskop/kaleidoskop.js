const canvas_x = 0
const canvas_y = 0
const angle = Math.PI / 180 * 8
const limit1 = Math.PI * 1.5
const limit2 = Math.PI * 1.79
const c = new Array(6)
const d = new Array(6)
const fps = 10

let radius
let canvas_w = 0
let canvas_h = 0
let context
let x, y
let p_x, p_y
let a = 0
let b = 0
let r, e
let prv_x, prv_y, prv_x2, prv_y2
let timeout
let pause = false

/** FUNCTIONS **/

function get_screen_size() {
  const w = document.documentElement.clientWidth
  const h = document.documentElement.clientHeight
  return [w, h]
}

function draw_line(x, y, x1, y1, x2, y2) {
  context.beginPath()
  context.moveTo(x + x1, y + y1)
  context.lineTo(x + x2, y + y2)
  context.moveTo(x - x1, y + y1)
  context.lineTo(x - x2, y + y2)
  context.moveTo(x - x1, y - y1)
  context.lineTo(x - x2, y - y2)
  context.moveTo(x + x1, y - y1)
  context.lineTo(x + x2, y - y2)
  context.moveTo(x + y1, y + x1)
  context.lineTo(x + y2, y + x2)
  context.moveTo(x - y1, y + x1)
  context.lineTo(x - y2, y + x2)
  context.moveTo(x - y1, y - x1)
  context.lineTo(x - y2, y - x2)
  context.moveTo(x + y1, y - x1)
  context.lineTo(x + y2, y - x2)
  context.moveTo(x, y + x2)
  context.lineTo(x, y + x1)
  context.moveTo(x, y - x2)
  context.lineTo(x, y - x1)
  context.moveTo(x + x2, y)
  context.lineTo(x + x1, y)
  context.moveTo(x - x2, y)
  context.lineTo(x - x1, y)
  context.stroke()
  context.closePath()
}

function anim() {
  const cosA = Math.cos(a)
  const cosA2 = Math.cos(a * 2)
  const c3 = 16 * Math.cos(a * 10)
  const c1 = Math.floor(56 * Math.cos(a * angle * 4) + c3)
  const c2 = Math.floor(56 * Math.sin(a * angle * 4) - c3)
  prv_x = x
  prv_y = y
  if (b > limit1 && b < limit2) {
    r += radius * 0.02 * cosA2
    x = prv_x2 + r * cosA
    y = prv_y2 + r * Math.sin(a)
  } else {
    prv_x2 = x
    prv_y2 = y
    x = (radius * c[0]) * Math.cos(a * d[1]) + (radius * c[2]) * Math.sin(a * d[3]) + (radius * c[4]) * Math.sin(a * d[5])
    y = (radius * c[5]) * Math.sin(a * d[4]) + (radius * c[3]) * Math.cos(a * d[2]) + (radius * c[1]) * Math.cos(a * d[0])
  }

  context.lineCap = 'round'
  context.strokeStyle = 'rgba(' + (192 + c1) + ',' + (192 + c2) + ',' + (192 - c1) + ',' + (0.01 - 0.005 * -cosA2) + ')'
  context.lineWidth = e * 1.4 + e * 0.8 * cosA
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  context.lineWidth = e + e * 0.8 * cosA
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  context.strokeStyle = 'rgba(' + (192 + c1) + ',' + (192 + c2) + ',' + (192 - c1) + ',' + (0.06 - 0.03 * -cosA2) + ')'
  context.lineWidth = e * 0.6 + e * 0.35 * cosA
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  context.strokeStyle = 'rgba(0,0,0,0.06)'
  context.lineWidth = e * 0.4 + e * 0.225 * cosA
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  context.strokeStyle = 'rgba(' + (192 + c1) + ',' + (192 + c2) + ',' + (192 - c1) + ',' + (0.1 - 0.075 * -cosA2) + ')'
  context.lineWidth = e * 0.2 + e * 0.1 * cosA
  draw_line(p_x, p_y, prv_x, prv_y, x, y)
  context.strokeStyle = 'rgba(255,255,255,0.4)'
  context.lineWidth = e * (0.1 - 0.05 * -Math.cos(a * 4))
  draw_line(p_x, p_y, prv_x, prv_y, x, y)

  a += angle * Math.cos(b)
  b += angle * 0.1
  if (b > limit1) {
    context.fillStyle = 'rgba(0,0,0,0.08)'
    context.fillRect(0, 0, canvas_w, canvas_h)
  }
  if (b < limit2) timeout = setTimeout(anim, fps)
  else reset()
}

function reset() {
  clearTimeout(timeout)
  a = Math.random(0, 1) * angle
  b = Math.random(0, 1) * angle
  r = 0
  for (let i = 0; i < 6; i++) {
    c[i] = Math.random(0, 1) / 2
    d[i] = Math.random(0, 1) / 2
  }
  radius = Math.round((canvas_w + canvas_h) / 8)
  e = radius * 0.2 /* 0.15 */
  p_x = Math.round(canvas_w / 2)
  p_y = Math.round(canvas_h / 2)
  x = (radius * c[0]) * Math.cos(a * d[1]) + (radius * c[2]) * Math.sin(a * d[3]) + (radius * c[4]) * Math.sin(a * d[5])
  y = (radius * c[5]) * Math.sin(a * d[4]) + (radius * c[3]) * Math.cos(a * d[2]) + (radius * c[1]) * Math.cos(a * d[0])
  anim()
}

function resize() {
  canvas_w = get_screen_size()[0]
  canvas_h = get_screen_size()[1]
}

function init() {
  resize()
  const canvas = document.getElementById('canvas')
  canvas.style.position = 'absolute'
  canvas.style.left = canvas_x + 'px'
  canvas.style.top = canvas_y + 'px'
  canvas.width = canvas_w
  canvas.height = canvas_h
  context = canvas.getContext('2d')
  reset()
}

function key_manager(evt) {
  const key = evt.which || evt.keyCode
  switch (key) {
  case 27:
  case 13:
    pause = !pause
    if (pause) clearTimeout(timeout)
    else anim()
    break
  case 32:
    reset()
    break
  }
}

window.onload = window.onresize = window.onorientationchange = init
document.onkeypress = key_manager
