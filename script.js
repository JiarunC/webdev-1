const maxCount = 15;
let count = 0;
let grasses = 0;
let progress = 100;
const offset = 100;

const body = document.querySelector('body');
const form = document.querySelector("form");
const submitOutput = document.querySelector(".submit-output");
const progressBar = document.querySelector(".progress-bar");
const activationBtn = document.querySelector("#activation-input");
const scoreContainer = document.querySelector(".score-container");
const score = document.querySelector(".score");

let outputInterval = -1;
form.addEventListener('submit', () => {
    submitOutput.style.display = 'flex';
    progress = 100;

    if (outputInterval >= 0) {
        // intentional
        // renews progress
        // but does not create a new interval
        return;
    }

    outputInterval = setInterval(() => {
        progress--;
        progressBar.style.width = `${progress}%`;
        if (progress <= 0) {
            submitOutput.style.display = 'none';
            clearInterval(outputInterval);
            outputInterval = -1;
        }
    }, 50)
})

let grassSpawnInterval = -1;
activationBtn.addEventListener('click', () => {
    if (grassSpawnInterval >= 0) {
        return;
    }
    if (activationBtn.checked === true) {
        count = 0;
        scoreContainer.style.display = 'flex';
        grassSpawnInterval = setInterval(() => {
            console.log(count)
            const grassDiv = document.createElement('div');
            body.appendChild(grassDiv);
            grassDiv.classList.add('grass');
            const imgNumber = Math.ceil(Math.random() * 4);
            const grassImg = document.createElement('img');
            grassImg.src = `images/grass${imgNumber}.png`;
            grassImg.style.width = '80px';
            grassImg.style.margin = 'auto';
            grassDiv.appendChild(grassImg);

            const r = Math.random();
            let x = 0;
            let y = 0;
            if (r < .2) {
                grassDiv.style.top = `${-offset}px`;
                const left = Math.random() * window.innerWidth;
                grassDiv.style.left = `${left}px`;
                y = window.innerHeight + 2 * offset;
                x = Math.random() * window.innerWidth;
                if (left > .5 * window.innerWidth) {
                    x = -x;
                }
            } else if (r < .6) {
                grassDiv.style.left = `${-offset}px`;
                const top = Math.random() * window.innerHeight;
                grassDiv.style.top = `${top}px`;
                x = window.innerWidth + 2 * offset;
                y = Math.random() * window.innerHeight;
                if (top > .5 * window.innerWidth) {
                    y = -y;
                }
            } else {
                grassDiv.style.right = `${-offset}px`;
                const top = Math.random() * window.innerHeight;
                grassDiv.style.top = `${top}px`;
                x = -window.innerWidth - 2 * offset;
                y = Math.random() * window.innerHeight;
                if (top > .5 * window.innerWidth) {
                    y = -y;
                }
            }

            setTimeout(() => {
                grassDiv.style.transform = `translate(${x}px, ${y}px)`
            }, 100);


            grassDiv.addEventListener('click', () => {
                grasses++;
                grassDiv.remove();
                score.textContent = `${grasses}`;
            })
            setTimeout(() => {
                grassDiv.remove();
            }, 10000);
            count++;
            if (count >= maxCount) {
                clearInterval(grassSpawnInterval);
                grassSpawnInterval = -1;
                setTimeout(() => {
                    scoreContainer.style.display = 'none';
                }, 10000);
            }
        }, 1500);
    }
})





