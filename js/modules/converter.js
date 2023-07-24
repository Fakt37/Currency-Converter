import { createContainer } from "../utils/container.js";
import { fetchExchangeRates } from "../utils/fetchExchangeRates.js";
import { createSection } from "../utils/section.js";
import { createTitle } from "../utils/title.js";

const createSelect = async (id, data) => {
    const select = document.createElement('select');
    select.classList.add('currency-input__select');
    select.id = id;

    const setOptionText = (currencyCode) => {
        if (window.matchMedia('(max-width: 768px)').matches) {
            return data.Valute[currencyCode].CharCode;
        } else {
            return `${data.Valute[currencyCode].Name} ${data.Valute[currencyCode].CharCode}`;
        }
    };

    for (let currencyCode in data.Valute) {
        const option = document.createElement('option');
        option.value = currencyCode;
        option.text = setOptionText(currencyCode);
        select.appendChild(option);
    }

    return select;
};



const createCurrencyInput = (labelText, select, oppositeSelect, data) => {
    let amountInputFrom = null;

    const currencyInput = document.createElement('div');
    currencyInput.classList.add(`converter__${select.id}`, 'currency-input');

    const label = document.createElement('label');
    label.classList.add('currency-input__label');
    label.textContent = labelText;
    label.htmlFor = select.id;

    const selectWrapper = document.createElement('div');
    selectWrapper.classList.add('currency-input__select-wrapper');
    selectWrapper.append(select);

    const amountInputId = `amount_${select.id}`;
    const amountInput = document.createElement('input');
    amountInput.classList.add('currency-input__amount');
    amountInput.type = 'number';
    amountInput.id = amountInputId;

    if (amountInputId === 'amount_to') {
        amountInput.readOnly = true;
    } else {
        amountInput.addEventListener('input', () => {
            const fromAmount = amountInput.value;
            const fromCurrency = select.value;
            const toCurrency = oppositeSelect.value;

            const exchangeRateFrom = data.Valute[fromCurrency].Value;
            const exchangeRateTo = data.Valute[toCurrency].Value;

            const result = (fromAmount * exchangeRateFrom) / exchangeRateTo;

            const amountInputTo = document.getElementById('amount_to');
            amountInputTo.value = result.toFixed(2);
        });
    }

    amountInputFrom = amountInput;

    currencyInput.append(label, selectWrapper, amountInput);

    return currencyInput;
};

const createConverterWrapper = async (data) => {
    const converterWrapper = document.createElement('div');
    converterWrapper.classList.add('converter__wrapper');

    const selectFrom = await createSelect('from', data);
    const selectTo = await createSelect('to', data);

    const amountInputFrom = createCurrencyInput('У меня имеется', selectFrom, selectTo, data);
    const swapButton = createSwapButton();
    const amountInputTo = createCurrencyInput('Хочу приобрести', selectTo, selectFrom, data);

    amountInputTo.querySelector('input').readOnly = true;

    converterWrapper.append(amountInputFrom, swapButton, amountInputTo);

    const performConversionAndUpdate = () => {
        const fromAmount = amountInputFrom.querySelector('input').value;
        const fromCurrency = amountInputFrom.querySelector('select').value;
        const toCurrency = amountInputTo.querySelector('select').value;

        if (!fromAmount) {
            amountInputTo.querySelector('input').value = '';
            return;
        }

        const exchangeRateFrom = data.Valute[fromCurrency].Value;
        const exchangeRateTo = data.Valute[toCurrency].Value;

        const result = (fromAmount * exchangeRateFrom) / exchangeRateTo;

        amountInputTo.querySelector('input').value = result.toFixed(2);
    };

    selectFrom.addEventListener('change', performConversionAndUpdate);
    selectTo.addEventListener('change', performConversionAndUpdate);

    swapButton.addEventListener('click', () => {
        const tempValue = selectFrom.value;
        selectFrom.value = selectTo.value;
        selectTo.value = tempValue;

        performConversionAndUpdate();
    });

    return converterWrapper;
};

const createSwapButton = () => {
    const swapButton = document.createElement('button');
    swapButton.classList.add('converter__swap-btn');

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.classList.add('converter__swap-icon');

    const updateIcon = () => {
        const isMobile = window.matchMedia('(max-width: 1024px)').matches;
        svg.innerHTML = `<use xlink:href="img/sprite.svg#${isMobile ? 'swap-icon-mobile' : 'swap-icon'}"></use>`;
    };

    updateIcon();

    window.addEventListener('resize', updateIcon);

    swapButton.append(svg);

    return swapButton;
};

export const createConverter = async () => {
    try {
        const data = await fetchExchangeRates();
        const converter = createSection('converter');
        const container = createContainer();
        const title = createTitle('h1', 'converter__title', 'Конвертер валют');
        const converterWrapper = await createConverterWrapper(data);

        container.append(title, converterWrapper);
        converter.append(container);

        return converter;
    } catch (error) {
        console.log('Ошибка при создании конвертера:', error);
    }
};
