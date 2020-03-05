// Author: Brenda Penn
// Prototyping Studio Game
// Concept: Keep the plants alive by giving them water, sun, and making sure to plant them in good soil

//canvas variables
let canvasHeight = 900;
let canvasWidth = 1440;

//define rain variables
var rainDrops = [];
let isRaining = false;
let prevRainState = false;
let rainCounter = 0;

//define sun variables
let isSunny = false;
let sunCounter = 0;

//define plant variables
let plant = [];
let currPlantNum = 0; //keep track of index of current plant
let seed;
let smallTree = [];
let medTree = [];
let lgTree = [];
let grass = [];

let sunImg;
let sunImgWidth = 183.5;
let sunImgHeight = 183.5;
let soilImg;
let clouds;
let cloudX = 300;
let cloudY = 20;
let blueSkyImg;

let gameOver = false;


function preload() {
  blueSkyImg = loadImage('assets/blueSky.png');
  sunImg = loadImage('assets/Sun.png');
  soilImg = loadImage('assets/soil.png');
  smallTree = loadImage('assets/tree3_small.png')
  clouds = loadImage('assets/clouds.png');
  seed = loadImage('assets/seeds.png');
  smallTree[0] = loadImage('assets/tree1_small.png');
  smallTree[1] = loadImage('assets/tree2_small.png');
  smallTree[2] = loadImage('assets/tree3_small.png');
  smallTree[3] = loadImage('assets/tree4_small.png');
  smallTree[4] = loadImage('assets/tree5_small.png');
  smallTree[5] = loadImage('assets/tree6_small.png');
  medTree[0] = loadImage('assets/tree1_med.png');
  medTree[1] = loadImage('assets/tree2_med.png');
  medTree[2] = loadImage('assets/tree3_med.png');
  medTree[3] = loadImage('assets/tree4_med.png');
  medTree[4] = loadImage('assets/tree5_med.png');
  medTree[5] = loadImage('assets/tree6_med.png');
  lgTree[0] = loadImage('assets/tree1_lg.png');
  lgTree[1] = loadImage('assets/tree2_lg.png');
  lgTree[2] = loadImage('assets/tree3_lg.png');
  lgTree[3] = loadImage('assets/tree4_lg.png');
  lgTree[4] = loadImage('assets/tree5_lg.png');
  lgTree[5] = loadImage('assets/tree6_lg.png');
  grass[0] = loadImage('assets/grass1.png');
  grass[1] = loadImage('assets/grass2.png');
  grass[2] = loadImage('assets/grass3.png');
  grass[3] = loadImage('assets/grass4.png');
  grass[4] = loadImage('assets/grass5.png');
  grass[5] = loadImage('assets/grass6.png');
}

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  for (var  i = 0; i < 6; i++) {
    plant[i] = new Plant(seed);
  }
}

