const platno = document.getElementById('platno')
platno.width = window.innerWidth
platno.height = window.innerHeight
const sadrzaj = platno.getContext('2d')
sadrzaj.fillStyle = '#701206'

const PI = Math.PI
const centarX = window.innerWidth / 3
const centarX2 = (window.innerWidth / 3) * 2
const centarY = window.innerHeight / 2
const duzinaKraka = 130
const poluprecnikKruzica = 5

for (let i = 0; i < 2 * PI; i += PI / 10) {
  const x = Math.sin(i) * duzinaKraka
  const y = Math.cos(i) * duzinaKraka
  // crta krake
  sadrzaj.beginPath()
  sadrzaj.moveTo(centarX, centarY)
  sadrzaj.lineTo(centarX + x, centarY + y)
  sadrzaj.stroke()
  // crta kruzice
  sadrzaj.beginPath()
  sadrzaj.arc(centarX2 + x, centarY + y, poluprecnikKruzica, 0, 2 * PI)
  sadrzaj.fill()
}
