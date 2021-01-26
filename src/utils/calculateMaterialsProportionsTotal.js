export default function calculateProportionsTotal(materials) {
  return materials.reduce((accumulator, currentMaterial) => {
    const { proportion } = currentMaterial;
    return accumulator + (proportion ? proportion : 0);
  }, 0);
}
