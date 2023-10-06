const { test, expect } = require("@jest/globals");
const { normalizeURL } = require("./crawl.js");

const normalizedURL = "blog.boot.dev/path";

test("Normalizes https protocol and ending slash", () => {
    expect(normalizeURL("https://blog.boot.dev/path/")).toBe(normalizedURL);
});

test("Normalizes https protocol", () => {
    expect(normalizeURL("https://blog.boot.dev/path")).toBe(normalizedURL);
});

test("Normalizes http protocol and ending slash", () => {
    expect(normalizeURL("http://blog.boot.dev/path/")).toBe(normalizedURL);
});

test("Normalizes http protocol without slash", () => {
    expect(normalizeURL("http://blog.boot.dev/path")).toBe(normalizedURL);
});
