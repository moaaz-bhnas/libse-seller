export default function deepClone(array) {
  return JSON.parse(JSON.stringify(array));
}
