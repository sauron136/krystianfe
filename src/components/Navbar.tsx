import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  const navItems = [
    { name: 'About', href: '#about', number: '01.' },
    { name: 'Experience', href: '#experience', number: '02.' },
    { name: 'Projects', href: '#projects', number: '03.' },
    { name: 'Blog', href: '#blog', number: '04.' },
    { name: 'Contact', href: '#contact', number: '05.' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a 
              href="#hero" 
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('#hero');
              }}
              className="text-emerald-400 font-mono text-xl hover:text-emerald-300 transition-colors"
            >
              &lt;YourName /&gt;
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-slate-300 hover:text-emerald-400 font-mono text-sm transition-colors duration-200 group"
                >
                  <span className="text-emerald-400 mr-1">{item.number}</span>
                  <span className="group-hover:text-emerald-400">{item.name}</span>
                </a>
              ))}
              
              {/* Resume Button */}
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-4 px-4 py-2 border border-emerald-400 text-emerald-400 rounded font-mono text-sm hover:bg-emerald-400/10 transition-colors duration-200"
              >
                Resume
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-300 hover:text-emerald-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-slate-800/95 backdrop-blur-sm rounded-lg mt-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block px-3 py-2 text-slate-300 hover:text-emerald-400 font-mono text-sm transition-colors duration-200"
                >
                  <span className="text-emerald-400 mr-2">{item.number}</span>
                  {item.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-4 py-2 border border-emerald-400 text-emerald-400 rounded font-mono text-sm hover:bg-emerald-400/10 transition-colors duration-200"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;