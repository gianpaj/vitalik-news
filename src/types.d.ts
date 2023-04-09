// {"id":"xfN6EWrHykcZLZRVKV","created":"2023-04-09T12:04:58.599Z","input":{"output_format":"mp3","quality":"medium","sample_rate":24000,"seed":null,"speed":1,"text":"Thailand's opposition party has promised to deliver approximately bn to the country's citizens in the form of digital tokens. The Pheu Thai-led government plans to distribute 10,000 baht () each to approximately 55 million citizens aged 16 and over. The funds will be distributed using digital wallets built on blockchain technology. The party has also promised to triple farm income and introduce a minimum monthly household income guarantee.","voice":"s3://voice-cloning-zero-shot/8056212d-32e6-4302-a801-10abb2d44100/vitalik-50s-v1/manifest.json"},"output":null,"_links":[{"contentType":"application/json","description":"Fetches this job's data. Poll it for the latest status.","href":"https://play.ht/api/v2/tts/xfN6EWrHykcZLZRVKV","method":"GET","rel":"self"},{"contentType":"text/event-stream","description":"Fetches (live) the task status (in SSE/text stream format) as the generation progresses.","href":"https://play.ht/api/v2/tts/xfN6EWrHykcZLZRVKV?format=event-stream","method":"GET","rel":"related"},{"contentType":"text/audio/mpeg","description":"Streams the audio bytes.","href":"https://play.ht/api/v2/tts/xfN6EWrHykcZLZRVKV?format=audio-mpeg","method":"GET","rel":"related"}]}

declare interface PlayHTAPITTSResponse {
  id: string;
  created: string;
  input: {
    output_format: string;
    quality: string;
    sample_rate: number;
    seed: any;
    speed: number;
    text: string;
    voice: string;
  };
  output: any;
  _links: {
    contentType: string;
    description: string;
    href: string;
    method: string;
    rel: string;
  }[];
}
