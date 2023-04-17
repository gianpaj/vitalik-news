import got from 'got';
import arg from 'arg';
import summarize from 'summarize';
import PDFParser from 'pdf2json';
import fs from 'fs';

const spec = {
  '--url': String,
  '--help': Boolean,
  '--format': String,

  // aliases
  '-u': '--url <url>',
  '-h': '--help',
  '-f': '--format "paragraph" | "bullets"',
};

// @ts-ignore
const args = arg(spec, ({} = { permissive: false, argv: process.argv.slice(2) }));

const url = args['--url'];
const format = args['--format'];

if (args['--help']) {
  console.log(`
    Usage: node summarizePdf.js --url <url>

    Options:
        --url, -u  URL of the PDF file to summarize
        --help, -h  Show this help message
    `);
  process.exit(0);
}

if (!url) {
  console.error('Please provide a URL to summarize');
  process.exit(1);
}

if (format !== 'paragraph' && format !== 'bullets') {
  console.error('Please provide a valid format. Valid formats are "paragraph" and "bullets"');
  process.exit(1);
}

// download the PDF file locally
const pdfBuffer = await got(url).buffer();

// write the PDF file to disk
fs.writeFileSync('./temp.pdf', pdfBuffer);

const pdfParser = new PDFParser();
pdfParser.loadPDF('./temp.pdf');

pdfParser.on('error', (errData: any) => console.error(errData));

pdfParser.on('pdfParser_dataReady', async (pdfData) => {
  let text = JSON.stringify(pdfData.Pages.map((page: any) => page.Texts.map((t: any) => t.R[0].T).join(' ')).join(' '));
  if (!text) {
    throw new Error('No text found in the PDF file');
  }
  // decode from uri encoded string
  text = decodeURIComponent(text);
  //   console.log(text);

  // summarize the PDF file
  const summary = await summarize({
    text,
    model: 'summarize-xlarge',
    format,

    // temperature: 1,

    // extractiveness: 0.5,
  });
  console.log(summary);
});

// summarize a pdf file from a url
