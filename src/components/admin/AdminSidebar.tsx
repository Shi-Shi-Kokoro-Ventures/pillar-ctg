import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  ChevronRight,
  Menu,
  X,
  Calendar,
  FileText,
  UserCircle,
  Building,
  SearchCheck,
  Activity,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useRolePermissions } from "@/hooks/useRolePermissions";

type SidebarItem = {
  title: string;
  icon: React.ElementType;
  href: string;
  badge?: string | number;
  roles?: string[];
};

// Define sidebar items for different roles
const getSidebarItems = (role: string | null): SidebarItem[] => {
  // Items all roles can see
  const commonItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin-dashboard",
    },
  ];

  // Role-specific items
  const roleItems: Record<string, SidebarItem[]> = {
    'admin': [
      {
        title: "Applications",
        icon: ClipboardList,
        href: "/admin-applications",
        badge: 15,
      },
      {
        title: "User Management",
        icon: Users,
        href: "/user-management",
      },
      {
        title: "User Activity",
        icon: Activity,
        href: "/user-activity",
      },
      {
        title: "Reports",
        icon: BarChart3,
        href: "/admin-reports",
      },
      {
        title: "Settings",
        icon: Settings,
        href: "/admin-settings",
      },
    ],
    'manager': [
      {
        title: "Team Management",
        icon: UserCircle,
        href: "/admin-applications",
      },
      {
        title: "Department Resources",
        icon: Building,
        href: "/admin-reports",
      },
      {
        title: "Applications",
        icon: ClipboardList,
        href: "/admin-applications",
        badge: 7,
      },
      {
        title: "Reports",
        icon: BarChart3,
        href: "/admin-reports",
      },
    ],
    'case-worker': [
      {
        title: "My Cases",
        icon: ClipboardList,
        href: "/admin-applications", 
        badge: 8,
      },
      {
        title: "Calendar",
        icon: Calendar,
        href: "/admin-reports",
      },
      {
        title: "Resources",
        icon: SearchCheck,
        href: "/admin-settings",
      },
    ],
    'viewer': [
      {
        title: "Reports",
        icon: BarChart3,
        href: "/admin-reports",
      },
      {
        title: "Documents",
        icon: FileText,
        href: "/admin-applications",
      },
    ],
  };

  // For admin users, always include all items from all roles
  if (role === 'admin') {
    const allRoleItems: SidebarItem[] = [];
    
    // First add admin-specific items
    allRoleItems.push(...roleItems['admin']);
    
    // Then add unique items from other roles not already in the admin items
    const adminPaths = new Set(roleItems['admin'].map(item => item.href));
    
    // Add items from other roles that aren't duplicates
    for (const otherRole of ['manager', 'case-worker', 'viewer']) {
      if (otherRole === 'admin') continue;
      
      const uniqueItems = roleItems[otherRole].filter(item => 
        !adminPaths.has(item.href) && 
        !allRoleItems.some(existing => existing.href === item.href && existing.title === item.title)
      );
      
      allRoleItems.push(...uniqueItems);
    }
    
    return [...commonItems, ...allRoleItems];
  }

  // Return common items plus role-specific items (or empty array if role not found)
  return [...commonItems, ...(role && roleItems[role] ? roleItems[role] : [])];
};

interface AdminSidebarProps {
  perspectiveRole?: string | null;
}

const AdminSidebar = ({ perspectiveRole }: AdminSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { userRole, roleInfo } = useAuth();
  const { getRoleDisplayName } = useRolePermissions();
  
  // If perspectiveRole is provided and the user is an admin, use that role for the sidebar
  // Otherwise use the user's actual role
  const displayRole = (perspectiveRole && userRole === 'admin') ? perspectiveRole : userRole;

  // Get sidebar items based on display role
  const sidebarItems = getSidebarItems(displayRole);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const isAdmin = userRole === 'admin';

  return (
    <>
      {/* Mobile Sidebar Trigger */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileSidebar}
          className="bg-white shadow-md"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={toggleMobileSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300 ease-in-out",
          collapsed ? "w-16" : "w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200">
          {!collapsed && (
            <h1 className="text-xl font-bold text-gray-800">P.I.L.L.A.R.</h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="hidden md:flex"
          >
            <ChevronRight
              className={cn(
                "h-5 w-5 transition-transform",
                collapsed ? "" : "rotate-180"
              )}
            />
          </Button>
        </div>

        {/* User Role Display */}
        {!collapsed && displayRole && (
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-xs text-gray-500">
              {isAdmin && displayRole !== 'admin' ? 'Viewing as' : 'Logged in as'}
            </p>
            <p className="text-sm font-medium text-gray-800">
              {isAdmin && displayRole && displayRole !== 'admin' 
                ? ROLE_DEFINITIONS[displayRole as keyof typeof ROLE_DEFINITIONS]?.name
                : getRoleDisplayName()}
            </p>
            {isAdmin && displayRole !== 'admin' && (
              <p className="text-xs text-blue-600 mt-1">Admin privileges active</p>
            )}
          </div>
        )}

        {/* Sidebar Content */}
        <nav className="mt-5 px-2">
          <ul className="space-y-2">
            {sidebarItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <li key={item.title}>
                  <Link to={item.href}>
                    <div
                      className={cn(
                        "flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                        isActive
                          ? "bg-gradient-to-r from-redcross to-redcross-light text-white"
                          : "text-gray-700 hover:bg-gray-100",
                        collapsed ? "justify-center" : "justify-start"
                      )}
                    >
                      <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")} />
                      {!collapsed && <span>{item.title}</span>}
                      {!collapsed && item.badge && (
                        <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>

      {/* Content Spacer for Fixed Sidebar */}
      <div className={cn("transition-all duration-300", collapsed ? "md:ml-16" : "md:ml-64")} />
    </>
  );
};

export default AdminSidebar;
