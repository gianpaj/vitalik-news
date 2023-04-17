# Vitalik News

> Everyday summary of crypto news, recommendations/summaries on podcasts/interviews.

- [Vitalik News](#vitalik-news)
  - [📍 Overview](#-overview)
  - [Where do we get the news?](#where-do-we-get-the-news)
  - [📡 Tech Stack](#-tech-stack)
  - [🛠 Future Development](#-future-development)
  - [🚀 Getting Started](#-getting-started)
  - [✅ Prerequisites](#-prerequisites)
  - [💻 Environment Variables](#-environment-variables)
  - [🤖 Run it](#-run-it)
  - [🤓 Authors](#-authors)

## 📍 Overview

## Where do we get the news?

- <https://www.coindesk.com>
- <https://cointelegraph.com>

More in [dataSourceToCrawl.ts](src/dataSourceToCrawl.ts)

## 📡 Tech Stack

- Node.js
- TypeScript
- Crawlee for crawling news websites
- cohere.ai for summarization - <https://cohere.ai>
- Play.ht for audio generation - <https://play.ht>

## 🛠 Future Development

- [ ] Automate the process in Github Actions
- [ ] Make a simple website with a button to start the Github Action
  - [ ] List the news and their summary
  - [ ] Select which news to include in the final audio
  - [ ] Generate the final audio
- [ ] Summarize podcasts and YouTube videos
- [ ] Upload video automatically to YouTube as unlisted
- [ ] Upload audio automatically to Spotify as unlisted?
- [ ] Generate a thumbnail for the video
- [ ] Generate tiktok video. What't the limit?

See [todo.md](todo.md) for more details.

## 🚀 Getting Started

## ✅ Prerequisites

## 💻 Environment Variables

To run this project, you will need to add the following environment variables to your .env file

```env
LOG_LEVEL=debug
COHERE_API_KEY=
PLAY_HT_API_KEY=
PLAY_HT_USER_ID=
```
  
## 🤖 Run it

1. Scrape, summarize and generate individual audio files from news websites

    ```bash
      npm install
      npm run start
    ```

2. Concatenate final audio

    ```bash
      npm run start:concatAudioFiles
    ```

## 🤓 Authors

- Alex [@krokubik](https://www.github.com/krokubik)
- Gianfranco [@gianpaj](https://www.github.com/gianpaj)
