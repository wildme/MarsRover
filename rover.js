const fs = require('fs');
let text = fs.readFileSync("input_file.txt", "utf8");

function setDirection(face, turn) {
    switch (face) {
        case 'N':
            if (turn == 'R') return face = 'E';
            if (turn == 'L') return face = 'W';
        case 'W':
            if (turn == 'R') return face = 'N';
            if (turn == 'L') return face = 'S';
        case 'S':
            if (turn == 'R') return face = 'W';
            if (turn == 'L') return face = 'E';
        case 'E':
            if (turn == 'R') return face = 'S';
            if (turn == 'L') return face = 'N';
        default:
            console.log("Unknown direction!");
            break;
    }
}

function moveRover(coords, borders) {
    switch (coords.direction) {
        case 'N':
            if (coords["y"] != borders.ymax) coords["y"] += 1;
            return coords;
        case 'W':
            if (coords["x"] > 0) coords["x"] -= 1;
            return coords;
        case 'S':
            if (coords["y"] > 0) coords["y"] -= 1;
            return coords;
        case 'E':
            if (coords["x"] != borders.xmax) coords["x"] += 1;
            return coords;
    }
}

function parseFile(strings) {
    let borders = {xmax: 0, ymax: 0};
    let position = {x: 0, y: 0, direction: 'N'};
    
    strings.split(/\n/).forEach(line => {
        if (/^\d \d$/.test(line)) {
            borders.xmax = line[0];
            borders.ymax = line[2];
        }
        if (/^\d \d [NSEW]+$/.test(line)) {
            position.x = Number(line[0]);
            position.y = Number(line[2]);
            position.direction = line[4];
        }
        if (/^[MLR]+$/.test(line)) {
            for (let s of line) {
                let newDirection;
                let newCoords;
                    if (s == 'L' || s == 'R') {
                        newDirection = setDirection(position.direction, s);
                        position.direction = newDirection;
                    }
                    if (s == 'M') {
                        newCoords = moveRover(position, borders);
                        position = newCoords;
                    }
            }
            console.log(position);
        }
    });
}

parseFile(text);
