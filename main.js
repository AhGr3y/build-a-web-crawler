import { argv } from 'node:process';

import { crawlPage } from './crawl.js';
import { printReport  } from './report.js';

async function main() {

    // send error message if number of args passed to main is not 1
    if (argv.length !== 3) {
        console.log('Invalid number of argument(s), please input only ONE argument.');
        return;
    }

    const baseUrl = argv[2];
    console.log(`Web crawler is crawling towards '${baseUrl}' now...`);
    const pages = await crawlPage(baseUrl);
    printReport(pages);
}

main();