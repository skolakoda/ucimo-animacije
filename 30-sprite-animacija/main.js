window.onload = function() {
  let frejm = 1
  const ukupnoSlicica = 15
  const visinaSlicice = 102
  const element = document.getElementById('animation')
  setInterval(() => {
    const y = (++frejm % ukupnoSlicica) * -visinaSlicice
    element.style.backgroundPosition = '0px ' + y + 'px'
  }, 100)
}
