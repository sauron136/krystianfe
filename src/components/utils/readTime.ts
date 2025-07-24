/**
 * Calculate estimated reading time based on word count
 * Uses an average reading speed of 200 words per minute
 */
export function calculateReadTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return `${minutes} min read`;
}

/**
 * Extract word count from text
 */
export function getWordCount(text: string): number {
  return text.trim().split(/\s+/).length;
}

/**
 * Calculate read time from multiple text sources (title + excerpt + content)
 */
export function calculateReadTimeFromSources(...textSources: string[]): string {
  const totalText = textSources.join(' ');
  return calculateReadTime(totalText);
}