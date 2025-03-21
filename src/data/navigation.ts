
// Define navigation item interface for type safety
export interface NavigationItem {
  label: string;
  href: string;
  featured?: boolean;
  dropdown?: NavigationDropdownItem[];
}

export interface NavigationDropdownItem {
  label: string;
  href: string;
  description?: string;
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
    dropdown: [
      {
        label: "Our Mission",
        href: "/our-mission",
        description: "Learn about our purpose and values"
      },
      {
        label: "Leadership",
        href: "/leadership",
        description: "Meet our leadership team"
      },
      {
        label: "Partners",
        href: "/partners",
        description: "Organizations we work with"
      }
    ]
  },
  {
    label: "Housing",
    href: "/housing",
    dropdown: [
      {
        label: "Affordable Housing",
        href: "/affordable-housing",
        description: "Find affordable housing options"
      },
      {
        label: "Rental Assistance",
        href: "/rental-assistance",
        description: "Get help with rent payments"
      },
      {
        label: "Housing Vouchers",
        href: "/housing-vouchers",
        description: "Learn about housing voucher programs"
      },
      {
        label: "Housing Waitlist",
        href: "/housing-waitlist",
        description: "Check your waitlist status"
      },
      {
        label: "Crisis Hotline",
        href: "/housing-crisis-hotline",
        description: "Emergency housing assistance"
      }
    ]
  },
  {
    label: "Community",
    href: "/community-resources",
    dropdown: [
      {
        label: "Resources",
        href: "/community-resources",
        description: "Access community resources"
      },
      {
        label: "Events",
        href: "/community-events",
        description: "Upcoming community events"
      },
      {
        label: "Classes",
        href: "/classes",
        description: "Educational opportunities"
      },
      {
        label: "Mental Health",
        href: "/mental-health",
        description: "Mental health services"
      },
      {
        label: "Job Training",
        href: "/job-training",
        description: "Employment preparation"
      }
    ]
  },
  {
    label: "Volunteer",
    href: "/volunteer",
    featured: true,
    dropdown: [
      {
        label: "Volunteer Opportunities",
        href: "/volunteer",
        description: "Ways to get involved"
      },
      {
        label: "Time Bank",
        href: "/time-bank",
        description: "Exchange your time and skills"
      },
      {
        label: "Application",
        href: "/volunteer-application",
        description: "Apply to become a volunteer"
      }
    ]
  },
  {
    label: "Donate",
    href: "/donate",
    featured: true,
    dropdown: [
      {
        label: "Financial Donations",
        href: "/donate",
        description: "Support our programs financially"
      },
      {
        label: "Donate Goods",
        href: "/donate-goods",
        description: "Donate items and supplies"
      },
      {
        label: "Donor Rights",
        href: "/donor-rights",
        description: "Information for donors"
      },
      {
        label: "Donor Advised Funds",
        href: "/donor-advised-funds",
        description: "Strategic giving options"
      }
    ]
  }
];
