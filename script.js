let colorlist = ['#000084', '#006484', '#00c884'];
let particles = [];
let smallerParticles = [];
let numberOfParticles = 5;
let activation = 1;
let isStroked = 1;

var imgPreload1 = new Image();
imgPreload1.src = "btn1-on.png";
var imgPreload2 = new Image();
imgPreload2.src = "btn3-disabled.png";
var imgPreload3 = new Image();
imgPreload3.src = "btn3-on.png";
var imgPreload4 = new Image();
imgPreload4.src = "btn2-disabled.png";
var imgPreload5 = new Image();
imgPreload5.src = "btn2-on.png";
var imgPreload6 = new Image();
imgPreload6.src = "btn4-disabled.png";
var imgPreload7 = new Image();
imgPreload7.src = "btn4-on.png";

var audio = new Audio('buttons-for-particles.mp3');
var audioStroke = new Audio('buttons-for-particles-stroke.mp3');
var audioAdd = new Audio('buttons-for-particles-add.mp3');
var audioDelete = new Audio('buttons-for-particles-delete.mp3');
audio.loop = true;
audioStroke.loop = true;

function setup() {

  // if (windowWidth > windowHeight) {
  //     cX = windowHeight * 0.9;
  //     cY = windowHeight * 0.9;
  //   } else {
  //     cX = windowWidth * 0.9;
  //     cY = windowWidth * 0.9;
  //   }

  var parent = document.getElementById("main-container");

  cX = parent.offsetWidth - 6;
  cY = windowHeight;


  let myCanvas = createCanvas(cX, cY);
  myCanvas.parent("main-container");

  noStroke();
  populate();
}

function draw() {

  if (activation == 1) {

    // repopulate original array of particles if necessary
    if (particles.length > 0) {
      if (particles[0].x != smallerParticles[0].x) {
        for (p = 0; p < particles.length; p++) {
          smallerParticles[p].x = particles[p].x;
          smallerParticles[p].y = particles[p].y;
        }
      }
    }

    background('#001b45');
    if (isStroked == -1) {
      dims = Math.random() * 64;
    } else {
      dims = 16;
    }
    moving(particles);
    for (j = 0; j < particles.length; j++) {
      strokeAndColor(particles[j].color);
      circle(particles[j].x, particles[j].y, dims);
    }
  } else {
    if (isStroked == -1) {
      dims = Math.random() * 4;
    } else {
      dims = 2;
    }
    moving(smallerParticles);
    for (j = 0; j < smallerParticles.length; j++) {
      strokeAndColor(smallerParticles[j]);
      circle(smallerParticles[j].x, smallerParticles[j].y, dims);
    }
  }


}

function moving(theseP) {
  for (k = 0; k < theseP.length; k++) {
    theseP[k].x += theseP[k].xDir;
    theseP[k].y += theseP[k].yDir;

    if (theseP[k].x >= cX || theseP[k].x < 0) {
      theseP[k].xDir *= -1;
    }
    if (theseP[k].y >= cY || theseP[k].y < 0) {
      theseP[k].yDir *= -1;
    }
  }
}

function populate() {
  for (i = 0; i < numberOfParticles; i++) {
    let x = Math.random() * cX;
    let y = (Math.random() * (cY / 2)) + (cY / 2);
    let xDir = random(-1, 1);
    let yDir = random(-1, 1);
    let color = random(colorlist);
    particles.push({ x: x, y: y, xDir: xDir, yDir: yDir, color: color });
    smallerParticles.push({ x: x, y: y, xDir: xDir, yDir: yDir, color: color });
  }
}

