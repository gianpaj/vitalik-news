import audioconcat from 'audioconcat';
import fs from 'fs';
import readline from 'readline';

const now = new Date();
const today = now.toISOString().slice(0, 10);

// get all audio files in mp3s folder that are today's date

const files = fs.readdirSync('./mp3s');

const todaysFiles = files.filter((file) => file.includes(today)).map((file) => `mp3s/${file}`);
const filesWithSilence = [];
// add a 1 sec of silence in between each file
for (let i = 0; i < todaysFiles.length; i++) {
  filesWithSilence.push(todaysFiles[i]);
  if (i !== todaysFiles.length - 1) {
    filesWithSilence.push('mp3s/1-sec-silence.mp3');
  }
}

const audio = ['mp3s/intro.mp3', ...filesWithSilence, 'mp3s/outro.mp3'];

// measure the size of the audio files in MB
const totalSize = audio.reduce((acc, file) => {
  const stats = fs.statSync(file);
  const fileSizeInBytes = stats.size;
  const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
  return acc + fileSizeInMegabytes;
}, 0);

console.log('Total size of audio files:', totalSize.toFixed(2), 'MB');

// measure the length of the audio files in minutes
const totalLength = audio.reduce((acc, file) => {
  const stats = fs.statSync(file);
  const fileSizeInBytes = stats.size;
  const fileSizeInMegabytes = fileSizeInBytes / 1000000.0;
  const fileSizeInMinutes = fileSizeInMegabytes * 1.5;
  return acc + fileSizeInMinutes;
}, 0);

console.log('Total length of audio files:', totalLength.toFixed(2), 'minutes');

// prompt user to confirm they want to concat all files
console.log('The following files will be concatenated:');
console.log(audio);
console.log('\nAre you sure you want to continue? (y/n)');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('', (answer) => {
  if (answer === 'y') {
    concatAudio();
  } else {
    console.log('Exiting...');
  }
  rl.close();
});

const concatAudio = () =>
  audioconcat(audio)
    .concat(`${today}.mp3`)
    .on('start', (command: string) => {
      console.log('ffmpeg process started:', command);
    })
    .on('error', (err: any, _stdout: string, stderr: string) => {
      console.error('Error:', err);
      console.error('ffmpeg stderr:', stderr);
    })
    .on('end', () => {
      console.error('Audio created in:', `${today}.mp3`);
    });

//   transcription
//   Good morning. It's time for your daily dose of Vitalik news, where we give you the tastiest scoop on all things blockchain and summarize the top crypto podcasts you don't want to miss. From new product launches to regulatory updates, we've covered what's happening in the crypto world. So grab your coffee, and let's get started!
