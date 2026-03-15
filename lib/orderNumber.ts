export function formatOrderNumber(orderId: string) {
    const numeric = parseInt(orderId.slice(-6), 36);
    return "#" + numeric.toString().padStart(4, "0");
}