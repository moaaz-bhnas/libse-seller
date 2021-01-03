const generateProductName = (locale, product) => {
  const category = product[`category_${locale}`];
  const sub_category = product[`sub_category_${locale}`];
  const { details } = product;
  const group = details[0][`value_${locale}`];

  return `${sub_category} ${category} ${group}`;
};

export default generateProductName;
