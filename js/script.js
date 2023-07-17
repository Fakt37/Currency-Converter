import { createConverter } from "./modules/converter.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const main = document.getElementById('main');
        main.append(await createConverter());
    } catch (error) {
        console.log('Ошибка при инициализации конвертера:', error);
    }
});


// const amountInput = document.getElementById("amount");
// const fromCurrencySelect = document.getElementById("from");
// const toCurrencySelect = document.getElementById("to");
// const resultOutput = document.getElementById("result");


// function fetchExchangeRates() {
//     fetch('https://www.cbr-xml-daily.ru/daily_json.js')
//         .then(response => response.json())
//         .then(data => {
//             amountInput.addEventListener('input', () => {
//                 convertCurrency(data);
//             });
//         })
//         .catch(error => {
//             console.log('Ошибка при получении данных о курсах валют:', error);
//         });
// }

// function convertCurrency(data) {
//     let fromCurrencyCode = ""; // Переменная для хранения кода исходной валюты
//     let toCurrencyCode = ""; // Переменная для хранения кода целевой валюты

//     fromCurrencySelect.addEventListener('change', (event) => {
//         fromCurrencyCode = event.target.value;
//     });

//     toCurrencySelect.addEventListener('change', (event) => {
//         toCurrencyCode = event.target.value;
//     });

//     // Получение курса валют из данных
//     const exchangeRateFrom = fromCurrencyCode === "RUB" ? 1 : fromCurrencyCode;
//     const exchangeRateTo = toCurrencyCode;

//     console.log(exchangeRateFrom);

//     // Расчет конверсии
//     let result;
//     if (fromCurrencyCode === "RUB") {
//         result = amountInput.value / exchangeRateTo;
//     } else {
//         result = (amountInput.value * exchangeRateFrom) / exchangeRateTo;
//     }

//     // Отображение результата
//     resultOutput.value = result.toFixed(2);
// }