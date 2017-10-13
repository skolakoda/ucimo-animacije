const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// KONFIG

let width = 0
let height = 0
const mouse = {
  X: 0,
  Y: 0
}
const particules = []
const gouttes = []
const nombrebase = 5
const nombreb = 2

const controls = {
  rain: 2,
  alpha: 1,
  color: 200,
  opacity: 1,
  saturation: 100,
  lightness: 50,
  back: 100,
  red: 0,
  green: 0,
  blue: 0,
  speed: 2
}

// LISTENERS

window.onresize = function() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
}

window.onmousemove = function(event) {
  mouse.X = event.clientX
  mouse.Y = event.clientY
}

// FUNKCIJE

function rain(X, Y) {
  let nombre = nombreb
  while (nombre--) {
    particules.push({
      vitesseX: (Math.random() * 0.25),
      vitesseY: (Math.random() * 9) + 1,
      X,
      Y,
      alpha: 1,
      couleur: 'hsla(' + controls.color + ',' + controls.saturation + '%, ' + controls.lightness + '%,' + controls.opacity + ')',
    })
  }
}

function explosion(X, Y, couleur) {
  let nombre = nombrebase
  while (nombre--) {
    gouttes.push({
      vitesseX: (Math.random() * 4 - 2),
      vitesseY: (Math.random() * -4),
      X,
      Y,
      radius: 0.65 + Math.floor(Math.random() * 1.6),
      alpha: 1,
      couleur
    })
  }
}

function rendu(ctx) {
  ctx.save()
  ctx.fillStyle = 'rgba(' + controls.red + ',' + controls.green + ',' + controls.blue + ',' + controls.alpha + ')'
  ctx.fillRect(0, 0, width, height)

  const particuleslocales = particules
  const goutteslocales = gouttes
  const tau = Math.PI * 2

  for (let i = 0, particulesactives; particulesactives = particuleslocales[i]; i++) {
    ctx.globalAlpha = particulesactives.alpha
    ctx.fillStyle = particulesactives.couleur
    ctx.fillRect(particulesactives.X, particulesactives.Y, particulesactives.vitesseY / 4, particulesactives.vitesseY)
  }

  for (let i = 0, gouttesactives; gouttesactives = goutteslocales[i]; i++) {
    ctx.globalAlpha = gouttesactives.alpha
    ctx.fillStyle = gouttesactives.couleur
    ctx.beginPath()
    ctx.arc(gouttesactives.X, gouttesactives.Y, gouttesactives.radius, 0, tau)
    ctx.fill()
  }
  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2

  ctx.restore()
} // rendu

function update() {
  const particuleslocales = particules
  const goutteslocales = gouttes

  for (let i = 0, particulesactives; particulesactives = particuleslocales[i]; i++) {
    particulesactives.X += particulesactives.vitesseX
    particulesactives.Y += particulesactives.vitesseY + 5
    if (particulesactives.Y > height - 15) {
      particuleslocales.splice(i--, 1)
      explosion(particulesactives.X, particulesactives.Y, particulesactives.couleur)
    }
  }

  for (let i = 0, gouttesactives; gouttesactives = goutteslocales[i]; i++) {
    gouttesactives.X += gouttesactives.vitesseX
    gouttesactives.Y += gouttesactives.vitesseY
    gouttesactives.radius -= 0.075
    if (gouttesactives.alpha > 0) {
      gouttesactives.alpha -= 0.005
    } else {
      gouttesactives.alpha = 0
    }
    if (gouttesactives.radius < 0) {
      goutteslocales.splice(i--, 1)
    }
  }

  let i = controls.rain
  while (i--) {
    rain(Math.floor((Math.random() * width)), -15)
  }
}

// INIT

window.onresize()

;(function boucle() {
  requestAnimationFrame(boucle)
  update()
  rendu(ctx)
})()
