const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
const zupcanici = []

function Zupcanik(config) {
  this.x = config.x
  this.y = config.y
  this.spoljniRadius = config.spoljniRadius
  this.unutarRadius = config.unutarRadius
  this.sredRadius = config.sredRadius
  this.rupaRadius = config.rupaRadius
  this.brojZubaca = config.brojZubaca
  this.theta = config.theta
  this.thetaBrzina = config.thetaBrzina / 1000
  this.svetlaBoja = config.svetlaBoja
  this.tamnaBoja = config.tamnaBoja
  this.smerKazaljke = config.smerKazaljke
}

Zupcanik.prototype.crta = function() {
  ctx.save()
  const brojTacaka = this.brojZubaca * 2
  // crta zubce
  ctx.beginPath()
  ctx.lineJoin = 'bevel'
  for (let n = 0; n < brojTacaka; n++) {
    const poluprecnik = (n % 2 == 0) ? this.spoljniRadius : this.unutarRadius
    const theta = this.theta + ((Math.PI * 2) / brojTacaka) * (n + 1)
    const x = (poluprecnik * Math.sin(theta)) + this.x
    const y = (poluprecnik * Math.cos(theta)) + this.y
    if (n == 0) {
      ctx.moveTo(x, y)
    } else {
      ctx.lineTo(x, y)
    }
  }
  ctx.closePath()
  ctx.lineWidth = 5
  ctx.strokeStyle = this.tamnaBoja
  ctx.stroke()

  // crta telo zupcanika
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.sredRadius, 0, 2 * Math.PI, false)
  const grd = ctx.createLinearGradient(this.x - 100, this.y - 100, this.x + 100, this.y + 100)
  grd.addColorStop(0, this.svetlaBoja)
  grd.addColorStop(1, this.tamnaBoja)
  ctx.fillStyle = grd
  ctx.fill()
  ctx.lineWidth = 5
  ctx.strokeStyle = this.tamnaBoja
  ctx.stroke()

  // crta rupu
  ctx.beginPath()
  ctx.arc(this.x, this.y, this.rupaRadius, 0, 2 * Math.PI, false)
  ctx.fillStyle = 'white'
  ctx.fill()
  ctx.strokeStyle = this.tamnaBoja
  ctx.stroke()
  ctx.restore()
}

/** INIT **/

zupcanici.push(new Zupcanik({
  x: 120,
  y: 105,
  spoljniRadius: 90,
  unutarRadius: 50,
  sredRadius: 80,
  rupaRadius: 10,
  brojZubaca: 24,
  theta: 0,
  thetaBrzina: 1,
  svetlaBoja: '#B1CCFF',
  tamnaBoja: '#3959CC',
  smerKazaljke: false
}))

zupcanici.push(new Zupcanik({
  x: 222,
  y: 190,
  spoljniRadius: 50,
  unutarRadius: 15,
  sredRadius: 40,
  rupaRadius: 10,
  brojZubaca: 12,
  theta: 0.14,
  thetaBrzina: 2,
  svetlaBoja: '#FF9E9D',
  tamnaBoja: '#AD0825',
  smerKazaljke: true
}))

zupcanici.push(new Zupcanik({
  x: 272,
  y: 142,
  spoljniRadius: 28,
  unutarRadius: 5,
  sredRadius: 18,
  rupaRadius: 7,
  brojZubaca: 6,
  theta: 0.14,
  thetaBrzina: 4,
  svetlaBoja: '#FFDD87',
  tamnaBoja: '#D25D00',
  smerKazaljke: false
}))

zupcanici.push(new Zupcanik({
  x: 463,
  y: 144,
  spoljniRadius: 170,
  unutarRadius: 100,
  sredRadius: 160,
  rupaRadius: 10,
  brojZubaca: 48,
  theta: 0,
  thetaBrzina: 0.5,
  svetlaBoja: '#8AFF99',
  tamnaBoja: '#005C06',
  smerKazaljke: true
}))

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  zupcanici.map(zupcanik => {
    const smer = zupcanik.smerKazaljke ? -1 : 1
    zupcanik.theta += smer * zupcanik.thetaBrzina
    zupcanik.crta()
  })
  requestAnimationFrame(animate)
}

animate()
