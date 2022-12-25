export  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function formatTimestamptoDate(initdate){
    let date = JSON.stringify(initdate)
    return date.slice(1,11)
}