function draw() {
  noCursor();
  image(blueSkyImg, 0, 0);

  isGameOver();

  //Check if it's raining or sunny
  if(isRaining) {
   background(240);
   for (var i = 0; i < rainDrops.length; i++) {
   rainDrops[i].fall();
   rainDrops[i].show();
 }
  strokeWeight(0);
  fill(240)
  rect(0, 0,cloudX, 800);
  rect(cloudX + 456, 0 , 1400, 800);
 }

  image(sunImg, 10, 10, sunImgWidth, sunImgHeight);
  image(clouds, cloudX, cloudY);
  image(soilImg, 0, 900 - soilImg.height);

  if(plant[currPlantNum].planted == true) {
    if(currPlantNum == 0) {
      if((plant[currPlantNum].inGrass(grass[0], 10)) == false) {
        gameOver = true;
      }
    } else if (currPlantNum == 1) {
        if((plant[currPlantNum].inGrass(grass[1], 800)) == false) {
          gameOver = true;
        }
    } else if (currPlantNum == 2) {
        if((plant[currPlantNum].inGrass(grass[1], 1300)) == false) {
          gameOver = true;
        }
    } else if (currPlantNum == 3) {
        if((plant[currPlantNum].inGrass(grass[1], 200)) == false) {
          gameOver = true;
        }
    } else if (currPlantNum == 4) {
        if((plant[currPlantNum].inGrass(grass[1], 1000)) == false) {
          gameOver = true;
        }
    } else if (currPlantNum == 5) {
        if((plant[currPlantNum].inGrass(grass[1], 600)) == false) {
          gameOver = true;
        }
    }
  }


  if(plant[currPlantNum].planted && (currPlantNum < 5)) {
    currPlantNum++;
  }

  for (var i = 0; i < 6; i++) {
    if (i == currPlantNum || plant[i].planted) {
      plant[i].show();
      if(i == 0) {
        image(grass[0], 10, 825);
      } else if (i == 1) {
        image(grass[1], 800, 825);
      } else if (i == 2) {
        image(grass[2], 1300, 825);
      } else if (i == 3) {
        image(grass[3], 200, 825);
      } else if (i == 4) {
        image(grass[4], 1000, 825);
      } else if (i == 5) {
        image(grass[5], 600, 825);
      }
    }
  }


  if (isSunny) {
    for(var j= 0; j <= currPlantNum; j++) {
      if(plant[j].planted){
        if((sunImgWidth >= 300 && sunImgHeight >= 300)) {
          plant[j].hasSun();
        }
      }
    }
    sunCounter++;
  }

  if((sunCounter == 200 || !isSunny) && (sunImgWidth >= 183.5 && sunImgHeight >= 183.5)) {
    isSunny = false;
    for(var m = 0; m <= currPlantNum; m++) {
      plant[m].gotSun = false;
    }
    sunImgWidth -= .5;
    sunImgHeight -= .5;
  }

  if(isRaining) {
    rainCounter++;
    for(var k = 0; k <= currPlantNum; k++) {
      if(plant[k].planted && !plant[k].gotRain) {
        if(plant[k].hasRain(cloudX) && !prevRainState) {
          if(rainCounter > 200) {
            plant[k].gotRain = true;
          }
        }
      }
    }

    if(rainCounter >= 300) {
      textAlign(CENTER);
      textSize(50);
      fill(255);
      text('Too much rain!', width / 2, height / 2);
    }
  }

//grow the tree if got both rain and sun
for (var l = 0; l <= currPlantNum; l++) {
  if(plant[l].gotSun && plant[l].gotRain){
    if(plant[l].careCycle == 0) {
      plant[l].grow(smallTree[l]);
      plant[l].careCycle++;
    } else if (plant[l].careCycle == 1) {
      plant[l].grow(medTree[l]);
      plant[l].careCycle++;
    } else if (plant[l].careCycle == 2) {
      plant[l].grow(lgTree[l]);
      plant[l].careCycle++;
    }
    plant[l].reset();
  }
}

prevRainState = isRaining;

}


function keyPressed() {
  if (keyCode == LEFT_ARROW) {
    if(cloudX > 0) {
      cloudX -= 10;
    }
  } else if (keyCode == RIGHT_ARROW) {
    if((cloudX+456) < (canvasWidth-10)){
      cloudX += 10;
    }
  }

}

function keyTyped() {

  //only able to move the seed if it hasnt been planted yet
  if(!plant[currPlantNum].planted) {
    if (key === 'a') {
      if (plant[currPlantNum].x > 0) {
        plant[currPlantNum].x -= 10;
        plant[currPlantNum].y += 5;
      }
    } else if (key === 'd') {
      if (plant[currPlantNum].x+10 < canvasWidth-100) {
        plant[currPlantNum].x += 10;
        plant[currPlantNum].y += 5;
      }
    }
  }

  //no rain
  if (key === '0') {
    isRaining = false;
  }

  //heavy rain
  if (key === '3') {
    isRaining = true;
    rainDrops = [];
    for (var i = 0; i < 50; i++) {
      rainDrops[i] = new Rain();
    }
  } else if (key === '2') {
    //medium rain
    isRaining = true;
    rainDrops = [];
    for (var j = 0; j < 300; j++) {
      rainDrops[j] = new Rain();
    }
  } else if (key === '1') {
    //light rain
    isRaining = true;
    rainDrops = [];
    for (var k = 0; k < 600; k++) {
      rainDrops[k] = new Rain();
    }
  }

  //107 and 187 are keycodes for "+"
  //sun controller active
  if (keyIsDown(107) || keyIsDown(187)) {
    isSunny = true;
    if(sunImgHeight <= 500) {
      sunImgWidth += 5;
      sunImgHeight += 5;
    }
    sunCounter = 0;
  }

  //109 and 189 are keycodes for "-"
  //sun controller inactive
  if ((keyIsDown(109) || keyIsDown(189))) {
    //have sun progressively shrink if controller not active
    if(sunImgWidth >= 183.5 && sunImgHeight >= 183.5) {
      sunImgWidth -= 5;
      sunImgHeight -= 5;
    } else {
      isSunny = false;
    }

  }

}


function isGameOver() {
   if(gameOver){
    // draw game over text
    noLoop();
    textAlign(CENTER);
    textSize(50);
    fill(255);
    text('Game Over', width / 2, height / 2);
  }
}
