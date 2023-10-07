const { test, expect } = require("@jest/globals");
const { normalizeURL, getURLsFromHTML } = require("./crawl.js");

const normalizedURL = "blog.boot.dev/path";

test("normalizeURL strip https protocol and ending slash", () => {
    const actual = normalizeURL("https://blog.boot.dev/path/");
    expect(actual).toBe(normalizedURL);
});

test("normalizeURL strip https protocol", () => {
    const actual = normalizeURL("https://blog.boot.dev/path");
    expect(actual).toBe(normalizedURL);
});

test("normalizeURL strip http protocol and ending slash", () => {
    const actual = normalizeURL("http://blog.boot.dev/path/");
    expect(actual).toBe(normalizedURL);
});

test("normalizeURL strip http protocol without slash", () => {
    const actual = normalizeURL("http://blog.boot.dev/path");
    expect(actual).toBe(normalizedURL);
});

test("getURLsFromHTML gets absolute URLS", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path/">Absolute path</a>
        </body>
    </html>`;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML gets relative URLS", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="/path/">Relative path</a>
        </body>
    </html>`;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = ["https://blog.boot.dev/path/"];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML gets multiple URLS", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="https://blog.boot.dev/path1/">Path one url</a>
            <a href="/path2/"> Path two url</a>
        </body>
    </html>`;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [
        "https://blog.boot.dev/path1/",
        "https://blog.boot.dev/path2/",
    ];
    expect(actual).toEqual(expected);
});

test("getURLsFromHTML not gets invalid url", () => {
    const inputHTMLBody = `
    <html>
        <body>
            <a href="invalid">Invalid URL</a>
        </body>
    </html>`;
    const inputBaseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
});
