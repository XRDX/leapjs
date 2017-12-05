import { ctx } from './canvas'
import { clickShapes } from './util'
import { Mouse } from './mouse'
import { Transform } from './transform'
import { Rss } from './resource'
import { collide, pointInShape } from './collision'
const clone = require('clone')

class Shape {
  constructor () {
    this.transform = new Transform()
    this._points = []
    this.globalAlpha = 1
  }

  stroke () {
    if (this.click) clickShapes.add(this) // use for handle click event

    ctx.save()
    ctx.update(this)
    ctx.beginPath()

    this._draw()
    ctx.stroke()

    ctx.closePath()
    ctx.restore()
  }

  fill () {
    if (this.click) clickShapes.add(this) // use for handle click event

    ctx.save()
    ctx.update(this)
    ctx.beginPath()

    this._draw()
    ctx.fill()

    ctx.closePath()
    ctx.restore()
  }

  _draw () {}
  draw () {
    if (this.click) clickShapes.add(this) // use for handle click event

    ctx.save()
    ctx.update(this)
    ctx.beginPath()

    this._draw()
    ctx.fill()
    ctx.stroke()

    ctx.closePath()
    ctx.restore()
  }

  translate (x, y) { this.transform.translate(x, y) }
  scale (x, y) { this.transform.scale(x, y) }
  skew (x, y) { this.transform.skew(x, y) }
  setAnchor (x, y) { this.transform.setAnchor(x, y) }
  rotate (degree) { this.transform.rotate(degree) }

  getRealPoint (p) { return this.transform.getRealPoint(p) }

  click () {}
  touched () { return pointInShape(Mouse, this) }

  collide (other) {
    if (other instanceof Shape) {
      return collide(this, other)
    } else {
      return false
    }
  }

  clone () { return clone(this, false) }

  _updatePoints () {}

  get points () {
    this._updatePoints()
    return this._points.map(p => this.transform.getRealPoint(p))
  }

  setLineDash ( arr ) {
    this.lineDash = arr
  }
}

class Circle extends Shape {
  constructor (x = 50, y = 50, r = 20) {
    super()
    this.x = x
    this.y = y
    this.r = r
  }
}

Circle.prototype._draw = function () {
  ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
}

Circle.prototype._updatePoints = function () {
  this._points = []
  let n = 8
  let degree = Math.PI * 2 / n
  for (let i = 0; i < n; i++) {
    this._points.push({
      x: this.x + this.r * Math.sin(degree * i),
      y: this.y + this.r * Math.cos(degree * i)
    })
  }
}

class Line extends Shape {
  constructor (x1, y1, x2, y2) {
    super()
    this.x1 = x1
    this.y1 = y1
    this.x2 = x2
    this.y2 = y2
  }
}

Line.prototype._draw = function () {
  ctx.moveTo(this.x1, this.y1)
  ctx.lineTo(this.x2, this.y2)
}

Line.prototype._updatePoints = function () {
  this._points = []
  this._points.push({x: this.x1, y: this.y1})
  this._points.push({x: this.x2, y: this.y2})
}

class Polygon extends Shape {
  constructor () {
    super()
    if (arguments.length < 6) {
      throw String('Polygon should have at lease 3 points')
    }

    this._points = []
    for (let i = 0; i < arguments.length - 1; i += 2) {
      let p = { x: arguments[i], y: arguments[i + 1] }
      this._points.push(p)
    }
  }
}

Polygon.prototype._draw = function () {
  let p = this._points[0]
  ctx.moveTo(p.x, p.y)
  for (let i = 1; i < this._points.length; i++) {
    p = this._points[i]
    ctx.lineTo(p.x, p.y)
  }
}

class Rectangle extends Shape {
  constructor (x, y, w, h) {
    super()
    this.x = x
    this.y = y
    this.width = w
    this.height = h
    this.collideW = 1
    this.collideH = 1
  }
}

Rectangle.prototype._draw = function () {
  ctx.rect(this.x, this.y, this.width, this.height)
}

Rectangle.prototype.setCollisionScale = function (w, h) {
  this.collideW = w
  this.collideH = h
}

Rectangle.prototype._updatePoints = function () {
  this._points = []

  let minX = this.x + this.width / 2 * (1 - this.collideW)
  let maxX = this.x + this.width / 2 * (1 + this.collideW)
  let minY = this.y + this.height / 2 * (1 - this.collideH)
  let maxY = this.y + this.height / 2 * (1 + this.collideH)

  this._points.push({x: minX, y: minY})
  this._points.push({x: minX, y: maxY})
  this._points.push({x: maxX, y: maxY})
  this._points.push({x: maxX, y: minY})
}

