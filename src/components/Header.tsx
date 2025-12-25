"use client";

import Link from 'next/link';
import { BookOpen, User, LogIn, UserPlus, LogOut, LayoutDashboard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '@/context/AuthContext';
import { signOutAction } from '@/lib/auth-actions';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 md:px-6 z-50 shadow-sm">
      <nav className="flex w-full items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base group"
        >
          <BookOpen className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
          <span className="font-headline text-xl whitespace-nowrap bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">CS-Academica</span>
        </Link>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
           <div className="ml-auto">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full hover:ring-2 hover:ring-primary/50 transition-all">
                  <Avatar>
                    {user?.photoURL && <AvatarImage src={user.photoURL} alt="User avatar" />}
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                      <User className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {user ? (
                  <>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                     <DropdownMenuItem asChild>
                      <Link href="/dashboard" className="cursor-pointer">
                        <LayoutDashboard className="mr-2 h-4 w-4" />
                        <span>Dashboard</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOutAction()} className="cursor-pointer">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signin" className="cursor-pointer">
                        <LogIn className="mr-2 h-4 w-4" />
                        <span>Login</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/auth/signup" className="cursor-pointer">
                        <UserPlus className="mr-2 h-4 w-4" />
                        <span>Sign Up</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
           </div>
        </div>
      </nav>
    </header>
  );
}
