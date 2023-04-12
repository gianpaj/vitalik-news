export enum Label {
  newsoutlet = 'newsoutlet',
  'youtube-channel' = 'youtube-channel',
  API = 'API',
}

interface DataSource {
  name: string;
  url: string;
  label: Label;
  globs?: string[];
  regex?: string;
  keyOfData?: string;
  keyToFilterBy?: string;
  keyWithContent?: string;
  scrape?: boolean;
}

const dataSourcesToCrawl: DataSource[] = [
  {
    name: 'coindesk',
    url: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
    label: Label.newsoutlet,
    regex: `^https://www.coindesk.com/[a-z-]+/__DATE__\\/[a-z0-9-]+\\/?`,
  },
  {
    name: 'cointelegraph',
    url: 'https://api.cointelegraph.com/api/v1/ext-news?limit=50&language=en',
    label: Label.API,
    keyOfData: 'news',
    keyWithContent: 'fulltext',
    keyToFilterBy: 'published_at.date',
    scrape: false,
  },
  // {
  //   name: 'cryptoslate',
  //   url: 'https://cryptoslate.com/',
  //   label: Label.newsoutlet,
  // },
  // {
  //   name: 'theblockcrypto',
  //   url: 'https://www.theblockcrypto.com/',
  //   label: Label.newsoutlet,
  // },
  // {
  //   name: 'cryptobriefing',
  //   url: 'https://cryptobriefing.com/',
  //   label: Label.newsoutlet,
  // },
  // {
  //   name: 'decrypt',
  //   url: 'https://decrypt.co/',
  //   label: Label.newsoutlet,
  // },
  // {
  //   name: 'newsbtc',
  //   url: 'https://www.newsbtc.com/',
  //   label: Label.newsoutlet,
  // },
  // {
  //   name: 'bitcoinmagazine',
  //   url: 'https://bitcoinmagazine.com/',
  //   label: Label.newsoutlet,
  // },
  // {
  //   name: 'beincrypto',
  //   url: 'https://beincrypto.com/',
  //   label: Label.newsoutlet,
  // },

  // {
  //   name: 'cointelegraphy',
  //   url: 'https://cointelegraphy.com/',
  //   label: Label.newsoutlet,
  // },
];

export default dataSourcesToCrawl;
