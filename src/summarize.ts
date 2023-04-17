import cohere from 'cohere-ai';
import { summarizeRequest } from 'cohere-ai/dist/models';

cohere.init(process.env.COHERE_API_KEY || '');

enum SummarizeLength {
  short = 'short',
  medium = 'medium',
  long = 'long',
}

// docs - https://docs.cohere.ai/docs/summarize (beta)

const summarize = async (config?: summarizeRequest): Promise<string> => {
  if (!config?.text.trim()) {
    throw new Error('Please provide a text to summarize');
  }

  const { body } = await cohere.summarize({
    // 'summarize-xlarge' or 'summarize-medium'. Generally, medium models are faster while larger models will perform better.
    model: config?.model || 'summarize-medium',

    text: config?.text,
    // temperature - Ranges from 1 to 5. Controls the randomness of the output.
    // temperature: 1,
    length: config?.length || SummarizeLength.medium,
    // extractiveness - Ranges from 0 to 1. Controls the amount of text that is copied from the input.
    extractiveness: config?.extractiveness || 'low',
    format: config?.format || 'paragraph',
  });
  console.log(body);
  return body.summary;
};

export default summarize;
