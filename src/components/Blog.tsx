import React, { useState, useMemo } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogPost } from '../App';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimatedSection } from './AnimatedSection';
import { calculateReadTimeFromSources } from './utils/readTime';

interface BlogProps {
  blogPosts: BlogPost[];
}

export function Blog({ blogPosts }: BlogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;
  
  // Mock total posts for pagination demo
  const totalPosts = 12; // This would come from API
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  
  // Calculate dynamic read times for blog posts
  const postsWithDynamicReadTime = useMemo(() => {
    return blogPosts.map(post => ({
      ...post,
      dynamicReadTime: calculateReadTimeFromSources(post.title, post.excerpt)
    }));
  }, [blogPosts]);
  
  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    // API call for pagination
    // const response = await fetch(`/api/blog-posts?page=${page}&limit=${postsPerPage}`);
    // const newPosts = await response.json();
    // Update blogPosts state in parent component
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <AnimatedSection id="blog" className="py-16">
      <div className="sticky top-0 z-20 -mx-8 mb-4 w-screen bg-slate-900/75 px-8 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm uppercase tracking-widest text-slate-200 lg:sr-only">
          Blog
        </h2>
      </div>

      <div className="space-y-8">
        {postsWithDynamicReadTime.slice(0, 4).map((post, index) => (
          <article
            key={post.id}
            className="group relative grid gap-4 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50 opacity-0 animate-slide-in-up"
            style={{
              animationDelay: `${index * 0.2}s`
            }}
          >
            <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg"></div>
            
            <div className="z-10 sm:order-2 sm:col-span-6">
              <h3>
                <a
                  className="inline-flex items-baseline text-base leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group/link"
                  href={`/blog/${post.slug}`}
                  aria-label={`${post.title} (opens in a new tab)`}
                >
                  <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                  <span>
                    {post.title}
                    <ExternalLink className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1 translate-y-px" />
                  </span>
                </a>
              </h3>
              
              <p className="mt-2 text-sm leading-normal text-slate-400">
                {post.excerpt}
              </p>
              
              <div className="mt-2 flex items-center space-x-4 text-xs text-slate-500">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span>·</span>
                <span className="bg-teal-400/10 text-teal-300 px-2 py-1 rounded">
                  {post.dynamicReadTime}
                </span>
              </div>
            </div>
            
            <div 
              className="sm:order-1 sm:col-span-2 sm:translate-y-1 opacity-0 animate-scale-in"
              style={{
                animationDelay: `${index * 0.2 + 0.3}s`
              }}
            >
              <ImageWithFallback
                src={post.image}
                alt={`${post.title} featured image`}
                className="rounded border-2 border-slate-200/10 transition group-hover:border-slate-200/30 hover:scale-105 duration-300"
                width={200}
                height={100}
              />
            </div>
          </article>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12 flex items-center justify-between opacity-0 animate-fade-in-up" style={{ animationDelay: '1s' }}>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center px-4 py-2 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Previous
          </button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 text-sm rounded transition-all duration-200 hover:scale-105 ${
                  currentPage === page
                    ? 'bg-teal-400/10 text-teal-300 scale-110'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center px-4 py-2 text-sm text-slate-400 hover:text-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}

      <div className="mt-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
        <a
          className="inline-flex items-center text-base leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300 group"
          href="/blog"
          aria-label="View All Blog Posts"
        >
          <span>
            <span className="border-b border-transparent pb-px transition group-hover:border-teal-300 motion-reduce:transition-none">
              View All Posts
            </span>
            <ExternalLink className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-focus-visible:-translate-y-1 group-focus-visible:translate-x-1 motion-reduce:transition-none" />
          </span>
        </a>
      </div>
    </AnimatedSection>
  );
}