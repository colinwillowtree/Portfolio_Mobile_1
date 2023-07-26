let vehicles = [];
let animation;
let coding;
let design;
let circle;
let buttons = [];
let portal = [];
let portal_control = [];

var rot1;
var rot2;
var rot3;
var rot4;

var drot1;
var drot2;
var drot3;
var drot4;

var background;
var header;

function preload() {
  animation = loadTable("data/structure_data/animation_structure_data.csv", "header");
  coding = loadTable("data/structure_data/coding_structure_data.csv", "header");
  design = loadTable("data/structure_data/design_structure_data.csv", "header");
  circle = loadTable("data/structure_data/circle_structure_data.csv", "header");
  for (var i=0; i<121; i++) {
    portal[i] = loadImage("data/portal/portal_" + nf(i, 4) + ".png");
  }
  for (var j=0; j<4; j++) {
    portal_control[j] = loadImage("data/portal_control/portal_control_" + nf(j, 4) + ".png");
  }
  background = loadImage("data/images/background_glow.png");
  header = loadImage("data/images/header.png");
}
function loadData() {

  var animationData = animation.getRows();
  const total = animation.getRowCount();

  for (var j=0; j<total; j++) {
    //const row = animationData.getRow(i);
    var x = animationData[j].getNum("X");
    var y = animationData[j].getNum("Y");

    var v = new Vehicle(x, y, random(1, 7));
    vehicles.push(v);
  }
  rot1 = 0;
  rot2 = 0;
  rot3 = 0;
  rot4 = 0;
  buttons[0] = new Button(185-width/2, 862-height/2, 10, 150);
  buttons[1] = new Button(1, height/3.24, 10, 150);
  buttons[2] = new Button(357-width/2, 862-height/2, 10, 150);
}


function setup() {
  createCanvas(540, 1080, WEBGL);
  rectMode(CENTER);
  imageMode(CENTER);
  // noCursor();
  loadData();
}


function draw() {

  fill(51, 100);
  //rect(0, 0, width, height);
  tint(235, 200 , 255, 100);
  image(background, 0, 0);
  image(header, 0, 0);
  tint(255, 255);
  

  let dirX = (mouseX / width - 0.5) * 2;
  let dirY = (mouseY / height - 0.5) * 2;
  directionalLight(250, 0, 0, -dirX+1, -dirY, -1);
  directionalLight(0, 0, 250, -dirX, -dirY+1, -1);
  directionalLight(0, 250, 0, -dirX, -dirY-1, -1);

  let locX = mouseX - width / 2;
  let locY = mouseY - height / 2;

  pointLight(255, 0, 0, locX+50, locY, 255);
  pointLight(0, 0, 255, locX-50, locY, 255);
  pointLight(0, 255, 0, locX, locY, 255);



  push();


  if (buttons[0].distance < 25 ) {
    var animationData = coding.getRows();
    const total = animation.getRowCount();
    for (var j=0; j<total; j++) {
      var x = animationData[j].getNum("X");
      var y = animationData[j].getNum("Y");
      var v = vehicles[j];
      v.update(x*1.1, y*1.1);
      v.show();
      v.behaviors();
    }
    drot1 = radians(0);
    drot2 = radians(180);
    drot3 = radians(180);
    drot4 = radians(270);
  } else if (buttons[1].distance < 25 ) {
    var animationData = animation.getRows();
    const total = animation.getRowCount();
    for (var j=0; j<total; j++) {
      var x = animationData[j].getNum("X");
      var y = animationData[j].getNum("Y");
      var v = vehicles[j];
      v.update(x*.9, y*.9);
      v.show();
      v.behaviors();
    }
    drot1 = radians(180);
    drot2 = radians(0);
    drot3 = radians(270);
    drot4 = radians(0);
  } else if (buttons[2].distance < 25 ) {
    var animationData = design.getRows();
    const total = animation.getRowCount();
    for (var j=0; j<total; j++) {
      var x = animationData[j].getNum("X");
      var y = animationData[j].getNum("Y");
      var v = vehicles[j];
      v.update(x*1.1, y*1.1);
      v.show();
      v.behaviors();
    }
    drot1 = radians(90);
    drot2 = radians(270);
    drot3 = radians(0);
    drot4 = radians(90);
  } else {
    var animationData = circle.getRows();
    const total = animation.getRowCount();
    for (var j=0; j<total; j++) {
      var x = animationData[j].getNum("X");
      var y = animationData[j].getNum("Y");
      var v = vehicles[j];
      v.update(x/4*sin(frameCount/10000.0*j), y/4*sin(frameCount/20000.0*j));
      v.show();
      v.behaviors();
    }
    drot1 = radians(270);
    drot2 = radians(90);
    drot3 = radians(90);
    drot4 = radians(180);
  }


  pop();


  for (i=0; i<buttons.length; i++) {
    var b = buttons[i];
    b.update();
  }

  rot1 = lerp(rot1, drot1, 0.01);
  rot2 = lerp(rot2, drot2, 0.01);
  rot3 = lerp(rot3, drot3, 0.01);
  rot4 = lerp(rot4, drot4, 0.01);

  push();
  image(portal[frameCount%120], 0, 0);
  pop();

  push();
  rotate(PI+sin(frameCount/60.0)*PI/4);
  image(portal[frameCount%120], 0, 0);
  pop();

  push();
  rotate(rot1);
  //image(portal_control[0], 0, 0);
  pop();

  push();
  rotate(rot2);
  image(portal_control[1], 0, 0);
  pop();
  push();
  rotate(rot2*0.58+PI);
  image(portal_control[1], 0, 0);
  pop();

  push();
  rotate(rot3);
  image(portal_control[2], 0, 0);
  pop();

  push();
  rotate(sin(frameCount/30.0)*PI/4);
  //image(portal_control[3], 0, 0);
  pop();

  //push();
  //rotateY(frameCount/60.0);
  //torus(300, 5, 100, 100);
  //pop();
}

function mousePressed() {
  console.log(mouseX, mouseY);
}
