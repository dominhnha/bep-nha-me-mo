export  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function formatTimestamptoDate(initdate){
    let date = JSON.stringify(initdate)
    return date.slice(1,11)
}
export const convertVNDtoUSD = (price) =>
  (parseFloat(price) * 0.00004).toFixed(2);

export const covertToDate = (dateString) => {
  const date = new Date(Date.parse(dateString));
  const formattedDate = `${date.getDate()}-${
    date.getMonth() + 1
  }-${date.getFullYear()}`;

  return formattedDate;
};