import { useState, useEffect } from "react";
import { ExperienceCard } from "./ExperienceCard";
import { ProjectCard } from "./ProjectCard";
import { ArrowUpRight } from "lucide-react";
import { experienceService, projectService, blogService } from "../lib/dataService";
import type { Experience, Project, BlogPost } from "../lib/dataService";

export function MainContent() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from storage/API
    const loadData = async () => {
      try {
        const [experiencesData, projectsData, blogPostsData] = await Promise.all([
          experienceService.getAll(),
          projectService.getAll(),
          blogService.getAll()
        ]);
        
        setExperiences(experiencesData);
        setProjects(projectsData);
        setBlogPosts(blogPostsData);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="pt-24 lg:pt-0">
        <div className="animate-pulse space-y-8">
          <div className="h-4 bg-slate-700 rounded w-3/4"></div>
          <div className="h-4 bg-slate-700 rounded w-1/2"></div>
          <div className="h-4 bg-slate-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 lg:pt-0">
      {/* About Section */}
      <section id="about" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
            About
          </h2>
        </div>
        <div>
          <p className="mb-4 text-slate-400 leading-relaxed">
            I'm a developer passionate about crafting accessible, pixel-perfect user 
            interfaces that blend thoughtful design with robust engineering. My favorite 
            work lies at the intersection of design and development, creating experiences 
            that not only look great but are meticulously built for performance and usability.
          </p>
          <p className="mb-4 text-slate-400 leading-relaxed">
            Currently, I'm a Senior Front-End Engineer at <a href="#" className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300">Klaviyo</a>, specializing in 
            accessibility. I contribute to the creation and maintenance of UI components 
            that power Klaviyo's frontend, ensuring our platform meets web accessibility 
            standards and best practices to deliver an inclusive user experience.
          </p>
          <p className="mb-4 text-slate-400 leading-relaxed">
            In the past, I've had the opportunity to develop software across a variety of 
            settings — from <a href="#" className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300">advertising agencies</a> and <a href="#" className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300">large corporations</a> to <a href="#" className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300">start-ups</a> and 
            <a href="#" className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300">small digital product studios</a>. Additionally, I also released a <a href="#" className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300">comprehensive 
            video course</a> a few years ago, guiding learners through building a web app with 
            the Spotify API.
          </p>
          <p className="text-slate-400 leading-relaxed">
            In my spare time, I'm usually climbing, reading, hanging out with my wife and 
            two cats, or running around Hyrule searching for <a href="#" className="font-medium text-slate-200 hover:text-teal-300 focus-visible:text-teal-300">Korok seeds</a>.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
            Experience
          </h2>
        </div>
        <div>
          <ol className="group/list">
            {experiences.map((experience) => (
              <li key={experience.id} className="mb-12">
                <ExperienceCard
                  period={experience.period}
                  title={experience.title}
                  company={experience.company}
                  description={experience.description}
                  technologies={experience.technologies}
                  link={experience.link}
                />
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <a 
              className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group"
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                  View Full Résumé
                </span>
                <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
            Projects
          </h2>
        </div>
        <div>
          <ol className="group/list">
            {projects.map((project) => (
              <li key={project.id} className="mb-12">
                <ProjectCard
                  title={project.title}
                  description={project.description}
                  technologies={project.technologies}
                  link={project.link}
                  image={project.image}
                />
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <a 
              className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group"
              href="/archive"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                  View Full Project Archive
                </span>
                <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
        <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
          <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">
            Blog
          </h2>
        </div>
        <div>
          <p className="mb-4 text-slate-400 leading-relaxed">
            I occasionally write about web development, accessibility, and other topics that interest me. Here are some of my recent posts:
          </p>
          <ol className="group/list">
            {blogPosts.map((post) => (
              <li key={post.id} className="mb-8">
                <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                  <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
                  <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">
                    {post.date}
                  </header>
                  <div className="z-10 sm:col-span-6">
                    <h3>
                      {post.link ? (
                        <a 
                          className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link text-base"
                          href={post.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                          <span>
                            {post.title}
                            <ArrowUpRight className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                          </span>
                        </a>
                      ) : (
                        <span className="font-medium leading-tight text-slate-200 text-base">{post.title}</span>
                      )}
                    </h3>
                    <p className="mt-2 text-sm leading-normal text-slate-400">
                      {post.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12">
            <a 
              className="inline-flex items-center font-medium leading-tight text-slate-200 font-semibold text-slate-200 group"
              href="/blog"
              target="_blank"
              rel="noreferrer"
            >
              <span>
                <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
                  View Full Blog Archive
                </span>
                <ArrowUpRight className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
              </span>
            </a>  
          </div>
        </div>
      </section>
    </div>
  );
}