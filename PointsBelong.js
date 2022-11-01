/**
 * pointsBelong checks to see if a point belongs to a valid non-degenerate triangle or not.
 * a triangle is a valid non-degenerate if |ab| + |bc| > |ac|, |ac| + |ab| > |bc| and |ac| + |bc| > |ab|
 * i.e is whether it lies within the trinagle or outside.
 * */

function pointsBelong(x1, y1, x2, y2, x3, y3, xp, yp) {
    if (calcMagnitude(x1, y1, x2, y2) + calcMagnitude(x2, y2, x3, y3) < calcMagnitude(x1, y1, x3, y3) ||
        calcMagnitude(x1, y1, x3, y3) + calcMagnitude(x3, y3, x2, y2) < calcMagnitude(x1, y1, x2, y2) ||
        calcMagnitude(x1, y1, x2, y2) + calcMagnitude(x1, y1, x3, y3) < calcMagnitude(x3, y3, x2, y2)
    ) return 'triangle is not a valid non-degenerate';

    let triangleArea = calcArea(x1, y1, x2, y2, x3, y3);
    let miniArea_1 = calcArea(x1, y1, x2, y2, xp, yp);
    let miniArea_2 = calcArea(x2, y2, x3, y3, xp, yp);
    let miniArea_3 = calcArea(x1, y1, x3, y3, xp, yp);

    if (isNaN(miniArea_1) || isNaN(miniArea_2) || isNaN(miniArea_3) || ((miniArea_1 + miniArea_2 + miniArea_3) - triangleArea <= 0.1)) { // point belongs to the triangle
        return 'point belongs'
    }
    else {
        return 'point does not belong'
    }
}

function calcArea(a1, b1, a2, b2, a3, b3) {
    let mag_1 = calcMagnitude(a1, b1, a2, b2);
    let mag_2 = calcMagnitude(a2, b2, a3, b3);
    let mag_3 = calcMagnitude(a3, b3, a1, b1);
    /* calculates the angle using the cosine rule
     * theta = inverse cosine of ((a^2 + b^2 - c^2) / 2 * a * b) */
    let theta = Math.acos((Math.pow(mag_2, 2) + Math.pow(mag_3, 2) - Math.pow(mag_1, 2)) / (2 * mag_2 * mag_3));
    return (1 / 2) * mag_2 * mag_3 * Math.sin(theta);
}

function calcMagnitude(a1, b1, a2, b2) {
    return Math.sqrt(Math.abs(Math.pow(a2 - a1, 2) + Math.pow(b2 - b1, 2)));
}

// verticies a, b, c and point p
// console.log(pointsBelong(2, 2, 5, 4, 7, 2, 4, 2))
