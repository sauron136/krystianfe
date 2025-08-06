// src/app/page.tsx (Homepage)
import { apiClient } from '@/lib/api';

async function getSiteData() {
  try {
    const [siteSettings, experiences, projects, blogPosts, socialLinks] = await Promise.all([
      apiClient.getSiteSettings(),
      apiClient.getExperiences(false, 4), // Get 4 experiences
      apiClient.getProjects(false, 4), // Get 4 projects
      apiClient.getBlogPosts(true, 4), // Get 4 published posts
      apiClient.getSocialLinks(),
    ]);

    return {
      siteSettings,
      experiences,
      projects,
      blogPosts,
      socialLinks,
    };
  } catch (error) {
    console.error('Failed to fetch site data:', error);
    return {
      siteSettings: null,
      experiences: [],
      projects: [],
      blogPosts: [],
      socialLinks: [],
    };
  }
}

export default async function HomePage() {
  const { siteSettings, experiences, projects, blogPosts, socialLinks } = await getSiteData();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            {siteSettings?.hero_name || 'Your Name'}
          </h1>
          <h2 className="text-2xl md:text-3xl text-gray-600 mb-8">
            {siteSettings?.hero_title || 'Your Title'}
          </h2>
          <p className="text-xl text-gray-700 mb-12 max-w-3xl mx-auto leading-relaxed">
            {siteSettings?.hero_summary || 'Your summary goes here'}
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12">
            {socialLinks.map((link: any) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors text-2xl"
                title={link.platform}
              >
                {getPlatformIcon(link.platform)}
              </a>
            ))}
          </div>

          {/* Navigation */}
          <nav className="flex justify-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium">
              About
            </a>
            <a href="#experience" className="text-gray-700 hover:text-blue-600 font-medium">
              Experience
            </a>
            <a href="#projects" className="text-gray-700 hover:text-blue-600 font-medium">
              Projects
            </a>
            <a href="#blog" className="text-gray-700 hover:text-blue-600 font-medium">
              Blog
            </a>
          </nav>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">About Me</h2>
          <div className="prose prose-lg mx-auto">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: siteSettings?.about_content || 'About content will go here...' 
              }}
            />
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Experience</h2>
            {experiences.length >= 4 && (
              <a href="/experience" className="text-blue-600 hover:text-blue-800 font-medium">
                View All →
              </a>
            )}
          </div>
          
          <div className="grid gap-8">
            {experiences.slice(0, 4).map((exp: any) => (
              <div key={exp.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-600">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-500">
                    {exp.start_date} - {exp.end_date || 'Present'}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4">{exp.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.tech_stack?.map((tech: string, index: number) => (
                    <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Projects</h2>
            {projects.length >= 4 && (
              <a href="/projects" className="text-blue-600 hover:text-blue-800 font-medium">
                View All →
              </a>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.slice(0, 4).map((project: any) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {project.image_url && (
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech_stack?.map((tech: string, index: number) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.project_url && (
                    <a
                      href={project.project_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
            {blogPosts.length >= 4 && (
              <a href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
                View All →
              </a>
            )}
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.slice(0, 4).map((post: any) => (
              <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <time>{new Date(post.published_at).toLocaleDateString()}</time>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  
                  <a
                    href={`/blog/${post.slug}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div 
            dangerouslySetInnerHTML={{ 
              __html: siteSettings?.footer_content || '© 2024 Your Name. All rights reserved.' 
            }}
          />
        </div>
      </footer>
    </div>
  );
}

function getPlatformIcon(platform: string) {
  const icons: Record<string, string> = {
    github: '🐙',
    linkedin: '💼',
    twitter: '🐦',
    instagram: '📷',
    facebook: '📘',
    youtube: '📺',
    twitch: '🎮',
    discord: '💬',
    email: '📧',
    website: '🌐',
  };
  return icons[platform] || '🔗';
}