function toggleActivate() {
  activation *= -1;

  if (activation == -1) {
    audio.play();

    document.getElementById("btn-add").disabled = true;
    document.getElementById("btn-add").style.backgroundImage = "url('btn3-disabled.png')";

    document.getElementById("btn-delete").disabled = true;
    document.getElementById("btn-delete").style.backgroundImage = "url('btn4-disabled.png')";

    // document.getElementById("btn-stroke").disabled = true;
    // document.getElementById("btn-delete").style.backgroundImage = "url('btn2-disabled.png')";

    document.getElementById("btn-activate").style.backgroundImage = "url('btn1-on.png')";
  } else {
    audio.pause();

    document.getElementById("btn-add").disabled = false;
    document.getElementById("btn-add").style.backgroundImage = "url('btn3.png')";

    document.getElementById("btn-delete").disabled = false;
    document.getElementById("btn-delete").style.backgroundImage = "url('btn4.png')";

    // document.getElementById("btn-stroke").disabled = false;
    // document.getElementById("btn-stroke").style.backgroundImage = "url('btn2.png')";

    document.getElementById("btn-activate").style.backgroundImage = "url('btn1.png')";
  }
}

function addP() {
  document.getElementById("btn-add").style.backgroundImage = "url('btn3-on.png')";
  if (audioAdd.paused) {
    audioAdd.play();
  } else {
    audioAdd.currentTime = 0
  }
  // audioAdd.play();

  if (particles.length < 100) {
    let x = Math.random() * cX;
    let y = (Math.random() * (cY / 2)) + (cY / 2);
    let xDir = random(-1, 1);
    let yDir = random(-1, 1);
    let color = random(colorlist);
    particles.push({ x: x, y: y, xDir: xDir, yDir: yDir, color: color });
    smallerParticles.push({ x: x, y: y, xDir: xDir, yDir: yDir, color: color });

    if (particles.length < 100) {
      setTimeout(changeAddButton, 250);
    }

  }

  if (particles.length >= 100) {
    document.getElementById("btn-add").disabled = true;
    document.getElementById("btn-add").style.backgroundImage = "url('btn3-disabled.png')";
  }
  if (particles.length > 0) {
    document.getElementById("btn-delete").disabled = false;
    document.getElementById("btn-delete").style.backgroundImage = "url('btn4.png')";
  }


}

function deleteP() {
  document.getElementById("btn-delete").style.backgroundImage = "url('btn4-on.png')";
  if (audioDelete.paused) {
    audioDelete.play();
  } else {
    audioDelete.currentTime = 0
  }

  if (particles.length != 0) {
    particles.pop();
    smallerParticles.pop();
  }
  if (particles.length < 100) {
    document.getElementById("btn-add").disabled = false;
    document.getElementById("btn-add").style.backgroundImage = "url('btn3.png')";
  }
  if (particles.length < 1) {
    document.getElementById("btn-delete").disabled = true;
    document.getElementById("btn-delete").style.backgroundImage = "url('btn4-disabled.png')";
  } else {
    setTimeout(changeDeleteButton, 250);
  }


}

function toggleStroke() {
  isStroked *= -1;

  if (isStroked == -1) {
    document.getElementById("btn-stroke").style.backgroundImage = "url('btn2-on.png')";
    audioStroke.play();
  } else {
    document.getElementById("btn-stroke").style.backgroundImage = "url('btn2.png')";
    audioStroke.pause();
  }
}

function strokeAndColor() {
  if (isStroked == 1) {
    fill(particles[j].color);
    noStroke();
  } else {
    noFill();
    stroke(particles[j].color);
    strokeWeight(2);
  }

}

function changeAddButton() {
  if (particles.length >= 100) {
    document.getElementById("btn-add").style.backgroundImage = "url('btn3-disabled.png')";
  } else {
    document.getElementById("btn-add").style.backgroundImage = "url('btn3.png')";
  }
}

function changeDeleteButton() {
  if (particles.length < 1) {
    document.getElementById("btn-delete").style.backgroundImage = "url('btn4-disabled.png')";
  } else {
    document.getElementById("btn-delete").style.backgroundImage = "url('btn4.png')";
  }
}