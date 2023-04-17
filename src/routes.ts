import { Dataset, createCheerioRouter, EnqueueStrategy } from 'crawlee';
import { extractFromHtml } from '@extractus/article-extractor';
import summarize from 'summarize';

const router = createCheerioRouter();

const today = new Date().toISOString().slice(0, 10).replace(/-/g, '/');

router.addDefaultHandler(async ({ request, enqueueLinks, log }) => {
  log.info(`enqueueing new URLs`);
  log.debug(`Processing ${request.url}...`);
  await enqueueLinks({
    // globs: ['https://www.coindesk.com/policy/2023/04/09/**'],
    strategy: EnqueueStrategy.SameDomain,
    transformRequestFunction(req) {
      if (req.url.includes('coindesk.com')) {
        if (!req.url.includes(today)) return false;
      }
      // ignore all links ending with `.png` or `.jpg`
      if (req.url.endsWith('.png') || req.url.endsWith('.jpg')) return false;
      return req;
    },
    // label: 'detail',
  });
});

router.addHandler('newsoutlet', async ({ request, $, log }) => {
  const title = $('title').text();
  log.info(`${title}`, { url: request.loadedUrl });

  let articleContent: string | undefined;

  try {
    const html = $('html').html();
    if (html) {
      const article = await extractFromHtml(html, request.loadedUrl);
      articleContent = article?.content;
    }
  } catch (error) {
    console.error(`error extracting article from ${request.loadedUrl}`);
    console.error(error);
    return;
  }

  const element = await $('script[type="application/ld+json"]').html();
  if (element) {
    const json = JSON.parse(element);
    // find the article datePublished
    json['@graph']?.find((item: any) => {
      if (item['@type'] === 'Article' || item['@type'] === 'NewsArticle') {
        log.debug(item.datePublished);
        if (item.datePublished) {
          const date = new Date(item.datePublished);
          const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '/');
          if (dateStr !== today) {
            // ignore this article
            log.info('ignoring article');
            return true;
          }
        }
      } else {
        return false;
      }
    });
  }
  // get the date from the content
  // const date = $('[data-hid="ldjson-schema"]').html(); //.attr('datetime');
  // log.info(element);

  //e.g. for cointelegraph

  let summary: string | undefined;
  if (articleContent) {
    summary = await summarize({ text: articleContent });
  }

  if (!summary) {
    log.error(`no summary for ${request.loadedUrl}`);
    throw new Error(`no summary for ${request.loadedUrl}`);
  }

  await Dataset.pushData({
    uniqueKey: request.loadedUrl,
    // hash
    // or uniqueKey?
    url: request.loadedUrl,
    title,
    article: articleContent,
    summary,
  });
});

export default router;
