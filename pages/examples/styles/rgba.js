/***************************************************************

RGBA(red, green, blue, alpha);

颜色RGBA表示法
* red: 红色的值，从0~255，数值越大，红色值越高
* green: 绿色的值，从0~255，数值越大，绿色值越高
* blue: 蓝色的值，从0~255，数值越大，蓝色值越高
* alpha: 透明度，从0~1，0为全透明

***************************************************************/
canvas.resize(400, 200);
background(RGBA(100, 100, 255, 0.5));

circle(200, 200, 200, RGBA(255, 0, 0, 0.5));
circle(200, 200, 190, RGBA(255, 125, 0, 0.5));
circle(200, 200, 180, RGBA(255, 255, 0, 0.5));
circle(200, 200, 170, RGBA(125, 255, 0, 0.5));
circle(200, 200, 160, RGBA(0, 255, 125, 0.5));
circle(200, 200, 150, RGBA(0, 125, 255, 0.5));
circle(200, 200, 140, RGBA(125, 0, 255, 0.5));
circle(200, 200, 130, RGBA(100, 100, 255, 0.5));