const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const generateLastSixMonthsData = () => {
    const currentDate = new Date();
    const data = [];
    for (let i = 5; i >= 0; i--) {
        const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        data.push({
            month: `${month} ${year}`,
            sales: randomInt(4000, 10000),
            users: randomInt(100, 1000),
            orders: randomInt(10,1000)
        });
    }
    return data;
}; 