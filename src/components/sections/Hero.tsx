interface HeroData {
  name: string;
  title: string;
  subtitle: string;
  description: string;
  social_links?: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

interface HeroProps {
  data: HeroData | null;
}

const Hero = ({ data }: HeroProps) => {
  if (!data) {
    return (
      <section id="hero" className="min-h-screen flex items-center">
        <div>Loading hero data...</div>
      </section>
    );
  }

  return (
    <section id="hero" className="min-h-screen flex items-center">
      <div className="max-w-4xl">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          {data.name}
        </h1>
        <h2 className="text-4xl font-semibold text-gray-700 mb-6">
          {data.title}
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          {data.description}
        </p>
        
        {data.social_links && (
          <div className="flex space-x-6">
            {data.social_links.github && (
              <a href={data.social_links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {data.social_links.linkedin && (
              <a href={data.social_links.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            )}
            {data.social_links.email && (
              <a href={`mailto:${data.social_links.email}`}>
                Email
              </a>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;