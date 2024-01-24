const injectedFunction = async () => {
    const linkElements = document.querySelectorAll('a[href*=".bandcamp.com/album"]') as NodeListOf<HTMLAnchorElement>;
    const hrefs = Array.from(linkElements).map(link => link.href);
    const uniqueUrls = [...new Set(hrefs)];
    const bandcampLinks = uniqueUrls.join('\n');

    // remove query params
    const sanitizedLinks = bandcampLinks.replace(/\?.*/g, "");

    try {
        await navigator.clipboard.writeText(sanitizedLinks);
    }
    catch (err) {
        console.error('Failed to copy: ', err);
    }
};

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: injectedFunction,
    });
});