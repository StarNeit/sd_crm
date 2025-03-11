export const getStatistic = (data: any, path: string) => {
    if (data?.length > 0) {
        const sum = data.reduce((sum: any, item: any) => {
            return sum + (item[path] ?? 0);
        }, 0);

        const average = sum ? sum / data.length : 0;

        const lastValue = data[data.length - 1][path];

        const rate = average ? ((lastValue - average) / average) : 0;

        return {
            sum,
            rate,
            average,
        }
    } else {
        return {
            sum: 0,
            rate: 0,
            average: 0,
        }
    }
}

export const formatNumber = (num: number) => {
    return num.toLocaleString()
}

export const formatCurrency = (num: number) => {
    return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}