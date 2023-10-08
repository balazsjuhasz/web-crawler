const SEPARATOR = "=================";

const sortPages = (pages) => {
    const pagesArr = Object.entries(pages);
    pagesArr.sort((a, b) => {
        return b[1] - a[1];
    });
    return pagesArr;
};

const printReport = (pages) => {
    console.log(SEPARATOR);
    console.log("Starting report...");
    console.log(SEPARATOR);
    const sortedPages = sortPages(pages);
    for (const page of sortedPages) {
        console.log(`Found ${page[1]} internal links to ${page[0]}`);
    }
    console.log(SEPARATOR);
    console.log("Ending report...");
    console.log(SEPARATOR);
};

module.exports = {
    sortPages,
    printReport,
};
