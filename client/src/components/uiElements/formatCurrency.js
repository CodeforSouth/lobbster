export default function formatCurrency(amount, maxSpaces) {
  // Compute spaces between dollar sign and amount.
  const space = '\u00A0';
  let spaces = space;
  let digits = 0;
  let amountCopy = amount;
  // A do-while loop is used to handle the amount === 0 case correctly.
  do {
    amountCopy = Math.floor(amountCopy / 10);
    digits += 1;
  } while (amountCopy);
  const padding = maxSpaces - 1 - digits;
  for (let i = 0; i < padding; i += 1) {
    spaces += space;
  }

  // Build the string.
  return `$${spaces}${amount.toFixed(2)}`;
}
