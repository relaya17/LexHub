import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChefHat, LogIn, Menu, X, LogOut, User } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { count: cartCount } = useCart();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const getUserInitials = () => {
    if (user?.full_name) {
      return user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    return user?.email?.[0].toUpperCase() || "U";
  };

  return (
    <>
      <nav 
        className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
        role="navigation"
        aria-label="ניווט ראשי"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex h-16 items-center justify-between">
          {/* Mobile menu */}
          <div className="relative md:hidden order-1">
            <button
              className="p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "סגור תפריט" : "פתח תפריט"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group order-2 md:order-1"
            aria-label="דף הבית TasteMate"
          >
            <ChefHat className="h-8 w-8 text-primary transition-transform group-hover:scale-110" aria-hidden="true" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TasteMate
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6" role="menubar">
            <Link 
              to="/" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              role="menuitem"
            >
              בית
            </Link>
            <Link 
              to="/dishes" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              role="menuitem"
            >
              מנות
            </Link>
            <Link 
              to="/how-it-works" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              role="menuitem"
            >
              איך זה עובד
            </Link>
            <Link 
              to="/chef" 
              className="text-foreground hover:text-primary transition-colors font-medium"
              role="menuitem"
            >
              שף AI
            </Link>
            <Link 
              to="/checkout" 
              className="text-foreground hover:text-primary transition-colors font-medium relative"
              role="menuitem"
            >
              עגלה
              {cartCount > 0 && (
                <span className="ml-2 px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>{getUserInitials()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>{user.full_name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    פרופיל
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    התנתק
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild className="shadow-glow">
                <Link to="/signup" className="flex items-center gap-2">
                  <ChefHat className="h-4 w-4" aria-hidden="true" />
                  הרשמה
                </Link>
              </Button>
            )}
            <Button
              variant="outline"
              className="border-dashed border-primary text-primary px-4 py-1 rounded-full text-xs uppercase tracking-[0.3em]"
              asChild
            >
              <Link to="/recipes">מתכונים</Link>
            </Button>
          </div>

        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden py-4 border-t border-border animate-fade-in bg-background shadow-md rounded-b-lg"
            role="menu"
          >
            <div className="flex flex-col gap-4">
              <Link
                to="/"
                className="text-foreground hover:text-primary transition-colors font-medium px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                בית
              </Link>
              <Link
                to="/dishes"
                className="text-foreground hover:text-primary transition-colors font-medium px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                מנות
              </Link>
                        <Link
                          to="/recipes"
                          className="text-foreground hover:text-primary transition-colors font-medium px-2 py-2"
                          onClick={() => setMobileMenuOpen(false)}
                          role="menuitem"
                        >
                          מתכונים
                        </Link>
              <Link
                to="/how-it-works"
                className="text-foreground hover:text-primary transition-colors font-medium px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                איך זה עובד
              </Link>
              <Link
                to="/chef"
                className="text-foreground hover:text-primary transition-colors font-medium px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                שף AI
              </Link>
              <Link
                to="/checkout"
                className="text-foreground hover:text-primary transition-colors font-medium px-2 py-2"
                onClick={() => setMobileMenuOpen(false)}
                role="menuitem"
              >
                עגלה {cartCount > 0 ? `(${cartCount})` : ""}
              </Link>
              <div className="flex flex-col gap-2 pt-4 border-t border-border">
              {user ? (
                <>
                  <div className="px-2 py-2 text-sm text-muted-foreground">
                    {user.full_name}
                  </div>
                  <Button variant="ghost" asChild onClick={() => setMobileMenuOpen(false)}>
                    <Link to="/profile">
                      <User className="ml-2 h-4 w-4 inline" />
                      פרופיל
                    </Link>
                  </Button>
                  <Button variant="ghost" onClick={() => { handleLogout(); setMobileMenuOpen(false); }}>
                    <LogOut className="ml-2 h-4 w-4 inline" />
                    התנתק
                  </Button>
                </>
              ) : (
              <>
                <Button asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link to="/signup">
                    <ChefHat className="h-4 w-4" aria-hidden="true" />
                    הרשמה
                  </Link>
                </Button>
              </>
                )}
              </div>
            </div>
          </div>
        )}
        </div>
      </nav>
      <a
        href="/accessibility"
        className="fixed top-16 right-4 flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-background/90 text-primary shadow-lg transition hover:bg-primary hover:text-background z-40 md:top-20 md:right-8 md:h-12 md:w-12"
        aria-label="שירות נגישות מהיר"
      >
        ♿
      </a>
      <a
        href="https://wa.me/972500000000"
        className="fixed bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:bg-green-600 z-40 md:bottom-6 md:right-8 md:h-12 md:w-12"
        aria-label="וואטסאפ לתמיכה"
        target="_blank"
        rel="noreferrer"
      >
        <span className="text-lg leading-none">💬</span>
      </a>
    </>
  );
}
