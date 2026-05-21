
"use client"

import * as React from "react"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarHeader, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarGroup,
  SidebarGroupContent
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import { 
  Wrench, 
  BarChart3, 
  Edit, 
  Settings, 
  Megaphone, 
  CreditCard, 
  Users, 
  UserCog, 
  DollarSign
} from "lucide-react"
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase'
import { doc } from 'firebase/firestore'

const adminMenuItems = [
  { id: 'analytics', title: 'Analytics', icon: <BarChart3 className="w-4 h-4" />, color: 'text-blue-500' },
  { id: 'tools', title: 'Tool List', icon: <Wrench className="w-4 h-4" />, color: 'text-orange-500' },
  { id: 'edit', title: 'Edit Tool', icon: <Edit className="w-4 h-4" />, color: 'text-indigo-500' },
  { id: 'settings', title: 'Site Setting', icon: <Settings className="w-4 h-4" />, color: 'text-slate-500' },
  { id: 'ads', title: 'Add Management', icon: <Megaphone className="w-4 h-4" />, color: 'text-pink-500' },
  { id: 'subscriptions', title: 'Subscription Manage', icon: <CreditCard className="w-4 h-4" />, color: 'text-emerald-500' },
  { id: 'users', title: 'User List', icon: <Users className="w-4 h-4" />, color: 'text-cyan-500' },
  { id: 'manage-user', title: 'Manage User', icon: <UserCog className="w-4 h-4" />, color: 'text-purple-500' },
  { id: 'payments', title: 'Payment Manage', icon: <DollarSign className="w-4 h-4" />, color: 'text-amber-500' },
];

export function AppSidebar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view') || 'analytics';
  const isAdminPath = pathname?.startsWith('/admin');
  const db = useFirestore();

  const siteConfigRef = useMemoFirebase(() => doc(db, 'admin_settings', 'site_config'), [db]);
  const { data: siteConfig } = useDoc(siteConfigRef);

  const siteName = siteConfig?.siteName || 'clypio Utility Hub';
  const logoUrl = siteConfig?.logoUrl;

  if (!isAdminPath) {
    return null;
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b p-4">
        <Link href="/" className="flex items-center gap-2">
          <img
            src={logoUrl || "/favicon.ico"}
            alt="Site Logo"
            className="w-8 h-8 object-contain shrink-0"
          />
          <span className="font-bold text-primary truncate group-data-[collapsible=icon]:hidden">{siteName}</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminMenuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={currentView === item.id}
                    tooltip={item.title}
                  >
                    <Link href={`/admin?view=${item.id}`} className="flex items-center gap-3">
                      <div className={`p-1 rounded-md shrink-0 ${item.color}`}>
                        {item.icon}
                      </div>
                      <span className="group-data-[collapsible=icon]:hidden">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
