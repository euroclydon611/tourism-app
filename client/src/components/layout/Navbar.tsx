import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth) as any;

  console.log("nav user", user);

  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { text: "Destinations", href: "/destinations" },
    { text: "Experiences", href: "/experiences" },
    // { text: "Map", href: "/map" },
    // { text: "Reviews", href: "/reviews" },
    { text: "About", href: "/about" },
  ];

  // Check if page is scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-10 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md"
          : location === "/"
          ? "bg-transparent"
          : "bg-white shadow-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <div className="h-10 w-10 rounded-full bg-[#006B3F] flex items-center justify-center">
                <span className="text-white font-playfair text-lg font-bold">
                  DG
                </span>
              </div>
              <span className="ml-3 text-lg font-bold text-[#006B3F] font-montserrat">
                DiscoverGhana
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition font-medium ${
                  location === link.href
                    ? "text-[#006B3F]"
                    : location === "/" && !isScrolled
                    ? "text-white hover:text-white/80"
                    : "text-neutral-800 hover:text-[#006B3F]"
                }`}
              >
                {link.text}
              </Link>
            ))}
          </div>

          <div className="flex items-center">
            {user ? (
              <div className="flex gap-5">
                <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#006B3F] hover:bg-[#005C35]">
                    Hello, {user.name.split(" ")[0]}
                  </Button>
                </Link>

                <Link
                  href="/admin/destinations"
                  // onClick={() => setMobileMenuOpen(false)}
                  hidden={user.role !== "admin"}
                >
                  <Button className="w-full bg-amber-500 hover:bg-amber-400">
                    Admin Dashboard
                  </Button>
                </Link>
              </div>
            ) : (
              <Link href="/auth">
                <Button
                  className={`hidden md:block py-2 px-4 rounded-md transition ${
                    location === "/" && !isScrolled
                      ? "bg-white text-[#006B3F] hover:bg-white/90"
                      : "bg-[#006B3F] text-white hover:bg-[#005C35]"
                  }`}
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Mobile menu button */}
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  aria-label="Toggle menu"
                >
                  <Menu
                    className={`h-6 w-6 ${
                      location === "/" && !isScrolled
                        ? "text-white"
                        : "text-neutral-800"
                    }`}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="p-0">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center p-4 border-b">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-[#006B3F] flex items-center justify-center">
                        <span className="text-white font-playfair text-lg font-bold">
                          DG
                        </span>
                      </div>
                      <span className="ml-3 text-lg font-bold text-[#006B3F] font-montserrat">
                        DiscoverGhana
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <X className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="flex-1 overflow-auto py-4">
                    <nav className="flex flex-col space-y-1 px-2">
                      {navLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button
                            variant="ghost"
                            className={`w-full justify-start ${
                              location === link.href ? "bg-neutral-100" : ""
                            }`}
                          >
                            {link.text}
                          </Button>
                        </Link>
                      ))}
                    </nav>
                  </div>
                  <div className="p-4 border-t">
                    {user ? (
                      <>
                        <Link
                          href="/profile"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button className="w-full bg-[#006B3F] hover:bg-[#005C35]">
                            Hello
                          </Button>
                        </Link>

                        <Link
                          href="/admin/destinations"
                          // onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button className="w-full bg-amber-500 hover:bg-amber-400">
                            Admin Dashboard
                          </Button>
                        </Link>
                      </>
                    ) : (
                      ""
                    )}

                    <Link
                      href="/profile"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Button className="w-full bg-[#006B3F] hover:bg-[#005C35]">
                        Sign In
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
