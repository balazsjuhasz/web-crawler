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

const crawlPage = async (url) => {
    try {
        const response = await fetch(url);
        if (response.status >= 400) {
            console.log(
                `Unexpected status code: ${response.status} for page: ${url}`
            );
            return;
        }
        const contentType = response.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(
                `Unexpected Content-Type received: ${contentType} for page ${url}`
            );
            return;
        }
        const body = await response.text();
        console.log(body);
    } catch (err) {
        console.log(`Can not crawl url: ${url}. Message: ${err.message}`);
    }
};

module.exports = {
    crawlPage,
    getURLsFromHTML,
    normalizeURL,
};
