/* ==========================================
   ADAM (AS) — CINEMATIC WEB FILM
========================================== */


/* ==========================================
   MOVIE DATA
========================================== */

const scenes = [

    {
        time: 0,
        duration: 45,

        chapter: "Prologue",

        title: "Before Humanity",

        text:
        "Long before the first human walked upon the Earth, " +
        "Allah created the heavens and the earth. " +
        "And the story of humanity was about to begin.",

        sky:
        "radial-gradient(circle at 50% 40%, #3c5260, #101c25 50%, #020506)",

        stars: true,
        human: false
    },


    {
        time: 45,
        duration: 60,

        chapter: "Chapter I",

        title: "A New Creation",

        text:
        "Allah informed the angels that He would place " +
        "a human being upon the Earth.",

        sky:
        "radial-gradient(circle at 50% 50%, #52685d, #182722 50%, #050908)",

        stars: false,
        human: false
    },


    {
        time: 105,
        duration: 75,

        chapter: "Chapter II",

        title: "From Clay",

        text:
        "The Qur'an tells us that Adam was created from clay. " +
        "From the earth came the first human being.",

        sky:
        "radial-gradient(circle at 50% 60%, #725b42, #30271e 55%, #0b0907)",

        stars: false,
        human: true
    },


    {
        time: 180,
        duration: 70,

        chapter: "Chapter III",

        title: "Knowledge",

        text:
        "Allah taught Adam knowledge. " +
        "The angels witnessed a creation honored with knowledge " +
        "and understanding.",

        sky:
        "radial-gradient(circle at 50% 40%, #687b78, #1e2c2c 55%, #050909)",

        stars: true,
        human: true
    },


    {
        time: 250,
        duration: 65,

        chapter: "Chapter IV",

        title: "The Command",

        text:
        "Allah commanded the angels to prostrate before Adam. " +
        "They obeyed — all except Iblis.",

        sky:
        "radial-gradient(circle at 50% 45%, #40352e, #171310 60%, #020202)",

        stars: false,
        human: true
    },


    {
        time: 315,
        duration: 65,

        chapter: "Chapter V",

        title: "Arrogance",

        text:
        "Iblis refused and became arrogant. " +
        "His refusal marked the beginning of his enmity " +
        "toward Adam and his descendants.",

        sky:
        "radial-gradient(circle at 50% 50%, #321f1d, #100909 60%, #000000)",

        stars: false,
        human: false
    },


    {
        time: 380,
        duration: 70,

        chapter: "Chapter VI",

        title: "The Garden",

        text:
        "Adam and his wife were placed in Paradise. " +
        "They were told to enjoy its blessings, " +
        "but to stay away from a particular tree.",

        sky:
        "radial-gradient(circle at 50% 35%, #8aa67d, #31523c 50%, #0b1810)",

        stars: false,
        human: true
    },


    {
        time: 450,
        duration: 70,

        chapter: "Chapter VII",

        title: "The Test",

        text:
        "The test came. " +
        "The whispering of Shaytan led them toward the forbidden tree.",

        sky:
        "radial-gradient(circle at 50% 50%, #514634, #241b15 55%, #070504)",

        stars: false,
        human: true
    },


    {
        time: 520,
        duration: 65,

        chapter: "Chapter VIII",

        title: "Repentance",

        text:
        "Adam turned back to his Lord. " +
        "He received words of repentance, " +
        "and Allah accepted his repentance.",

        sky:
        "radial-gradient(circle at 50% 40%, #819b8c, #293e35 55%, #08100c)",

        stars: true,
        human: true
    },


    {
        time: 585,
        duration: 60,

        chapter: "Chapter IX",

        title: "Earth",

        text:
        "Then came the beginning of humanity's life upon Earth. " +
        "The human journey had begun.",

        sky:
        "radial-gradient(circle at 50% 40%, #6b7e68, #27372b 55%, #080c09)",

        stars: false,
        human: true
    },


    {
        time: 645,
        duration: 55,

        chapter: "Epilogue",

        title: "The Journey Continues",

        text:
        "From Adam came generations of humanity. " +
        "And with humanity came the responsibility to worship Allah, " +
        "seek guidance, and live upon the Earth with purpose.",

        sky:
        "radial-gradient(circle at 50% 35%, #455f6a, #17282d 55%, #030607)",

        stars: true,
        human: false
    }

];


/* ==========================================
   TOTAL MOVIE LENGTH
========================================== */

const movieLength = 700;


/* ==========================================
   VARIABLES
========================================== */

let currentTime = 0;

let playing = false;

let animationFrame;

let currentSceneIndex = -1;

let lastTimestamp = null;

/* =================================
   CINEMATIC DUST PARTICLES
================================= */

const particleContainer =
    document.getElementById("particles");

function createDustParticles() {
    if (!particleContainer) return;

    particleContainer.innerHTML = "";

    for (let i = 0; i < 45; i++) {
        const dust = document.createElement("span");

        dust.className = "dust";

        dust.style.left = Math.random() * 100 + "%";

        dust.style.animationDuration =
            (8 + Math.random() * 14) + "s";

        dust.style.animationDelay =
            (-Math.random() * 20) + "s";

        const size = 2 + Math.random() * 3;

        dust.style.width = size + "px";
        dust.style.height = size + "px";

        particleContainer.appendChild(dust);
    }
}

createDustParticles();


/* ==========================================
   ELEMENTS
========================================== */

const sky =
    document.getElementById("sky");

const stars =
    document.getElementById("stars");

const moon =
    document.getElementById("moon");

const human =
    document.getElementById("humanShadow");

const chapter =
    document.getElementById("chapter");

const title =
    document.getElementById("sceneTitle");

