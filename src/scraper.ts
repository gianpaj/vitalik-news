import got from 'got';
import { ArticleData, extractFromHtml } from '@extractus/article-extractor';

async function scraper(link: string): Promise<ArticleData | null> {
  const { body: html, url } = await got(link);
  const article = await extractFromHtml(html, url);
  //   console.log(article);
  if (article) {
    return article;
  }
  return article;
}

export default scraper;