class Text extends Rectangle {
  constructor (src = '', x = 0, y = 0, size=20, font = 'Arial') {
    super(x, y, 1, size)
    this._src = src
    this.height = size
    this._font = font
    this.fillStyle = "orange"
    this._updateWidth()
  }

  _updateWidth () {
    ctx.save()
    ctx.font = this.height + 'px ' + this._font
    this.width = ctx.measureText(this._src).width
    ctx.restore() 
  }

  get src () { return this._src }
  set src (src) {
    this._src = src
    this._updateWidth()
  }

  get size () { return this.height }
  set size (size) {
    this.height = size
    this._updateWidth()
  }

  get font () { return this._font }
  set font ( font ) {
    this._font = font
    this._updateWidth()
  }

  stroke () {
    if (this.click) clickShapes.add(this)
    ctx.save()
    ctx.update(this)
    ctx.font = this.size + 'px ' + this.font

    ctx.strokeText(this.src, this.x, this.y+this.height)

    ctx.restore()
  }

  fill () {
    if (this.click) clickShapes.add(this)
    ctx.save()
    ctx.update(this)

    ctx.font = this.size + 'px ' + this.font

    ctx.fillText(this.src, this.x, this.y+this.height)

    ctx.restore()
  }

  draw () {
    this.fill()
  }
}

class Sprite extends Rectangle {
  constructor (src, x, y, w, h) {
    super(x, y, w, h)
    this.collideW = 0.8
    this.collideH = 0.8

    this.img = new window.Image()
    this.img.crossOrigin = 'anonymous'
    this.img.src = src
    this.img.onload = function () {
      Rss.load()
    }

    Rss.add()
  }

  get src () { return this.img.src }
  set src (src) { this.img.src = src }

  set onload (callback) {
    this.img.onload = function () {
      Rss.load()
      callback()
    }
  }
}

Sprite.prototype.clip = function (sx, sy, sw, sh) {
  this.sx = sx > 0 ? sx : 1
  this.sy = sy > 0 ? sx : 1
  this.swidth = sw
  this.sheight = sh
  this.width = this.width || sw
  this.height = this.height || sh
}

Sprite.prototype._draw = function () {
  if (this.sx && this.sy && this.swidth & this.sheight) {
    ctx.drawImage(this.img, this.sx, this.sy, this.swidth, this.sheight,
      this.x, this.y, this.width, this.height)
  } else if (this.width && this.height) { ctx.drawImage(this.img, this.x, this.y, this.width, this.height) } else { ctx.drawImage(this.img, this.x, this.y) }
}

Sprite.prototype.fill = null
Sprite.prototype.stroke = null

class Animation extends Sprite {
  constructor (src, x, y, w, h) {
    super(src, x, y, w, h)
    this.speed = 10
  }
}

Animation.prototype.setFrame = function (sx, sy, sw, sh, c, r) {
  this.c = c
  this.r = r || 1
  this.cf = 0 // current frame count
  this.clip(sx, sy, sw, sh)
}

Animation.prototype.setSpeed = function (speed) {
  this.speed = speed
  if (this.speed < 1) this.speed = 1
  if (this.speed > 60) this.speed = 60
}

Animation.prototype._draw = function () {
  let sx = this.sx + this.swidth * (Math.floor(this.cf * this.speed / 60) % this.c)
  let sy = this.sy + this.sheight * (Math.floor(this.cf * this.speed / 60 / this.c) % this.r)
  ctx.drawImage(this.img, sx, sy, this.swidth, this.sheight,
    this.x, this.y, this.width, this.height)

  this.cf++ // update frame count
}

class Point extends Circle {
  constructor (x, y) {
    super(x, y, 2)
    this.fillStyle = 'red'
  }
}

class Ellipse extends Shape {
  constructor (x, y, rX, rY) {
    super ()
    this.x = x;
    this.y = y;
    this.rX = rX;
    this.rY = rY;
  }
  
  _draw () {
    ctx.ellipse(this.x, this.y, this.rX, this.rY, 0, 0, Math.PI * 2)
  }

 _updatePoints () {
    this._points = []
    let n = 8
    let degree = Math.PI * 2 / n
    for (let i = 0; i < n; i++) {
    this._points.push({
      x: this.x + this.rX * Math.sin(degree * i), // ? to be confirmed
      y: this.y + this.rY * Math.cos(degree * i)  // ? to be confirmed
      })
    }
  }
}

Point.prototype.draw = Point.prototype.fill
const Triangle = Polygon

export { Shape, Line, Rectangle, Polygon, Triangle, Circle, Point, Text, Sprite, Animation, Ellipse }
