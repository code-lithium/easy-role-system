
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Settings, 
  LogOut,
  ChevronLeft,
  Shield
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard },
  { title: "Role Management", url: "/roles", icon: Shield },
  { title: "Users", url: "/users", icon: Users },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { logout, user } = useAuth();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-primary/10 text-primary font-medium border-r-2 border-primary" : "hover:bg-muted/50";

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} transition-all duration-300 border-r bg-card`}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-4 h-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div>
                <h2 className="font-semibold text-lg">Dashboard</h2>
                <p className="text-xs text-muted-foreground">Admin Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarContent className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
              Navigation
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigationItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={({ isActive }) => 
                          `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${getNavCls({ isActive })}`
                        }
                      >
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        {!collapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* User Section */}
        <div className="p-4 border-t">
          {!collapsed && user && (
            <div className="mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground capitalize">{user.role}</p>
                </div>
              </div>
            </div>
          )}
          
          <Button
            variant="ghost"
            size={collapsed ? "icon" : "sm"}
            onClick={logout}
            className="w-full justify-start text-muted-foreground hover:text-destructive"
          >
            <LogOut className="w-4 h-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>

        {/* Collapse Toggle */}
        <div className="p-2 border-t">
          <SidebarTrigger asChild>
            <Button variant="ghost" size="icon" className="w-full">
              <ChevronLeft className={`w-4 h-4 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            </Button>
          </SidebarTrigger>
        </div>
      </div>
    </Sidebar>
  );
}
