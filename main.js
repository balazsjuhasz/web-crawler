const { crawlPage } = require("./crawl.js");
const { printReport } = require("./report.js");

const main = async () => {
    if (process.argv.length < 3) {
        console.log("Too few arguments, baseURL is expected");
        process.exit(1);
    } else if (process.argv.length > 3) {
        console.log("Too many arguments, only baseURL is expected");
        process.exit(1);
    }

    const baseURL = process.argv[2];
    console.log(`Starting crawl at base url: ${baseURL}`);
    pages = await crawlPage(baseURL, baseURL, {});
    printReport(pages);
};

main();
