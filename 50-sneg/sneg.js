const canvas = document.getElementById('canvas')
const platno = canvas.getContext('2d')

const shirina = window.innerWidth
const visina = window.innerHeight
canvas.width = shirina
canvas.height = visina
const max_pahulja = 25
const pahulje = []

let ugao = 0

for (let i = 0; i < max_pahulja; i++) {
  pahulje.push({
    x: Math.random() * shirina,
    y: Math.random() * visina,
    r: Math.random() * 4 + 1,
    d: Math.random() * max_pahulja // denzitet (gustina)
  })
}

function update() {
  ugao += 0.01
  for (let i = 0; i < max_pahulja; i++) {
    const pahulja = pahulje[i]
    // add 1 to cos to prevent negative values which will move flakes  upwards
    pahulja.y += Math.cos(ugao + pahulja.d) + 1 + pahulja.r / 2
    pahulja.x += Math.sin(ugao) * 2
    if (pahulja.x < shirina + 5 && pahulja.x > -5 && pahulja.y < visina) continue

    if (i % 3 === 0) {
      pahulja.x = Math.sin(ugao) > 0 ? -5 : shirina + 5
      pahulja.y = Math.random() * visina
    } else {
      pahulja.x = Math.random() * shirina
      pahulja.y = -10
    }
  }
}

function render() {
  platno.clearRect(0, 0, shirina, visina)
  platno.fillStyle = 'rgba(255, 255, 255, 0.8)'
  platno.beginPath()
  for (let i = 0; i < max_pahulja; i++) {
    const pahulja = pahulje[i]
    platno.moveTo(pahulja.x, pahulja.y)
    platno.arc(pahulja.x, pahulja.y, pahulja.r, 0, Math.PI * 2, true)
  }
  platno.fill()
}

function loop() {
  window.requestAnimationFrame(loop)
  update()
  render()
}

loop()
