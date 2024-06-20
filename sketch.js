let x = 400; // Minimap center position
let y = 400; // Minimap center position
let w = 200; // Minimap width
let h = 200; // Minimap height
let speed = 5; // Movement speed
let rotation = 0; // Minimap rotation angle

let px = 400,
    py = 400;
let mapImage;

function preload() {
    // Load the map SVG
    mapImage = loadImage("treasure-map.svg");
}

function setup() {
    createCanvas(800, 800);
    background(255);
}

function draw() {
    background(255);

    // Draw the main map
    drawMainMap();

    fill(0);
    textSize(16);

    // Draw the minimap content
    drawMinimap();

    // Calculate the point's position above the current view
    let relativeX = map(px, w / 2, width - w / 2, x - w / 2, x + w / 2);
    let relativeY = map(py, h / 2, height - h / 2, y - h / 2, y + h / 2);

    // Apply the same rotation to the red point to keep it correctly positioned
    let angle = radians(rotation);
    let offsetX = relativeX - x;
    let offsetY = relativeY - y;
    let rotatedX = offsetX * cos(angle) - offsetY * sin(angle) + x;
    let rotatedY = offsetX * sin(angle) + offsetY * cos(angle) + y;

    // Draw the point on the minimap
    fill(255, 0, 0);
    ellipse(rotatedX, rotatedY, 4, 4);

    // Update the minimap position based on arrow keys
    if (keyIsDown(UP_ARROW) && y - h / 2 > 0) {
        y -= speed;
        py -= speed;
    }
    if (keyIsDown(DOWN_ARROW) && y + h / 2 < 800) {
        y += speed;
        py += speed;
    }
    if (keyIsDown(LEFT_ARROW) && x - w / 2 > 0) {
        x -= speed;
        px -= speed;
    }
    if (keyIsDown(RIGHT_ARROW) && x + w / 2 < 800) {
        x += speed;
        px += speed;
    }
    if (keyIsDown(80) && x + w / 2 < 800 && x - w / 2 > 0 && w < 500) {
        w += speed;
    }
    if (keyIsDown(79) && x + w / 2 < 800 && x - w / 2 > 0 && w > -500) {
        w -= speed;
    }
    if (keyIsDown(76) && y + h / 2 < 800 && y - h / 2 > 0 && h < 500) {
        h += speed;
    }
    if (keyIsDown(75) && y + h / 2 < 800 && y - h / 2 > 0 && h > -500) {
        h -= speed;
    }
    if (keyIsDown(77)) {
        rotation += speed;
    }
    if (keyIsDown(78)) {
        rotation -= speed;
    }
}

function drawMainMap(alpha = 255) {
    // Draw the map image on the main map
    tint(255, alpha); // Apply alpha channel to the image
    image(mapImage, 0, 0, 800, 800);
}

function drawMinimap() {
    // Draw the minimap with alpha channel

    push();

    translate(x, y);
    rotate(radians(rotation));
    translate(-w / 2, -h / 2);
    scale(w / 800, h / 800); // Scale down to fit in minimap
    fill(200, 200, 200, 150); // Gray color with alpha
    rect(0, 0, 800, 800);
    drawMainMap(150);
    pop();
}
