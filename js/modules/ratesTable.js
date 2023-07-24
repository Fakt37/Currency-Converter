export const createCurrencyRatesTable = (data) => {
    const container = document.createElement('div');
    container.classList.add('currency-rates__table-container');

    const table = document.createElement('table');
    table.classList.add('currency-rates__table', 'table');

    const thead = document.createElement('thead');
    thead.classList.add('table__head');

    const trHead = document.createElement('tr');
    trHead.classList.add('table__head-tr');

    const thCode = document.createElement('th');
    thCode.classList.add('table__head-th');
    thCode.textContent = 'Код';

    const thUnit = document.createElement('th');
    thUnit.classList.add('table__head-th');
    thUnit.textContent = 'Единица';

    const thCurrency = document.createElement('th');
    thCurrency.classList.add('table__head-th');
    thCurrency.textContent = 'Валюта';

    const thExchangeRate = document.createElement('th');
    thExchangeRate.classList.add('table__head-th');
    thExchangeRate.textContent = 'Курс базовой валюты';

    const tbody = document.createElement('tbody');
    tbody.classList.add('table__body');

    for (const [currencyCode, currencyData] of Object.entries(data)) {
        const trBody = document.createElement('tr');
        trBody.classList.add('table__body-tr');

        const tdCode = document.createElement('td');
        tdCode.classList.add('table__body-td');

        const tdCodeWrapper = document.createElement('div')
        tdCodeWrapper.classList.add('table__body-code-wrapper')

        const flagSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        flagSvg.classList.add('table__icon');
        flagSvg.innerHTML = `<use xlink:href="img/sprite.svg#${currencyData.CharCode}" />`;

        tdCodeWrapper.appendChild(flagSvg);

        const codeSpan = document.createElement('span');
        codeSpan.classList.add('table__body-code')
        codeSpan.textContent = currencyData.CharCode;
        tdCodeWrapper.appendChild(codeSpan);

        tdCode.append(tdCodeWrapper)

        const tdUnit = document.createElement('td');
        tdUnit.classList.add('table__body-td');
        tdUnit.textContent = currencyData.Nominal;

        const tdCurrency = document.createElement('td');
        tdCurrency.classList.add('table__body-td');
        tdCurrency.textContent = currencyData.Name;

        const tdExchangeRate = document.createElement('td');
        tdExchangeRate.classList.add('table__body-td');
        tdExchangeRate.textContent = currencyData.Value;

        trBody.append(tdCode, tdUnit, tdCurrency, tdExchangeRate);
        tbody.append(trBody);
    }

    trHead.append(thCode, thUnit, thCurrency, thExchangeRate);
    thead.append(trHead);

    table.append(thead);
    table.append(tbody);

    container.append(table);

    return container;
}
