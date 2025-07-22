import React from 'react';

const writings = [
  {
    title: '5 Common Accessibility Pitfalls and How to Avoid Them',
    date: '2024',
    link: '#',
  },
  {
    title: 'Integrating Algolia Search with WordPress Multisite',
    date: '2019',
    link: '#',
  },
  // Add more as needed
];

const Writing = () => (
  <section className="py-16" id="writing">
    <h2 className="text-2xl font-bold text-accent mb-8">Writing</h2>
    <ul className="space-y-6">
      {writings.map((w, idx) => (
        <li key={idx} className="bg-card rounded-lg p-6 shadow text-white">
          <a href={w.link} className="text-lg font-semibold text-accent hover:underline">{w.title}</a>
          <span className="block text-sm text-muted mt-1">{w.date}</span>
        </li>
      ))}
    </ul>
  </section>
);

export default Writing;
