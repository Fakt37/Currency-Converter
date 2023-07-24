import { createContainer } from "../utils/container.js";
import { fetchExchangeRates } from "../utils/fetchExchangeRates.js";
import { createSection } from "../utils/section.js";
import { createTitle } from "../utils/title.js";
import { createCurrencyRatesTable } from "./ratesTable.js";

const formatDate = (date) => {
    const currentDate = new Date(date);
    const day = String(currentDate.getDate()).padStart(2, '0');
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const year = currentDate.getFullYear();
    return `${day}.${month}.${year}`;
};

export const createCurrencyRates = async () => {
    try {
        const data = await fetchExchangeRates();
        const formattedDate = formatDate(data.Date);

        const currencyRates = createSection('currency-rates');
        const container = createContainer();
        const title = createTitle('h2', 'currency-rates__title', `Курсы валют на ${formattedDate}`);
        const table = createCurrencyRatesTable(data.Valute);

        container.append(title, table);
        currencyRates.append(container);

        return currencyRates;
    } catch (error) {
        console.log('Ошибка при создании списка валют:', error);
    }
};
