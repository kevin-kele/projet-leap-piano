import { getCoords } from './app.js'
// import { canvas, ctx } from './canvas.js'
import './script.js';

Pizzicato.context.resume();

const NOTES = {
    do: new Pizzicato.Sound('./audio/do.wav'),
    re: new Pizzicato.Sound('./audio/re.wav'),
    mi: new Pizzicato.Sound('./audio/mi.wav'),
    fa: new Pizzicato.Sound('./audio/fa.wav'),
    sol: new Pizzicato.Sound('./audio/sol.wav'),
    la: new Pizzicato.Sound('./audio/la.wav'),
    si: new Pizzicato.Sound('./audio/si.wav'),
    do: new Pizzicato.Sound('./audio/do.wav'),
};

const cursor = document.getElementById('cursor');

// effect 



let effect = document.getElementById('effect');

effect.onclick = function() {
    // alert("Vous m'avez cliqué !");
    let pingPongDelay = new Pizzicato.Effects.PingPongDelay({
        feedback: 0.6,
        time: 0.4,
        mix: 0.5
    });
    NOTES.do.addEffect(pingPongDelay);
    NOTES.do.play();
};

let effect2 = document.getElementById('effect2');
effect2.onclick = function() {
    let dubDelay = new Pizzicato.Effects.DubDelay({
        feedback: 0.6,
        time: 0.7,
        mix: 0.5,
        cutoff: 700
    });

    NOTES.re.addEffect(dubDelay);
    NOTES.re.play();

}



// Leap hover
class LeapHover {
    constructor() {
        this.currentElement = null;
        this.leapHoverElements = [];
        document.querySelectorAll('[leap-hover]').forEach(element => {
            this.leapHoverElements.push(element);
        });
    }

    verify(x, y, callback) {
        this.leapHoverElements.forEach(element => {
            let rect = element.getBoundingClientRect();
            element.classList.remove('leap-hover');
            let sc = window.scrollY;
            if (x > rect.left && x < rect.right && y > rect.top + sc && y < rect.bottom + sc) {
                if (this.currentElement !== element) {
                    element.classList.add('leap-hover');
                    // document.elementFromPoint(x, y).click();
                    this.currentElement = element;
                    callback(element);
                }
            }
        });
    }
}
const leapHover = new LeapHover();
const controller = new Leap.Controller();
controller.connect();
controller.on('frame', frame => {

    frame.hands.forEach(hand => {

        // if (hand.pinchStrength >= 0.95) {
        //     ctx.fillStyle = '#f00';
        // } else {
        //     ctx.fillStyle = '#000';
        // }

        // Debug leapHoverElements
        /* leapHover.leapHoverElements.forEach(element => {
            let rect = element.getBoundingClientRect();

            ctx.strokeStyle = 'red';
            let sc = window.scrollY;
            ctx.strokeRect(rect.x, rect.y + sc, rect.width, rect.height);
        }); */

        // Dessin de la paume
        let palmPos = getCoords(hand.palmPosition, frame);
        cursor.style.left = palmPos.x + 'px',
            cursor.style.top = palmPos.y + 'px',
            // Leap Hover plugin
            leapHover.verify(palmPos.x, palmPos.y, function(el) {
                el.classList.remove('tile-active');
                setTimeout(() => el.classList.add('tile-active'), 0);

                let soundId = el.dataset.note;
                if (!soundId || !NOTES[soundId])
                    return;

                // if (NOTES[soundId].playing == false) {
                NOTES[soundId].stop();

                NOTES[soundId].play();
                // }

            });

        /* //dessin de poignet
        ctx.fillStyle = 'black';
        let nextJoint = getCoords(hand.arm.nextJoint, frame, canvas);
        ctx.fillRect(nextJoint.x, nextJoint.y, 25, 25); */

        /* // Dessin des doigts
        const carps = [];
        const mcps = [];
        hand.fingers.forEach((finger) => {
            // Pour chaque doigt, dessin des différentes phalanges …
            const tip = getCoords(finger.tipPosition, frame, canvas);
            const dip = getCoords(finger.dipPosition, frame, canvas);
            const pip = getCoords(finger.pipPosition, frame, canvas);
            const mcp = getCoords(finger.mcpPosition, frame, canvas);
            const carp = getCoords(finger.carpPosition, frame, canvas);

            ctx.fillStyle = 'red';
            const pos = [tip, dip, pip, mcp, carp, ]
            for (let i = 0; i < pos.length - 1; i++) {
                ctx.fillRect(pos[i].x, pos[i].y, 10, 10);
                ctx.beginPath();
                ctx.moveTo(pos[i].x, pos[i].y);
                ctx.lineTo(pos[i + 1].x, pos[i + 1].y);
                ctx.closePath();

                ctx.beginPath();
                ctx.moveTo(pos[i].x, pos[i].y);
                ctx.lineTo(pos[i + 1].x, pos[i + 1].y);
                ctx.stroke();
                ctx.closePath();
            }
            ctx.fillRect(carp.x, carp.y, 10, 10);

            carps.push(carp);
            mcps.push(mcp);
        }) */
    });

});


export let leap;