const normalizeURL = (location) => {
    const url = new URL(location);
    let normalized = `${url.host}${url.pathname}`;
    if (normalized.length > 0 && normalized.slice(-1) === "/") {
        normalized = normalized.slice(0, -1);
    }
    return normalized;
};

module.exports = {
    normalizeURL,
};
