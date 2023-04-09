import audioconcat from 'audioconcat';

const now = new Date();
const today = now.toISOString().slice(0, 10);

const audio = [
  'mp3s/intro.mp3',
  'mp3s/2023-04-09-https---cointelegraph-com-news-bitcoin-price-sets-up-for-an-explosive-move-as-ada-xlm-aave-and-cfx-turn-bullish.mp3',
  'mp3s/2023-04-09-https---cointelegraph-com-news-community-wants-arbitrum-foundation-to-return-700m-arb-to-dao-treasury.mp3',
  'mp3s/outro.mp3',
  // 'media/2.mp3'
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
