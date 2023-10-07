const { JSDOM } = require("jsdom");

const normalizeURL = (location) => {
    const url = new URL(location);
    let normalized = `${url.host}${url.pathname}`;
    if (normalized.length > 0 && normalized.slice(-1) === "/") {
        normalized = normalized.slice(0, -1);
    }
    return normalized;
};

const getURLsFromHTML = (htmlBody, baseURL) => {
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll("a");
    for (const linkElement of linkElements) {
        href = linkElement.href;
        if (href.slice(0, 1) === "/") {
            location = `${baseURL}${linkElement.href}`;
            try {
                new URL(location);
                urls.push(location);
            } catch (err) {
                console.log(`invalid relative url: ${err.message}`);
            }
        } else {
            location = linkElement.href;
            try {
                new URL(location);
                urls.push(location);
            } catch (err) {
                console.log(`invalid absolute url: ${err.message}`);
            }
        }
    }
    return urls;
};

module.exports = {
    normalizeURL,
    getURLsFromHTML,
};
