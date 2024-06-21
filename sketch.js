let tx = 0; // translation x
let ty = 0; // translation y
let w = 200; // width
let h = 200; // height
let rotation = 0; // Minimap rotation angle
let speed = 5;

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
    textSize(14);
    textAlign(CENTER);
    fill(200, 100, 100);
    text("Red dot is the fixed point", 80, 16);
    fill(120);
    text(
        "Arrow keys: Move map\nO-P: Change width\nK/L: Change height\nN/M: Rotate",
        80,
        35
    );

    translate(400, 400);
    // Draw the main map
    drawMainMap();

    fill(0);
    textSize(16);

    // Draw the minimap content
    drawMinimap();

    let ntx = tx,
        nty = ty,
        nw = w,
        nh = h,
        nrotation = rotation;
    // Update the minimap position based on arrow keys
    if (keyIsDown(UP_ARROW)) {
        nty -= speed;
    }
    if (keyIsDown(DOWN_ARROW)) {
        nty += speed;
    }
    if (keyIsDown(LEFT_ARROW)) {
        ntx -= speed;
    }
    if (keyIsDown(RIGHT_ARROW)) {
        ntx += speed;
    }
    if (keyIsDown(80)) {
        nw += speed;
    }
    if (keyIsDown(79)) {
        nw -= speed;
    }
    if (keyIsDown(76)) {
        nh += speed;
    }
    if (keyIsDown(75)) {
        nh -= speed;
    }
    if (keyIsDown(77)) {
        nrotation += speed;
    }
    if (keyIsDown(78)) {
        nrotation -= speed;
    }

    let fixedPoint = findFixedPoint(
        ntx,
        nty,
        nrotation,
        nw / width,
        nh / height
    );
    // If the move is possible then commit to it
    if (fixedPoint !== null) {
        tx = ntx;
        ty = nty;
        w = nw;
        h = nh;
        rotation = nrotation;
        fill(255, 0, 0);
        ellipse(fixedPoint.x, fixedPoint.y, 5);
    }
}

function findFixedPoint(tx, ty, rotation, sx, sy) {
    let theta = radians(rotation);

    // Coefficients from the transformation matrix
    let a = sx * cos(theta);
    let b = -sy * sin(theta);
    let c = sx * sin(theta);
    let d = sy * cos(theta);

    // We want to solve the system:
    // a * x + b * y + tx = x
    // c * x + d * y + ty = y

    // Rearrange to find fixed points
    // (a - 1) * x + b * y = -tx
    // c * x + (d - 1) * y = -ty

    let denominator = (a - 1) * (d - 1) - b * c;
    if (denominator === 0) {
        // No fixed point or infinite fixed points
        return null;
    }

    let x = (b * ty - (d - 1) * tx) / denominator;
    let y = (tx * c - (a - 1) * ty) / denominator;

    if (x < -400 || x > 400 || y < -400 || y > 400) {
        // Fixed point is outside the main map
        return null;
    }

    return { x: x, y: y };
}

function drawMainMap(alpha = 255) {
    // Draw the map image on the main map
    tint(255, alpha); // Apply alpha channel to the image
    image(mapImage, -400, -400, 800, 800);
}

function drawMinimap() {
    // Draw the minimap with alpha channel
    push();
    translate(tx, ty);
    rotate(radians(rotation));
    scale(w / width, h / height);
    fill(200, 200, 200, 150); // Gray color with alpha
    rect(-400, -400, 800, 800);
    drawMainMap(150);
    pop();
}