const narration =
    document.getElementById("narration");

const cinematicText =
    document.getElementById("cinematicText");

const progress =
    document.getElementById("progress");

const timer =
    document.getElementById("timer");

const intro =
    document.getElementById("intro");

const fade =
    document.getElementById("fade");

const ending =
    document.getElementById("ending");


/* ==========================================
   START MOVIE
========================================== */

document
    .getElementById("startBtn")
    .addEventListener(
        "click",
        startMovie
    );


function startMovie() {

    intro.style.opacity = "0";

    setTimeout(() => {

        intro.style.display = "none";

        fade.style.opacity = "0";

        playing = true;

        lastTimestamp = null;

        animationFrame =
            requestAnimationFrame(
                movieLoop
            );

    }, 1500);
}


/* ==========================================
   MOVIE LOOP
========================================== */

function movieLoop(timestamp) {

    if (!playing) return;


    if (!lastTimestamp) {

        lastTimestamp = timestamp;

    }


    const delta =
        (timestamp - lastTimestamp) / 1000;


    lastTimestamp = timestamp;


    currentTime += delta;


    if (currentTime >= movieLength) {

        finishMovie();

        return;

    }


    updateMovie();


    animationFrame =
        requestAnimationFrame(
            movieLoop
        );
}


/* ==========================================
   UPDATE MOVIE
========================================== */

function updateMovie() {

    updateScene();

    updateProgress();

    updateTimer();

}


/* ==========================================
   FIND CURRENT SCENE
========================================== */

function updateScene() {

    let index = -1;


    for (
        let i = 0;
        i < scenes.length;
        i++
    ) {

        const scene =
            scenes[i];


        if (
            currentTime >= scene.time &&
            currentTime <
                scene.time + scene.duration
        ) {

            index = i;

            break;

        }

    }


    if (
        index !== -1 &&
        index !== currentSceneIndex
    ) {

        currentSceneIndex = index;

        loadScene(
            scenes[index]
        );

    }

}


/* ==========================================
   LOAD SCENE
========================================== */

function loadScene(scene) {

    /* fade */

    fade.style.opacity = "1";


    setTimeout(() => {

        chapter.textContent =
            scene.chapter;

        title.textContent =
            scene.title;

        narration.textContent =
            scene.text;


        sky.style.background =
            scene.sky;
       
/* Select a landscape for each scene */
const world = document.getElementById("world");

if (scene.title === "The Garden") {
    world.dataset.landscape = "garden";
} else if (scene.title === "Earth") {
    world.dataset.landscape = "earth";
} else {
    world.dataset.landscape = "mountains";
}



        /* stars */

        stars.style.opacity =
            scene.stars
                ? ".45"
                : "0";


        /* human symbolism */

        if (scene.human) {

            human.style.opacity = ".45";

            human.style.transform =
                "translateX(-50%) scale(1)";

        }

        else {

            human.style.opacity = "0";

            human.style.transform =
                "translateX(-50%) scale(.7)";

        }


        /* reset text animation */

        cinematicText
            .classList
            .remove("showText");


        setTimeout(() => {

            cinematicText
                .classList
                .add("showText");

        }, 200);


        /* cinematic camera */

        mountains.style.transform =
            `scale(${1 + Math.random() * .08})`;


        fade.style.opacity = "0";


    }, 1000);

}


/* ==========================================
   PROGRESS
========================================== */

function updateProgress() {

    const percentage =
        (currentTime / movieLength) * 100;


    progress.style.width =
        percentage + "%";

}


/* ==========================================
   TIMER
========================================== */

function updateTimer() {

    const minutes =
        Math.floor(currentTime / 60);

    const seconds =
        Math.floor(currentTime % 60);


    timer.textContent =

        String(minutes)
            .padStart(2, "0")

        + ":" +

        String(seconds)
            .padStart(2, "0");
}


/* ==========================================
   PAUSE
========================================== */

document
    .getElementById("pauseBtn")
    .addEventListener(
        "click",
        () => {

            playing = false;

            cancelAnimationFrame(
                animationFrame
            );

        }
    );


/* ==========================================
   PLAY
========================================== */

document
    .getElementById("playBtn")
    .addEventListener(
        "click",
        () => {

            if (currentTime >= movieLength) {

                restartMovie();

                return;

            }


            if (!playing) {

                playing = true;

                lastTimestamp = null;

                animationFrame =
                    requestAnimationFrame(
                        movieLoop
                    );

            }

        }
    );


/* ==========================================
   RESTART
========================================== */

document
    .getElementById("restartBtn")
    .addEventListener(
        "click",
        restartMovie
    );


function restartMovie() {

    cancelAnimationFrame(
        animationFrame
    );


    currentTime = 0;

    currentSceneIndex = -1;

    playing = false;

    ending.style.display = "none";

    ending.style.opacity = "0";

    intro.style.display = "flex";

    intro.style.opacity = "1";

    fade.style.opacity = "1";

    progress.style.width = "0%";

    timer.textContent = "00:00";

}


/* ==========================================
   FINISH
========================================== */

function finishMovie() {

    playing = false;

    cancelAnimationFrame(
        animationFrame
    );


    ending.style.display =
        "flex";


    setTimeout(() => {

        ending.style.opacity = "1";

    }, 100);

}


/* ==========================================
   KEYBOARD CONTROLS
========================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.code === "Space") {

            event.preventDefault();

            if (playing) {

                document
                    .getElementById(
                        "pauseBtn"
                    )
                    .click();

            }

            else {

                document
                    .getElementById(
                        "playBtn"
                    )
                    .click();

            }

        }


        if (event.code === "KeyR") {

            restartMovie();

        }

    }
);
