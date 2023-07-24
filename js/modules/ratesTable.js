export const createCurrencyRatesTable = (data) => {
    const container = document.createElement('div');
    container.classList.add('currency-rates__table-container');

    const createFlagIcon = (currencyCode) => {
        const flagSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        flagSvg.classList.add('table__icon');

        const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');
        useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', `img/sprite.svg#${currencyCode}`);

        flagSvg.appendChild(useElement);

        const serializer = new XMLSerializer();
        return serializer.serializeToString(flagSvg);
    };

    const redrawTable = () => {
        const isMobileResolution = window.matchMedia('(max-width: 1024px)').matches;

        if (isMobileResolution) {
            const table = document.createElement('table');
            table.classList.add('currency-rates__table', 'table');

            const tbody = document.createElement('tbody');
            tbody.classList.add('table__body');

            const createRow = (attributeName, dataValue) => {
                const trRow = document.createElement('tr');
                trRow.classList.add('table__row');

                const tdAttribute = document.createElement('td');
                tdAttribute.classList.add('table__body-td', 'table__body-attribute');
                tdAttribute.textContent = attributeName;

                const tdData = document.createElement('td');
                tdData.classList.add('table__body-td', 'table__body-data');
                tdData.innerHTML = dataValue;

                trRow.append(tdAttribute, tdData);

                return trRow;
            };

            for (const [currencyCode, currencyData] of Object.entries(data)) {
                const flagIcon = createFlagIcon(currencyData.CharCode);
                const currencyCodeCell = `<div class="table__body-code-wrapper">${flagIcon}<span class="table__body-code">${currencyData.CharCode}</span></div> `;
                tbody.append(createRow('Код', currencyCodeCell));
                tbody.append(createRow('Единица', `${currencyData.Nominal}`));
                tbody.append(createRow('Валюта', `${currencyData.Name} (${currencyData.CharCode})`));
                tbody.append(createRow('Курс базовой валюты', `${currencyData.Value}`));
            }

            table.append(tbody);
            container.innerHTML = '';
            container.append(table);
        } else {
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

            trHead.append(thCode, thUnit, thCurrency, thExchangeRate);
            thead.append(trHead);

            table.append(thead);

            const tbody = document.createElement('tbody');
            tbody.classList.add('table__body');

            for (const [currencyCode, currencyData] of Object.entries(data)) {
                const trBody = document.createElement('tr');
                trBody.classList.add('table__body-tr');

                const tdCode = document.createElement('td');
                tdCode.classList.add('table__body-td', 'table__body-code');

                const tdCodeWrapper = document.createElement('div');
                tdCodeWrapper.classList.add('table__body-code-wrapper');

                const flagSvg = createFlagIcon(currencyData.CharCode);
                tdCodeWrapper.innerHTML = flagSvg;

                const codeSpan = document.createElement('span');
                codeSpan.classList.add('table__body-code');
                codeSpan.textContent = currencyData.CharCode;
                tdCodeWrapper.appendChild(codeSpan);

                tdCode.append(tdCodeWrapper);

                const tdUnit = document.createElement('td');
                tdUnit.classList.add('table__body-td', 'table__body-unit');
                tdUnit.textContent = currencyData.Nominal;

                const tdCurrency = document.createElement('td');
                tdCurrency.classList.add('table__body-td', 'table__body-currency');
                tdCurrency.textContent = currencyData.Name;

                const tdExchangeRate = document.createElement('td');
                tdExchangeRate.classList.add('table__body-td', 'table__body-rate');
                tdExchangeRate.textContent = currencyData.Value;

                trBody.append(tdCode, tdUnit, tdCurrency, tdExchangeRate);
                tbody.append(trBody);
            }

            table.append(tbody);
            container.innerHTML = '';
            container.append(table);
        }
    };

    redrawTable();
    window.addEventListener('resize', redrawTable);

    return container;
};
