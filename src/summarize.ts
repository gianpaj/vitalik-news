import cohere from 'cohere-ai';

cohere.init(process.env.COHERE_API_KEY || '');

enum SummarizeLength {
  short = 'short',
  medium = 'medium',
  long = 'long',
}

// docs - https://docs.cohere.ai/docs/summarize (beta)

const summarize = async (text: string, length?: SummarizeLength): Promise<string> => {
  const { body } = await cohere.summarize({
    // model - 'summarize-xlarge' or 'summarize-medium'. Generally, medium models are faster while larger models will perform better.
    // model: 'cohere',
    text,
    // temperature - Ranges from 1 to 5. Controls the randomness of the output.
    // temperature: 1,
    length,
    // extractiveness - Ranges from 0 to 1. Controls the amount of text that is copied from the input.
  });
  console.log(body);
  return body.summary;
};

export default summarize;
