export const twoDecimals =(value) => {
  return value.toFixed(2)
};

export const format = num => {
  return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, '$1,')
}