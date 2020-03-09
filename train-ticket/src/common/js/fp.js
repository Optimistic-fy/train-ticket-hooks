//将小时  分钟  秒  毫秒 设置为 0
export function getStartDate(timestamp = Date.now()){
    const target = new Date(timestamp)

    target.setHours(0)
    target.setMinutes(0)
    target.setSeconds(0)
    target.setMilliseconds(0)

    return target.getTime();
}