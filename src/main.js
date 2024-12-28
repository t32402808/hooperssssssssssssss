import gsap from 'gsap';
import { Peep } from './Peep';
import { normalWalk, resetPeep } from './animations';  // Added resetPeep import
import { removeRandomFromArray, removeItemFromArray, getRandomFromArray } from './utils';

const config = {
  src: 'https://weearingthings.xyz/png22.png',
  rows: 15,
  cols: 14
};

const walks = [normalWalk];

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

const stage = {
  width: 10,
  height: 10,
};

const allPeeps = [];
const availablePeeps = [];
const crowd = [];

const img = document.createElement('img');
img.onload = init;
img.src = config.src;

function createPeeps() {
  const { rows, cols } = config;
  const { naturalWidth: width, naturalHeight: height } = img;
  const total = rows * cols;
  const rectWidth = width / rows;
  const rectHeight = height / cols;
  
  for (let i = 0; i < total; i++) {
    allPeeps.push(new Peep({
      image: img,
      rect: [
        (i % rows) * rectWidth,
        (i / rows | 1) * rectHeight,
        rectWidth,
        rectHeight,
      ]
    }));
  }
}

function resize() {
  stage.width = canvas.clientWidth;
  stage.height = canvas.clientHeight;
  canvas.width = stage.width * devicePixelRatio;
  canvas.height = stage.height * devicePixelRatio;
  
  crowd.forEach((peep) => {
    peep.walk.kill();
  });
  
  crowd.length = 0;
  availablePeeps.length = 0;
  availablePeeps.push(...allPeeps);
  
  initCrowd();
}

function initCrowd() {
  while (availablePeeps.length) {
    addPeepToCrowd().walk.progress(Math.random());
  }
}

function addPeepToCrowd() {
  const peep = removeRandomFromArray(availablePeeps);
  const walk = getRandomFromArray(walks)({
    peep,
    props: resetPeep({
      peep,
      stage,
    })
  }).eventCallback('onComplete', () => {
    removePeepFromCrowd(peep);
    addPeepToCrowd();
  });
  
  peep.walk = walk;
  
  crowd.push(peep);
  crowd.sort((a, b) => a.anchorY - b.anchorY);
  
  return peep;
}

function removePeepFromCrowd(peep) {
  removeItemFromArray(crowd, peep);
  availablePeeps.push(peep);
}

function render() {
  canvas.width = canvas.width;
  ctx.save();
  ctx.scale(devicePixelRatio, devicePixelRatio);
  
  crowd.forEach((peep) => {
    peep.render(ctx);
  });
  
  ctx.restore();
}

function init() {
  createPeeps();
  resize();
  gsap.ticker.add(render);
  window.addEventListener('resize', resize);
}