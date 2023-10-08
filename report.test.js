const { test, expect } = require("@jest/globals");
const { sortPages } = require("./report.js");

test("sortPages 2 pages", () => {
    const input = {
        "https://wagslane.dev/path": 1,
        "https://wagslane.dev": 5,
    };
    const actual = sortPages(input);
    const expected = [
        ["https://wagslane.dev", 5],
        ["https://wagslane.dev/path", 1],
    ];
    expect(actual).toEqual(expected);
});

test("sortPages 5 pages", () => {
    const input = {
        "https://wagslane.dev": 1,
        "https://wagslane.dev/path2": 5,
        "https://wagslane.dev/path3": 2,
        "https://wagslane.dev/path4": 8,
        "https://wagslane.dev/path5": 9,
    };
    const actual = sortPages(input);
    const expected = [
        ["https://wagslane.dev/path5", 9],
        ["https://wagslane.dev/path4", 8],
        ["https://wagslane.dev/path2", 5],
        ["https://wagslane.dev/path3", 2],
        ["https://wagslane.dev", 1],
    ];
    expect(actual).toEqual(expected);
});
