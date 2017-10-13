/* global Crtac */

const crtac = new Crtac({
  minX: -16,
  minY: -12,
  maxX: 16,
  maxY: 12
})

crtac.crtajFunkciju(x => 5 * Math.sin(x), 'green', 3)

crtac.crtajFunkciju(x => x * x, 'blue', 3)

crtac.crtajFunkciju(x => 2 * x + 3, 'red', 3)
