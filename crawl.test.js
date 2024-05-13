import { test, expect } from '@jest/globals';

import { normalizeUrl, getURLsFromHTML } from './crawl';

test('getURLsFromHTML, external link', () => {
    const htmlBody = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="https://google.com"><span>Go to Google</span></a>
    </body>
</html>`;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = ["https://blog.boot.dev/", "https://google.com/"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML, multiple urls', () => {
    const htmlBody = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="/about"><span>Read more about us</span></a>
        <a href="/contact"><span>Contact us here</span></a>
    </body>
</html>`;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = ["https://blog.boot.dev/", "https://blog.boot.dev/about", "https://blog.boot.dev/contact"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML, relative url', () => {
    const htmlBody = `<html>
    <body>
        <a href="/about"><span>Read more about us</span></a>
    </body>
</html>`;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = ["https://blog.boot.dev/about"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML, no links', () => {
    const htmlBody = `<html>
    <body>
        <a><span>Go to Boot.dev</span></a>
    </body>
</html>`;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML, one link', () => {
    const htmlBody = `<html>
    <body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
    </body>
</html>`;
    const baseURL = "https://blog.boot.dev";
    const actual = getURLsFromHTML(htmlBody, baseURL);
    const expected = ["https://blog.boot.dev/"];
    expect(actual).toEqual(expected);
})

test('normalizeUrl, https', () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeUrl, slash', () => {
    const input = 'https://blog.boot.dev/path/';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeUrl, capitalize', () => {
    const input = 'https://BloG.boot.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})

test('normalizeUrl, http', () => {
    const input = 'http://BloG.boot.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
})