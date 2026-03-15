export function formatZAR(cents: number) {
  return `R${(cents / 100).toFixed(2)}`;
}