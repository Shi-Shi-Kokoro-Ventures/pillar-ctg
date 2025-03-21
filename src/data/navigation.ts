
// Define navigation item interface for type safety
export interface NavigationItem {
  label: string;
  href: string;
  featured?: boolean;
}

// Export navigation items for use in Navbar
export const navigationItems: NavigationItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About",
    href: "/our-mission",
  },
  {
    label: "Housing",
    href: "/housing",
  },
  {
    label: "Community",
    href: "/community-resources",
  },
  {
    label: "Volunteer",
    href: "/volunteer",
    featured: true,
  },
  {
    label: "Donate",
    href: "/donate",
    featured: true,
  }
];
