export default function sortByOrder(array) {
  return array.sort((itemA, itemB) => itemA.order - itemB.order);
}
