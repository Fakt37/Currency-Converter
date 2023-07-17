export async function fetchExchangeRates() {
    try {
        const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
        const data = await response.json();

        return data;
    } catch (error) {
        console.log('Ошибка при получении данных о курсах валют:', error);
    }
}
