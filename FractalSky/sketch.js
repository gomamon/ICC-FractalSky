/*size of fractal */
let numlist = [3, 9, 27, 81];
let numidx = 2;
let num;
/*color multiplication size for stars*/
let cdlist = [50, 30, 10, 3];
let cd;

/* width per a star */
let star_w;
let star_h;

/* map for star */
let starmap = [];

/* check that fractal size changed */
let updated = true;

let canvas_w;
let canvas_h;
let bg_color = [63, 61, 92];


function setup() {
  canvas_w = windowWidth;
  canvas_h = windowHeight;
  //full screen
  createCanvas(canvas_w, canvas_h);
  background(bg_color[0], bg_color[1], bg_color[2]);

  init(); //initializing starmap
  num = numlist[numidx];
  cd = cdlist[numidx];
}

function init() {
  //initialize starmap to 0
  for (let i = 0; i < 250; i++) {
    starmap.push([]);
    for (let j = 0; j < 250; j++) {
      starmap[i].push(0);
    }
  }
}


function draw() {

  let mx = mouseX;
  let my = mouseY;

  background(bg_color[0], bg_color[1], bg_color[2]);


  /* Fill Star Map*/
  if (updated) {

    for (let i = 0; i < 250; i++) {
      for (let j = 0; j < 250; j++) {
        starmap[i][j] = 0;
      }
    }
    cd = cdlist[numidx];
    fill_starmap(num, 0, 0);
    updated = false;
  }

  /*Drawing the moon*/
  push();
  draw_moon(canvas_w / 2, canvas_h / 2, min(canvas_w, canvas_h) / 5, min(canvas_h, canvas_w) / 5, (mx / canvas_w) * (canvas_w / 5) + canvas_w / 2, (canvas_h / 2) - (mx / canvas_w) * (canvas_h / 10))
  pop();

  /* Drawing the stars */
  draw_starmap(canvas_w / num, canvas_h / num, mx, my);
}

function fill_starmap(n, x, y) {

  /*
  Fill starmap following fractal shape.
  Create fractal using recursive
  */
  if (n === 1) {
    starmap[x][y] = 1;
    return;
  }

  let cur_size = n / 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (i !== 1 || j !== 1)
        fill_starmap(cur_size, x + (cur_size * i), y + (cur_size * j));
    }
  }

  return;
}

function draw_starmap(w, h, mx, my) {
  /*Draw stars using starmap*/
  fill(color(100, 100, 100));
  noStroke();

  //Check all element of starmap
  for (let i = 0; i < num; i++) {
    for (let j = 0; j < num; j++) {
      let x = i * w + w / 2;
      let y = j * h + h / 2;
      // If starmap[i][j] is 1, draw star
      if (starmap[i][j] === 1) {
        let c = [map(my, 0, canvas_h, 40, 100) + i * cd, map(my, 0, canvas_h, 40, 150) + j * cd, 255];

        fill(c[0], c[1], c[2]);
        if (dist(x, y, mx, my) < 60) {
          draw_star(x, y, random(2, min(w, h)));
        } else {
          draw_star(x, y, min(w, h) / 2);
        }


      }
    }
  }
}


function mouseClicked(event) {
  /* chage size of fractal */

  numidx++;

      
  if(numidx > 3)
    numidx = 0;

  num = numlist[numidx];
  updated = true;

  
}


function draw_star(x, y, size) {
  /*Draw star*/
  push();
  translate(x, y);
  noStroke();
  for (let i = 0; i < 8; i++) {
    //create a leave of star
    ellipse(0, size / 4, size / 6, size);
    rotate(PI / 4);
  }
  pop();
}

function draw_moon(x, y, w, h, vx, vy) {
  /*Drawing moon*/
  noStroke();
  fill(255, 243, 110);
  ellipse(x, y, w, h);

  /*Drawing Shadow of moon*/
  noStroke();
  fill(bg_color[0], bg_color[1], bg_color[2]);
  ellipse(vx, vy, w + 1, h + 1);

  /*Drawing text*/
  fill(255, 243, 110);
  textSize(w / 6);
  text('Artist. \nMamon', x - w / 4, y);
}