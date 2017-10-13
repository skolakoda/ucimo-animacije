const canvas = document.getElementById('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const ctx = canvas.getContext('2d')

const stars = {}
let starIndex = 0
let numStars = 0
const acceleration = 1
const starsToDraw = (canvas.width * canvas.height) / 500

function Star() {
  this.X = canvas.width / 2
  this.Y = canvas.height / 2
  this.SX = Math.random() * 10 - 5
  this.SY = Math.random() * 10 - 5
  const start = canvas.width > canvas.height ? canvas.width : canvas.height
  this.X += this.SX * start / 10
  this.Y += this.SY * start / 10
  this.W = 1
  this.H = 1
  this.age = 0
  this.dies = 500
  starIndex++
  stars[starIndex] = this
  this.ID = starIndex
  this.C = '#ffffff'
}

Star.prototype.draw = function() {
  this.X += this.SX
  this.Y += this.SY
  this.SX += this.SX / (50 / acceleration)
  this.SY += this.SY / (50 / acceleration)
  this.age++
  if (this.age == Math.floor(50 / acceleration) | this.age == Math.floor(150 / acceleration) | this.age == Math.floor(300 / acceleration)) {
    this.W++
    this.H++
  }
  if (this.X + this.W < 0 | this.X > canvas.width |
    this.Y + this.H < 0 | this.Y > canvas.height) {
    delete stars[this.ID]
    numStars--
  }
  ctx.fillStyle = this.C
  ctx.fillRect(this.X, this.Y, this.W, this.H)
}

function draw() {
  // Play with the "a" value to create streams...it's fun!
  ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  for (let i = numStars; i < starsToDraw; i++) {
    new Star()
    numStars++
  }
  for (const star in stars) stars[star].draw()
}

setInterval(draw, 40)
