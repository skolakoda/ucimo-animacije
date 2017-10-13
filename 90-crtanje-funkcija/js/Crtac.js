/* global platno, podloga */
const velicinaPodeoka = 20

class Crtac {
  constructor(param) {
    this.minX = param.minX
    this.minY = param.minY
    this.maxX = param.maxX
    this.maxY = param.maxY
    this.rasponX = this.maxX - this.minX
    this.rasponY = this.maxY - this.minY
    this.jedinicaX = platno.width / this.rasponX
    this.jedinicaY = platno.height / this.rasponY
    this.centarY = Math.round(Math.abs(this.minY / this.rasponY) * platno.height)
    this.centarX = Math.round(Math.abs(this.minX / this.rasponX) * platno.width)

    podloga.strokeStyle = '#aaa'
    this.crtajHorizontalu()
    this.crtajVertikalu()
  }

  crtajHorizontalu() {
    podloga.textAlign = 'center'
    podloga.textBaseline = 'top'

    podloga.beginPath()
    podloga.moveTo(0, this.centarY)
    podloga.lineTo(platno.width, this.centarY)
    let broj = platno.width / this.jedinicaX / 2
    for (let xPoz = platno.width; xPoz > 0; xPoz -= this.jedinicaX) {
      podloga.moveTo(xPoz, this.centarY - velicinaPodeoka / 2)
      podloga.lineTo(xPoz, this.centarY + velicinaPodeoka / 2)
      podloga.stroke()
      podloga.fillText(broj, xPoz, this.centarY + velicinaPodeoka / 2 + 3)
      broj--
    }
  }

  crtajVertikalu() {
    podloga.textAlign = 'right'
    podloga.textBaseline = 'middle'

    podloga.beginPath()
    podloga.moveTo(this.centarX, 0)
    podloga.lineTo(this.centarX, platno.height)
    let broj = -platno.height / this.jedinicaY / 2
    for (let yPoz = platno.height; yPoz > 0; yPoz -= this.jedinicaY) {
      podloga.moveTo(this.centarX - velicinaPodeoka / 2, yPoz)
      podloga.lineTo(this.centarX + velicinaPodeoka / 2, yPoz)
      podloga.stroke()
      podloga.fillText(broj, this.centarX - velicinaPodeoka / 2 - 3, yPoz)
      broj ++
    }
  }

  crtajFunkciju(fun, boja, debljina) {
    podloga.lineWidth = debljina
    podloga.strokeStyle = boja

    podloga.save()
    podloga.translate(this.centarX, this.centarY)
    podloga.scale(platno.width / this.rasponX, -platno.height / this.rasponY)
    podloga.beginPath()
    podloga.moveTo(this.minX, fun(this.minX))
    const razmak = (this.maxX - this.minX) / 1000
    for (let x = this.minX + razmak; x <= this.maxX; x += razmak)
      podloga.lineTo(x, fun(x))
    podloga.restore()
    podloga.stroke()
    podloga.restore()
  }
}
