import { createConverter } from "./modules/converter.js";
import { createCurrencyRates } from "./modules/currency-rates.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const main = document.getElementById('main');
        main.append(await createConverter(), await createCurrencyRates());
    } catch (error) {
        console.log('Ошибка при инициализации конвертера:', error);
    }
});