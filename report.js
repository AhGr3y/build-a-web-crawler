function printReport(pages) {

    console.log('==============');
    console.log("Page Report");
    console.log('==============');

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
    let sortedEntries = entries.sort((a, b) => {
        // sort alphabetically by key if value is the same
        if (a[1] === b[1]) {
            return a[0].localeCompare(b[0]);
        }
        return b[1] - a[1];
    });

    return sortedEntries;
}

export { sortPages, printReport };