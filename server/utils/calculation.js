export const calculateBill = ({ category, units, demand }) => {
  const FCA = 0.34;
  const FPPAS = -0.0063;

  let energy = 0;

  if (category === "domestic") {
    if (units <= 50) energy = units * 4.71;
    else if (units <= 150)
      energy = 50 * 4.71 + (units - 50) * 5.67;
    else if (units <= 300)
      energy =
        50 * 4.71 +
        100 * 5.67 +
        (units - 150) * 7.05;
    else
      energy =
        50 * 4.71 +
        100 * 5.67 +
        150 * 7.05 +
        (units - 300) * 7.24;
  }

  if (category === "commercial") {
    energy = units * 8.5;
  }

  if (category === "industrial") {
    energy = units * 6.5 + demand * 250;
  }

  const fca = units * FCA;
  const fppas = energy * FPPAS;
  const total = energy + fca + fppas;

  return { energy, fca, fppas, total };
};