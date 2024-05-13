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
    let urls = []
    const dom = new JSDOM(htmlBody);
    const anchors = dom.window.document.querySelectorAll('a');
    for (const anchor of anchors) {
        if (anchor.hasAttribute("href")) {
            let href = anchor.getAttribute("href")
            
            try {
                href = new URL(href, baseURL).href;
                urls.push(href)
            } catch (err) {
                console.log(err.message)
            }
        }
    }
    return urls;
}

export { normalizeUrl, getURLsFromHTML };