import audioconcat from 'audioconcat';

const now = new Date();
const today = now.toISOString().slice(0, 10);

const audio = [
  'mp3s/intro.mp3',
  'mp3s/2023-04-10-https---cointelegraph-com-news-bitcoin-tops-donald-trump-guns-in-america-google-trends.mp3',
  'mp3s/2023-04-10-https---cointelegraph-com-news-bitget-launches-100m-web3-fund-for-crypto-projects-in-asia.mp3',
  'mp3s/2023-04-10-https---cointelegraph-com-news-coinbase-ceo-says-bitcoin-lightning-is-something-we-ll-integrate.mp3',
  'mp3s/2023-04-10-https---cointelegraph-com-news-cpi-to-spark-dollar-massacre-5-things-to-know-in-bitcoin-this-week.mp3',
  'mp3s/2023-04-10-https---cointelegraph-com-news-ethereum-staking-deposits-dip-due-to-regulatory-pressure-and-shapella-upgrade.mp3',
  'mp3s/2023-04-10-https---cointelegraph-com-news-ethereum-validator-cashes-in-689-eth-from-mev-boost-relay.mp3',
  'mp3s/2023-04-10-https---cointelegraph-com-news-ftx-financial-controls-were-a-hodgepodge-of-apps-says-court-filings.mp3',
  'mp3s/2023-04-10-https---cointelegraph-com-news-lawyer-lays-out-his-reasoning-on-why-xrp-is-not-a-security.mp3',
  'mp3s/2023-04-10-https---cointelegraph-com-news-openai-finds-fresh-support-from-japan-amid-global-country-wide-bans.mp3',
  'mp3s/2023-04-10-https---cointelegraph-com-news-right-time-for-hong-kong-s-web3-push-despite-market-flux-financial-secretary.mp3',
  'mp3s/outro.mp3',
];
audioconcat(audio)
  .concat(`${today}.mp3`)
  .on('start', (command: string) => {
    console.log('ffmpeg process started:', command);
  })
  .on('error', (err: any, stdout, stderr) => {
    console.error('Error:', err);
    console.error('ffmpeg stderr:', stderr);
  })
  .on('end', () => {
    console.error('Audio created');
  });

//   transcription
//   Good morning. It's time for your daily dose of Vitalik news, where we give you the tastiest scoop on all things blockchain and summarize the top crypto podcasts you don't want to miss. From new product launches to regulatory updates, we've covered what's happening in the crypto world. So grab your coffee, and let's get started!


'mp3s/2023-04-10-https---cointelegraph-com-news-bitcoin-tops-donald-trump-guns-in-america-google-trends.mp3',
'mp3s/2023-04-10-https---cointelegraph-com-news-bitget-launches-100m-web3-fund-for-crypto-projects-in-asia.mp3',
'mp3s/2023-04-10-https---cointelegraph-com-news-coinbase-ceo-says-bitcoin-lightning-is-something-we-ll-integrate.mp3',
'mp3s/2023-04-10-https---cointelegraph-com-news-cpi-to-spark-dollar-massacre-5-things-to-know-in-bitcoin-this-week.mp3',
'mp3s/2023-04-10-https---cointelegraph-com-news-ethereum-staking-deposits-dip-due-to-regulatory-pressure-and-shapella-upgrade.mp3',
'mp3s/2023-04-10-https---cointelegraph-com-news-ethereum-validator-cashes-in-689-eth-from-mev-boost-relay.mp3',
'mp3s/2023-04-10-https---cointelegraph-com-news-ftx-financial-controls-were-a-hodgepodge-of-apps-says-court-filings.mp3',
'mp3s/2023-04-10-https---cointelegraph-com-news-lawyer-lays-out-his-reasoning-on-why-xrp-is-not-a-security.mp3',
'mp3s/2023-04-10-https---cointelegraph-com-news-openai-finds-fresh-support-from-japan-amid-global-country-wide-bans.mp3',
'mp3s/2023-04-10-https---cointelegraph-com-news-right-time-for-hong-kong-s-web3-push-despite-market-flux-financial-secretary.mp3',