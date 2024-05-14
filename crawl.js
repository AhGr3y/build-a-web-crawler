import { JSDOM } from 'jsdom';

function normalizeUrl(url) {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    let pathname = urlObj.pathname;
    if (pathname[pathname.length - 1] === '/') {
        pathname = pathname.slice(0, -1);
    }
    const fullPath = `${hostname}${pathname}`;
    return fullPath;
}

function getURLsFromHTML(htmlBody, baseURL) {
    let urls = [];
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
    for (const anchor of anchors) {
        if (anchor.hasAttribute("href")) {
            let href = anchor.getAttribute("href");
            
            try {
                href = new URL(href, baseURL).href;
                urls.push(href);
            } catch (err) {
                console.log(err.message);
            }
        }
    }
    return urls;
}

async function crawlPage(baseUrl, currentUrl = baseUrl, pages = {}) {

    // fetch and output html text of url
    console.log(`Web crawler is crawling thru '${currentUrl}' at the moment...`);

    // get url object for currentUrl
    const currentUrlObj = new URL(currentUrl, baseUrl);
    // get url object for baseUrl
    const baseUrlObj = new URL(baseUrl);
    // return pages if baseUrl and currentUrl does not have the same domain
    if (currentUrlObj.hostname !== baseUrlObj.hostname) {
        return pages;
    }

    const normCurrentUrl = normalizeUrl(currentUrl);

    // if normCurrentUrl exist in pages, increment its count by 1 and return pages
    // otherwise, create a new entry for normCurrentUrl in pages and set its count at 1
    if (!pages[normCurrentUrl]) {
        pages[normCurrentUrl] = 1;
    } else {
        pages[normCurrentUrl]++
        return pages;
    }
    
    // extract html body from currentUrl
    const htmlBody = await getHTMLFromURL(currentUrl);
    // extract urls from htmlBody
    const urls = getURLsFromHTML(htmlBody, baseUrl);

    // crawl each url in urls
    for (const url of urls) {
        pages = await crawlPage(baseUrl, url, pages);
    }

    return pages;
}

async function getHTMLFromURL(url) {

    let response;

    try {
        response = await fetch(url);
    } catch (err) {
        console.log(`Network error: ${err.message}`);
    }

    // send error message if response status code 400+; error has occurred
    if (response.status >= 400) {
        console.log(`HTTP Error: ${response.status} ${response.statusText}`);
        return;
    }
    // send error message if content type is not text/html or undefined
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes("text/html")) {
        console.log(`Got non-HTML response: ${contentType}`);
        return;
    }

    return await response.text();
}

export { normalizeUrl, getURLsFromHTML, crawlPage };