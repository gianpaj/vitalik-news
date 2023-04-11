import got from 'got';
import fs from 'fs';

const PLAY_HT_VOICE_ID =
  's3://voice-cloning-zero-shot/8056212d-32e6-4302-a801-10abb2d44100/vitalik-50s-v1/manifest.json';

const generateAudio = async (text: string, filename: string) => {
  try {
    const body: PlayHTAPITTSResponse = await got
      .post('https://play.ht/api/v2/tts', {
        headers: {
          AUTHORIZATION: `Bearer ${process.env.PLAY_HT_API_KEY}`,
          'X-USER-ID': process.env.PLAY_HT_USER_ID,
          accept: 'application/json', // task data
          // accept: 'text/event-stream', // stream of text-events for the progress
          'content-type': 'application/json',
        },
        json: {
          quality: 'medium',
          output_format: 'mp3',
          speed: 1,
          // sample_rate: 16000,
          text,
          voice: PLAY_HT_VOICE_ID,
        },
        parseJson: (text) => JSON.parse(text),
        // retry: {},
      })
      .json();

    // console.log(body);
    // const { id } = body;

    const mp3 = body._links.find((l) => l.contentType == 'text/audio/mpeg')?.href;

    if (!mp3) {
      throw new Error('no mp3 link found');
    }

    // download mp3
    console.log('downloading', mp3);

    const fileBuffer = await got
      .get(mp3, {
        encoding: 'binary',
        headers: {
          AUTHORIZATION: `Bearer ${process.env.PLAY_HT_API_KEY}`,
          'X-USER-ID': process.env.PLAY_HT_USER_ID,
          accept: 'application/json', // task data
          // accept: 'text/event-stream', // stream of text-events for the progress
          'content-type': 'application/json',
        },
      })
      .buffer();
    const dest = `./mp3s/${filename}`;

    fs.writeFileSync(dest, fileBuffer);

    const response = {
      dir: dest,
    };

    // console.log({ response });
    return response;
  } catch (err: any) {
    console.log('err.code', err.code);
    if (err.status >= 400 && err.status < 500) {
      // console.error(err.res.statusText);
    } else {
      // console.error(err);
    }
    // console.error(err, 'err.code');
    throw err;
  }
  //   .then(({ data }) => console.log(data))
  //   .catch(err => console.error(err));
};

export default generateAudio;
