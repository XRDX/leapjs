var line = new Line(50, 150, 100, 150);

line.setAnchor(150, 150);
line.lineWidth = 5;

for(var i=0; i<=360; i++){
    line.strokeStyle = HSL(i, 1, 0.5);
    line.rotate(i);
    line.stroke();
}