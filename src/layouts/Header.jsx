import { Button } from '@/components/ui/button';
import { useAuth } from '@/store/AuthContext';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react';
import { logout } from '@/utils/api/auth';

function Header() {
  const { setUser,user, loading } = useAuth();
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xl font-bold">
            Behance
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm">Explore</Link>
            <Button variant="outline" size="sm">
              Hire Freelancers
            </Button>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {loading ? (
            <>
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="w-24 h-6" />
            </>
          ) : user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <img
                    src={`http://localhost:9696${user.profilePicture}`}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span className="text-sm font-medium">{user.username}</span>
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/create-design">Create Design</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/my-designs">My Designs</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link to="/login" className='bg-transparent hover:bg-gray-100 rounded-md font-medium text-sm px-4 py-2'>Log In</Link>
              <Link to="/register" className='bg-primary text-white hover:bg-blue-800 hover:text-white rounded-md font-medium text-sm px-4 py-2'>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

