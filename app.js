export function getCoords(leapPoint, frame) {
    const [x, y] = frame.interactionBox.normalizePoint(leapPoint);

    return {
        x: window.innerWidth * x,
        y: window.innerHeight * (1 - y),
    };
}