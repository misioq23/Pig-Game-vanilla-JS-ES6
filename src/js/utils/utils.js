const removeSpace = name => name.split(' ').join('_');
const randomNumber = () => Math.floor(Math.random() * 6) + 1;
export { removeSpace, randomNumber };
