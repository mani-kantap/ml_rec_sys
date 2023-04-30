import Image from 'next/image'

function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-4">About ML Paper Recommendations</h1>
      <div className="flex items-center justify-center mb-8">
        <Image src="/recs.svg" alt="Icon" width={100} height={100} />
      </div>
      <p className="text-lg leading-7 mb-8">
        This is a project developed as part of a Natural Language Processing course. The goal of the project is to build a recommendation system for academic papers in the field of machine learning.
      </p>
      <p className="text-lg leading-7 mb-8">
        The recommendation system is built using Next.js, a React framework for building server-side rendered (SSR) web applications, and BERT embeddings, a state-of-the-art deep learning model for natural language processing tasks. The system uses a dataset of academic papers in the field of machine learning and provides personalized recommendations to users based on their reading history and interests.
      </p>
      <p className="text-lg leading-7">
        If you have any questions or feedback about the project, please dont hesitate to <a href="mailto:mlrecs@example.com" className="underline text-blue-600 hover:text-blue-800">contact us</a>.
      </p>
    </div>
  );
}

export default AboutPage;
