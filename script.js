document.addEventListener('keydown', (_event) => {

    const li = document.querySelector('[data-key=' + _event.key + ']');

    if (li === null) {
        return;
    }

    li.classList.remove('tile-active');

    setTimeout(
        () => li.classList.add('tile-active'), 0);
});

/* document.addEventListener('transitionend', _event => {
    console.log(_event)
    const li = _event.target;
    li.classList.remove('tile-active');
}); */

/*
    // A utiliser éventuellement plus tard pour dessiner le leap sur un canvas
    const loop = () => {
        requestAnimationFrame(loop);

    }
    loop();
*/