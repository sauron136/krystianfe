import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useContext } from 'react';
import { AuthContext } from '../App';
import { Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);
  const location = useLocation();

  const isHome = location.pathname === '/';

  const DevlogDropdown = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="text-lg font-medium hover:text-blue-300">
          Devlog
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 bg-gray-900 text-white border-gray-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
        <DropdownMenuLabel>Devlog Categories</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Computer Science */}
        <div className="p-2">
          <div className="mb-3">
            <span className="font-semibold text-blue-300">Computer Science</span>
            <div className="ml-4 mt-1 space-y-1">
              <RouterLink to="/devlog/computer-architecture" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Computer Architecture
              </RouterLink>
              <RouterLink to="/devlog/algorithm" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Algorithm
              </RouterLink>
              <RouterLink to="/devlog/telecommunication-networks" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Telecommunication Networks
              </RouterLink>
              <RouterLink to="/devlog/compiler" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Compiler
              </RouterLink>
              <RouterLink to="/devlog/operating-system" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Operating & System
              </RouterLink>
              <RouterLink to="/devlog/database" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Database
              </RouterLink>
              <RouterLink to="/devlog/software-architecture" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Software Architecture
              </RouterLink>
              <RouterLink to="/devlog/artificial-intelligence" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Artificial Intelligence
              </RouterLink>
            </div>
          </div>

          {/* DevOps */}
          <div className="mb-3">
            <span className="font-semibold text-blue-300">DevOps</span>
            <div className="ml-4 mt-1 space-y-1">
              <RouterLink to="/devlog/aws" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                AWS
              </RouterLink>
            </div>
          </div>

          {/* Frameworks */}
          <div className="mb-3">
            <span className="font-semibold text-blue-300">Frameworks</span>
            <div className="ml-4 mt-1 space-y-1">
              <RouterLink to="/devlog/django" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Django
              </RouterLink>
              <RouterLink to="/devlog/django-rest-framework" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Django REST Framework
              </RouterLink>
              <RouterLink to="/devlog/fastapi" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                FastAPI
              </RouterLink>
              <RouterLink to="/devlog/flask" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Flask
              </RouterLink>
            </div>
          </div>

          {/* Programming Languages */}
          <div className="mb-2">
            <span className="font-semibold text-blue-300">Programming Languages</span>
            <div className="ml-4 mt-1 space-y-1">
              <RouterLink to="/devlog/c" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                C
              </RouterLink>
              <RouterLink to="/devlog/python" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                Python
              </RouterLink>
              <RouterLink to="/devlog/javascript" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                JavaScript
              </RouterLink>
              <RouterLink to="/devlog/typescript" className="block py-1 text-sm text-gray-300 hover:text-blue-300 transition-colors">
                TypeScript
              </RouterLink>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="flex items-center justify-between px-4 py-4 md:px-8 max-w-7xl mx-auto">
        <ScrollLink to="home" smooth duration={500} className="text-2xl font-bold tracking-tight hover:text-blue-300 transition-colors duration-300">
          Krystian
        </ScrollLink>
        <div className="hidden md:flex items-center space-x-6">
          {isHome ? (
            <>
              <ScrollLink to="home" smooth duration={500} className="text-lg font-medium hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                Home
              </ScrollLink>
              <ScrollLink to="about" smooth duration={500} className="text-lg font-medium hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                About Me
              </ScrollLink>
              <ScrollLink to="projects" smooth duration={500} className="text-lg font-medium hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                Projects
              </ScrollLink>
              <DevlogDropdown />
              <ScrollLink to="contact" smooth duration={500} className="text-lg font-medium hover:text-blue-300 transition-colors duration-300 cursor-pointer">
                Contact Me
              </ScrollLink>
            </>
          ) : (
            <>
              <RouterLink to="/" className="text-lg font-medium hover:text-blue-300 transition-colors duration-300">
                Home
              </RouterLink>
              <RouterLink to="/about" className="text-lg font-medium hover:text-blue-300 transition-colors duration-300">
                About Me
              </RouterLink>
              <RouterLink to="/projects" className="text-lg font-medium hover:text-blue-300 transition-colors duration-300">
                Projects
              </RouterLink>
              <DevlogDropdown />
              <RouterLink to="/contact" className="text-lg font-medium hover:text-blue-300 transition-colors duration-300">
                Contact Me
              </RouterLink>
            </>
          )}
          {token && (
            <>
              <RouterLink to="/admin" className="text-lg font-medium hover:text-blue-300 transition-colors duration-300">
                Admin
              </RouterLink>
              <Button variant="ghost" onClick={logout} className="text-lg font-medium hover:text-blue-300">
                Logout
              </Button>
            </>
          )}
        </div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-gray-900 text-white border-gray-700 rounded-lg shadow-xl">
              <DropdownMenuItem asChild>
                <RouterLink to="/" className="block py-2 hover:bg-gray-800">Home</RouterLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <RouterLink to="/about" className="block py-2 hover:bg-gray-800">About Me</RouterLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <RouterLink to="/projects" className="block py-2 hover:bg-gray-800">Projects</RouterLink>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <RouterLink to="/contact" className="block py-2 hover:bg-gray-800">Contact Me</RouterLink>
              </DropdownMenuItem>
              {token && (
                <>
                  <DropdownMenuItem asChild>
                    <RouterLink to="/admin" className="block py-2 hover:bg-gray-800">Admin</RouterLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Button variant="ghost" onClick={logout} className="block w-full text-left py-2 hover:bg-gray-800">
                      Logout
                    </Button>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;