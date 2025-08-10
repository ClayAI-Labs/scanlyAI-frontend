import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ScanLine, Home, History, User, LogOut, Menu, X } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  // Helper function to determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Helper function to get link classes
  const getLinkClasses = (path: string, baseClasses: string) => {
    const active = isActive(path);
    return `${baseClasses} ${
      active 
        ? 'bg-violet-100 text-violet-700 shadow-sm' 
        : 'text-gray-700 hover:bg-violet-50 hover:text-violet-700'
    }`;
  };

  return (
    <nav className="bg-white/90 backdrop-blur-lg border-b border-violet-100 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="p-2 bg-gradient-to-r from-violet-600 to-indigo-600 rounded-xl group-hover:from-violet-700 group-hover:to-indigo-700 transition-all transform group-hover:scale-105">
              <ScanLine className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-700 to-indigo-600 bg-clip-text text-transparent">
              ScanlyAI
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              to="/" 
              className={getLinkClasses('/', 'flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium')}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            
            {user && (
              <Link 
                to="/history" 
                className={getLinkClasses('/history', 'flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 font-medium')}
              >
                <History className="h-4 w-4" />
                <span>History</span>
              </Link>
            )}

            {user ? (
              <div className="flex items-center space-x-4 pl-6 border-l border-gray-200">
                <div className="flex items-center space-x-3 text-sm text-gray-600">
                  <div className="p-2 bg-violet-100 rounded-full">
                    <User className="h-4 w-4 text-violet-600" />
                  </div>
                  <span className="font-medium">{user.email}</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link
                  to="/login"
                  className="px-6 py-2 text-violet-700 hover:text-violet-800 font-semibold transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl hover:from-sky-600 hover:to-sky-700 font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-colors"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-violet-100 py-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setMobileMenuOpen(false)}
              className={getLinkClasses('/', 'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium')}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            {user && (
              <Link 
                to="/history" 
                onClick={() => setMobileMenuOpen(false)}
                className={getLinkClasses('/history', 'flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 font-medium')}
              >
                <History className="h-5 w-5" />
                <span>History</span>
              </Link>
            )}

            {user ? (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-600">
                  <div className="p-2 bg-violet-100 rounded-full">
                    <User className="h-4 w-4 text-violet-600" />
                  </div>
                  <span className="font-medium">{user.email}</span>
                </div>
                
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 w-full px-4 py-3 mt-2 text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200 font-medium"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 mt-4 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-violet-700 hover:bg-violet-50 rounded-xl font-semibold transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl hover:from-sky-600 hover:to-sky-700 font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}