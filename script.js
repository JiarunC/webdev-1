const maxCount = 30;
let count = 0;
const grasses = [];

const body = document.querySelector('main');

const grassInterval = setInterval(() => {
    if (count <= maxCount) {

        const tmp = document.createElement('div');
        body.appendChild(tmp);
        tmp.style.position = 'absolute';
        tmp.style.top = 0;
        tmp.style.right = 0;
    }
}, 2000);
