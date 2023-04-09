export enum Label {
  newsoutlet = 'newsoutlet',
  'youtube-channel' = 'youtube-channel',
}

interface DataSource {
  name: string;
  url: string;
  label: Label;
  globs: string[];
  regex?: string;
}

const dataSourcesToCrawl: DataSource[] = [
  {
    name: 'coindesk',
    url: 'https://www.coindesk.com/arc/outboundfeeds/rss/',
    label: Label.newsoutlet,
    globs: ['https://www.coindesk.com/**/__DATE__/**'],
    regex: `^https://www.coindesk.com/[a-z-]+/__DATE__\\/[a-z0-9-]+\\/?`,
  },
  {
    name: 'cointelegraph',
    url: 'https://cointelegraph.com/',
    label: Label.newsoutlet,
    globs: ['https://cointelegraph.com/tags/**'],
  },
  {
    name: 'cryptoslate',
    url: 'https://cryptoslate.com/',
    label: Label.newsoutlet,
    globs: ['https://cryptoslate.com/category/**'],
  },
  {
    name: 'theblockcrypto',
    url: 'https://www.theblockcrypto.com/',
    label: Label.newsoutlet,
    globs: ['https://www.theblockcrypto.com/category/**'],
  },
  {
    name: 'cryptobriefing',
    url: 'https://cryptobriefing.com/',
    label: Label.newsoutlet,
    globs: ['https://cryptobriefing.com/category/**'],
  },
  {
    name: 'decrypt',
    url: 'https://decrypt.co/',
    label: Label.newsoutlet,
    globs: ['https://decrypt.co/category/**'],
  },
  {
    name: 'newsbtc',
    url: 'https://www.newsbtc.com/',
    label: Label.newsoutlet,
    globs: ['https://www.newsbtc.com/category/**'],
  },
  {
    name: 'bitcoinmagazine',
    url: 'https://bitcoinmagazine.com/',
    label: Label.newsoutlet,
    globs: ['https://bitcoinmagazine.com/category/**'],
  },
  {
    name: 'beincrypto',
    url: 'https://beincrypto.com/',
    label: Label.newsoutlet,
    globs: ['https://beincrypto.com/category/**'],
  },

  {
    name: 'cointelegraphy',
    url: 'https://cointelegraphy.com/',
    label: Label.newsoutlet,
    globs: ['https://cointelegraphy.com/category/**'],
  },
];

export default dataSourcesToCrawl;
