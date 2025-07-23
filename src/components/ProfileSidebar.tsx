import { Button } from "./ui/button";
import { Github, Linkedin, Twitter, Mail, Instagram } from "lucide-react";

export function ProfileSidebar() {
  const navigationItems = [
    { label: "ABOUT", id: "about" },
    { label: "EXPERIENCE", id: "experience" },
    { label: "PROJECTS", id: "projects" },
    { label: "BLOG", id: "blog" }
  ];
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-full flex flex-col justify-between p-12 sticky top-0">
      {/* Profile Section */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-5xl font-bold text-slate-200 tracking-tight">
            Krystian Nmeze
          </h1>
          <h2 className="text-xl font-medium text-slate-200 mt-2">
            Software Engineer
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-xs mt-4">
            I build accessible, pixel-perfect digital experiences for the web.
          </p>
        </div>

        {/* Navigation */}
        <nav className="mt-16">
          <ul className="space-y-4">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <Button
                  variant="ghost"
                  className="group relative flex items-center py-2 px-0 text-sm font-bold tracking-widest text-slate-500 hover:text-slate-200 transition-colors uppercase"
                  onClick={() => scrollToSection(item.id)}
                >
                  <span className="mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200"></span>
                  <span className="nav-text">{item.label}</span>
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Social Icons */}
      <div className="flex items-center space-x-5 mt-8">
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 transition-colors">
          <Github className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 transition-colors">
          <Linkedin className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 transition-colors">
          <Twitter className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 transition-colors">
          <Instagram className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-slate-400 hover:text-slate-200 transition-colors">
          <Mail className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}