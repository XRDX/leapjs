!function(t){function i(o){if(e[o])return e[o].exports;var n=e[o]={i:o,l:!1,exports:{}};return t[o].call(n.exports,n,n.exports,i),n.l=!0,n.exports}var e={};i.m=t,i.c=e,i.d=function(t,e,o){i.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:o})},i.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return i.d(e,"a",e),e},i.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},i.p="",i(i.s=4)}([function(t,i){var e=document.createElement("canvas"),o=document.createElement("p");document.body.appendChild(e),document.body.appendChild(o),e.width=400,e.height=600,e.style="border: 1px solid #d3d3d3;";var n=e.getContext("2d");e.clear=function(){n.clearRect(0,0,e.width,e.height)},t.exports={canvas:e,ctx:n,p:o}},function(t,i,e){function o(){this.transform=new w,this.strokeStyle="#00FFFF",this.fillStyle="rgba(0, 255, 255, 0.4)",this.globalAlpha=1,this.lineWidth=1,y.push(this)}function n(t,i,e){o.call(this),this.x=t,this.y=i,this.r=e}function s(t,i,e,n){o.call(this),this.x1=t,this.y1=i,this.x2=e,this.y2=n}function h(){if(o.call(this),arguments.length<6)throw"Polygon should have at lease 3 points";this.points=[];for(var t=0;t<arguments.length-1;t+=2){var i={x:arguments[t],y:arguments[t+1]};this.points.push(i)}}function r(t,i,e,o,n,s){h.call(this,t,i,e,o,n,s)}function a(t,i,e,n){o.call(this),this.x=t,this.y=i,this.width=e,this.height=n}function c(t,i,e,n){o.call(this),this.src=t,this.x=i||0,this.y=e||20,this.font=n||"20px Arial",this.fillStyle="orange"}function l(t,i,e,n,s){o.call(this),this.img=new Image,this.img.src=t,this.x=i||0,this.y=e||0,this.width=n,this.height=s}function p(t,i,e,o,n){l.call(this,t,i,e,o,n),this.speed=1}function u(t,i){n.call(this,t,i,2),this.fillStyle="red"}var d=e(0).ctx,f=e(6).inheritPrototype,w=e(7).Transform,y=[];o.prototype._draw=null,o.prototype.click=null,o.prototype.updateCtx=function(t){t.globalAlpha=this.globalAlpha,t.strokeStyle=this.strokeStyle,t.fillStyle=this.fillStyle,t.lineWidth=this.lineWidth,this.transform.updateCtx(t)},o.prototype.stroke=function(t){t=t||d,t.save(),this.updateCtx(t),t.beginPath(),this._draw(t),t.closePath(),t.stroke(),t.restore()},o.prototype.fill=function(t){t=t||d,t.save(),this.updateCtx(t),t.beginPath(),this._draw(t),t.fill(),t.closePath(),t.restore()},o.prototype.draw=function(t){t=t||d,t.save(),this.updateCtx(t),t.beginPath(),this._draw(t),t.closePath(),t.stroke(),t.fill(),t.restore()},o.prototype.translate=function(t,i){this.transform.translate(t,i)},o.prototype.scale=function(t,i){this.transform.scale(t,i)},o.prototype.skew=function(t,i){this.transform.skew(t,i)},o.prototype.rotate=function(t){this.transform.rotate(t)},f(n,o),n.prototype._draw=function(t){t.arc(this.x,this.y,this.r,0,2*Math.PI)},f(s,o),s.prototype._draw=function(t){t.moveTo(this.x1,this.y1),t.lineTo(this.x2,this.y2)},f(h,o),h.prototype._draw=function(t){var i=this.points[0];t.moveTo(i.x,i.y);for(var e=1;e<this.points.length;e++)i=this.points[e],t.lineTo(i.x,i.y)},f(r,h),f(a,o),a.prototype._draw=function(t){t.rect(this.x,this.y,this.width,this.height)},f(c,o),c.prototype.stroke=function(t){t=t||d,t.save(),this.updateCtx(t),t.font=this.font,t.strokeText(this.src,this.x,this.y),t.restore()},c.prototype.fill=function(t){t=t||d,t.save(),this.updateCtx(t),t.font=this.font,t.fillText(this.src,this.x,this.y),t.restore()},c.prototype.draw=c.prototype.fill,f(l,o),l.prototype.cut=function(t,i,e,o){this.sx=t>0?t:1,this.sy=i>0?t:1,this.swidth=e,this.sheight=o,this.width=this.width||this.swidth,this.height=this.height||this.sheight},l.prototype._draw=function(t){this.sx&&this.sy&&this.swidth&this.sheight?t.drawImage(this.img,this.sx,this.sy,this.swidth,this.sheight,this.x,this.y,this.width,this.height):this.width&&this.height?t.drawImage(this.img,this.x,this.y,this.width,this.height):t.drawImage(this.img,this.x,this.y)},l.prototype.fill=null,l.prototype.stroke=null,f(p,l),p.prototype.setFrame=function(t,i,e,o,n,s){this.c=n,this.r=s||1,this.cf=0,this.cut(t,i,e,o)},p.prototype.setSpeed=function(t){this.speed=t>1?t:1},p.prototype._draw=function(t){var i=this.sx+this.swidth*(Math.floor(this.cf/this.speed)%this.c),e=this.sy+this.sheight*(Math.floor(this.cf/this.c/this.speed)%this.r);t.drawImage(this.img,i,e,this.swidth,this.sheight,this.x,this.y,this.width,this.height),t===d&&this.cf++},f(u,n),u.prototype.draw=u.prototype.fill,t.exports={shapeList:y,Shape:o,Line:s,Rectangle:a,Polygon:h,Triangle:r,Circle:n,Point:u,Text:c,Sprite:l,Animation:p}},function(t,i,e){function o(t,i,e){var o=t.getBoundingClientRect();return{x:i-o.left*(t.width/o.width),y:e-o.top*(t.height/o.height)}}function n(t){t.preventDefault(),t.touches&&(t=t.touches.item(0));var i=o(s,t.clientX,t.clientY);a.x=Math.floor(i.x),a.y=Math.floor(i.y),h.innerHTML=a.x+", "+a.y}var s=e(0).canvas,h=(e(3).Key,e(0).p),r=e(1).shapeList,a={x:0,y:0},c={};c.init=function(){c.x=a.x,c.y=a.y},s.onmousedown=function(t){n(t),a.down&&a.down(),r.map(function(t){t.click&&t.touched()&&t.click()})},s.ontouchstart=function(t){s.onmousedown(t),c.init()},s.onmousemove=function(t){n(t),a.move&&a.move()},s.ontouchmove=function(t){s.onmousemove(t),a.x-c.x>50&&Key.ArrowRight.down?(Key.ArrowRight.down(),c.init()):c.x-a.x>50&&Key.ArrowLeft.down&&(Key.ArrowLeft.down(),c.init()),c.y-a.y>50&&Key.ArrowUp.down?(Key.ArrowUp.down(),c.init()):a.y-c.y>50&&Key.ArrowDown.down&&(Key.ArrowDown.down(),c.init())},s.ontouchend=s.onmouseup=function(t){n(t),a.up&&a.up()},s.onclick=function(t){n(t),a.click&&a.click()},t.exports={Mouse:a,Touch:a}},function(t,i){for(var e={},o="abcdefghijklmnopqrstuvwxyz1234567890",n=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Enter","Escape"],s=0;s<o.length;s++)e[o[s]]={};for(s=0;s<n.length;s++)e[n[s]]={};document.onkeyup=function(t){var i=e[t.key];i&&i.up&&i.up()},document.onkeydown=function(t){var i=e[t.key];i&&i.down&&i.down()},document.onkeypress=function(t){var i=e[t.key];i&&i.press&&i.press()},t.exports={Key:e}},function(t,i,e){var o=e(0).canvas,n=e(0).ctx,s=(e(5),e(3).Key),h=e(2).Mouse,r=e(8).Music,a=e(1);window.canvas=o,window.ctx=n,window.Line=a.Line,window.Rectangle=a.Rectangle,window.Polygon=a.Polygon,window.Triangle=a.Triangle,window.Circle=a.Circle,window.Text=a.Text,window.Sprite=a.Sprite,window.Animation=a.Animation,window.Point=a.Point,window.Key=s,window.Mouse=h,window.Music=r},function(t,i,e){function o(t,i){l.clearRect(0,0,h.width,h.height),p.clearRect(0,0,h.width,h.height),t.draw(l),i.draw(p),l.save(),l.globalCompositeOperation="source-in",l.drawImage(p.canvas,0,0),l.restore();for(var e=l.getImageData(0,0,h.width,h.height),o=0;o<e.data.length/4-1;o++)if(0!=e.data[4*o+3])return new s.Point(o%h.width,o/h.width);return!1}function n(t,i){var e=t.x,o=t.y;return l.clearRect(e,o,1,1),i.draw(l),0!=l.getImageData(e,o,1,1).data[3]}var s=e(1),h=e(0).canvas,r=(e(0).ctx,e(2).Mouse),a=(s.Shape,document.createElement("canvas")),c=document.createElement("canvas");a.width=1e3,a.height=1e3,c.width=1e3,c.height=1e3;var l=a.getContext("2d"),p=c.getContext("2d");Object.prototype.collide=function(t){if(!this.draw||!t.draw)throw"LLEG: Object must have draw method";return o(this,t)},Object.prototype.touched=function(){if(!this.draw)throw"LLEG: Object must have draw method";return n(r,this)},t.exports={}},function(t,i){var e=function(t,i){var e=Object.create(i.prototype);e.constructor=t,t.prototype=e};t.exports={inheritPrototype:e}},function(t,i){function e(){this.scaleX=1,this.scaleY=1,this.skewX=0,this.skewY=0,this.translateX=0,this.translateY=0,this.degree=0}e.prototype.scale=function(t,i){this.scaleX=t,this.scaleY=i},e.prototype.translate=function(t,i){this.translateX=t,this.translateY=i},e.prototype.skew=function(t,i){this.skewX=t,this.skewY=i},e.prototype.rotate=function(t){this.degree=t},e.prototype.updateCtx=function(t){t.transform(this.scaleX,this.skewX,this.skewY,this.scaleY,this.translateX,this.translateY),t.rotate(this.degree*Math.PI/180)},t.exports={Transform:e}},function(t,i){function e(t){this.audio=new Audio,this.audio.src=t,this.audio.preload="auto"}e.prototype.autoPlay=function(t){this.audio.autoPlay=t},e.prototype.play=function(){this.audio.currentTime=0,this.audio.play()},e.prototype.stop=function(){this.audio.pause()},e.prototype.loop=function(t){this.audio.loop=t},t.exports={Music:e}}]);