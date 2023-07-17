export const createTitle = (h, cls, text) => {
    const title = document.createElement(h);
    title.classList.add(cls);
    title.textContent = text;

    return title;
}