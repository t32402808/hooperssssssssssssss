import gsap from 'gsap';

export const resetPeep = ({ stage, peep }) => {
  const direction = Math.random() > 0.5 ? 1 : -1;
  const offsetY = 1 - 120 * gsap.parseEase('power2.in')(Math.random());
  const startY = stage.height - peep.height + offsetY;
  let startX;
  let endX;
  
  if (direction === 1) {
    startX = -peep.width;
    endX = stage.width;
    peep.scaleX = 1.5;
  } else {
    startX = stage.width + peep.width;
    endX = 0;
    peep.scaleX = -2;
  }
  
  peep.x = startX;
  peep.y = startY;
  peep.anchorY = startY;
  
  return {
    startX,
    startY,
    endX
  };
};

export const normalWalk = ({ peep, props }) => {
  const {
    startX,
    startY,
    endX
  } = props;

  const xDuration = 10;
  const yDuration = 0.3;
  
  const tl = gsap.timeline();
  tl.timeScale(Math.random() * (1.5 - 0.5) + 0.5);
  tl.to(peep, {
    duration: xDuration,
    x: endX,
    ease: 'none'
  }, 0);
  tl.to(peep, {
    duration: yDuration,
    repeat: xDuration / yDuration,
    yoyo: true,
    y: startY - 10
  }, 0);
    
  return tl;
};