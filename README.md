# ML Recommendation Papers

This is a Next.js frontend project that provides recommendations for machine learning papers based on a given paper. It leverages the OpenAI API to generate explanations for the suggested papers. The recommendations are generated using BERT-based embeddings.

## Getting Started

To run the project locally, follow these steps:


1. Install the dependencies using npm, yarn, or pnpm:

   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

2. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

3. Open your browser and navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

The project's main entry point is `pages/index.js`, where you can start editing the page. The page will automatically update in the browser as you modify the file.

The project utilizes [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to optimize and load the Inter font, a custom Google Font.

## Recommendation Process

The recommendation process is based on BERT-based embeddings. Given a paper, the system calculates its embeddings using BERT. These embeddings are then compared with embeddings of other papers in the database to find similar papers.

The system ranks the similar papers based on their similarity scores and generates recommendations accordingly. For each recommended paper, the OpenAI API is utilized to generate a reasoning or explanation for the suggestion. This reasoning provides insights into why a specific paper is recommended based on its relevance and similarities to the given paper.

Feel free to explore and modify the project according to your needs. Happy recommending!
