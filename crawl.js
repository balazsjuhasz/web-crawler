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

const crawlPage = async (baseURL, currentURL, pages) => {
    // Outside of current domain, skip
    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);
    if (baseURLObj.hostname !== currentURLObj.hostname) {
        return pages;
    }

    // Update counts
    location = normalizeURL(currentURL);
    if (location in pages) {
        pages[location]++;
        return pages;
    }

    pages[location] = 1;

    // Fetch URL
    try {
        console.log(`Craw url: ${currentURL}`);
        const response = await fetch(currentURL);
        if (response.status >= 400) {
            console.log(
                `Unexpected status code: ${response.status} for page: ${currentURL}`
            );
            return pages;
        }
        const contentType = response.headers.get("content-type");
        if (!contentType.includes("text/html")) {
            console.log(
                `Unexpected Content-Type received: ${contentType} for page ${currentURL}`
            );
            return pages;
        }
        const body = await response.text();
        const newURLs = getURLsFromHTML(body, baseURL);
        for (const url of newURLs) {
            pages = await crawlPage(baseURL, url, pages);
        }
    } catch (err) {
        console.log(
            `Can not crawl url: ${currentURL}. Message: ${err.message}`
        );
    }
    return pages;
};

module.exports = {
    crawlPage,
    getURLsFromHTML,
    normalizeURL,
};
