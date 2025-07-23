interface AboutData {
  name: string;
  title: string;
  bio: string;  // Changed from content to bio
  current_company?: string;
  location?: string;
  skills?: string[];
  image_url?: string;
}

interface AboutProps {
  data: AboutData | null;
}

const About = ({ data }: AboutProps) => {
  if (!data) {
    return (
      <section id="about" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center">Loading about data...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              {data.title || "About Me"}
            </h2>
            
            <div className="space-y-4">
              <div>
                {/* Safe split with fallback */}
                {(data.bio || "").split('\n').filter(p => p.trim()).map((paragraph, index) => (
                  <p key={index} className="text-gray-600 leading-relaxed mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
              
              {data.current_company && (
                <div>
                  <strong>Currently:</strong> {data.current_company}
                  {data.location && ` • ${data.location}`}
                </div>
              )}
              
              {data.skills && data.skills.length > 0 && (
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Technologies I work with:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.skills.map((skill, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {data.image_url && (
              <div className="mt-8">
                <img src={data.image_url} alt="About" className="rounded-lg shadow-lg" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;