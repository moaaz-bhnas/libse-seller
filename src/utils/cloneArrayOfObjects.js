export default function cloneArrayOfObjects(array) {
  return array.map((object) => Object.assign({}, object));
}
