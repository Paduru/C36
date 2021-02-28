var backgroundImg;
var balloon, balloonAnimation;
var database, position;

function preload() {
  backgroundImg = loadImage("images/Hot Air Ballon-01.png");

  balloonAnimation = loadAnimation(
    "images/Hot Air Ballon-02.png",
    "images/Hot Air Ballon-03.png",
    "images/Hot Air Ballon-04.png"
  );
}

function setup() {
  database = firebase.database();

  createCanvas(1500, 750);

  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("animation", balloonAnimation);
  balloon.scale = 0.65;

  var ballPosition = database.ref("Balloon/Position");
  ballPosition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg);

  fill("black");
  textSize(20);
  text("Use arrow keys to move", 50, 25);

  if (keyDown(LEFT_ARROW)) {
    updateHeight(-10, 0);
  } else if (keyDown(RIGHT_ARROW)) {
    updateHeight(10, 0);
  } else if (keyDown(UP_ARROW)) {
    updateHeight(0, -10);
  } else if (keyDown(DOWN_ARROW)) {
    updateHeight(0, 10);
  }

  drawSprites();
}

function readPosition(data) {
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function updateHeight(x, y) {
  database.ref("Balloon/Position").set({
    x: position.x + x,
    y: position.y + y,
  });
}

function showError() {
  console.log("Error in writing to the database");
}
