export const randomRange = (min, max) => min + Math.random() * (max - min);

export const randomIndex = (array) => randomRange(0, array.length) | 0;

export const removeFromArray = (array, i) => array.splice(i, 1)[0];

export const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item));

export const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array));

export const getRandomFromArray = (array) => (
  array[randomIndex(array) | 0]
);