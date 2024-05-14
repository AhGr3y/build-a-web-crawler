function printReport(pages) {

    console.log("Generating report...");

    // get sorted pages
    const sortedPages = sortPages(pages);

    // generate report
    for (const page of sortedPages) {
        // e.g. page = ['mypage/', 20]
        const url = page[0];
        const count = page[1];
        console.log(`Found ${count} internal links in '${url}'`);
    }
}

function sortPages(pages) {

    // convert pages into array of objects
    let entries = Object.entries(pages);
    // sort entries in descending order by object value
    let sortedEntries = entries.sort((a, b) => b[1] - a[1]);

    return sortedEntries;
}

export { sortPages, printReport };