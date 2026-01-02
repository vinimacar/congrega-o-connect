import { 
  LayoutDashboard, 
  Music, 
  BookOpen, 
  FileText, 
  Building2, 
  Users, 
  ListChecks,
  Menu,
  X,
  Calendar,
  GraduationCap,
  Heart,
  HandCoins,
  Megaphone
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Musical", url: "/musical", icon: Music },
  { title: "DARPE", url: "/darpe", icon: Heart },
  { title: "EBI", url: "/ebi", icon: GraduationCap },
  { title: "Reforços de Coletas", url: "/reforcos-coletas", icon: HandCoins },
  { title: "Evangelização", url: "/evangelizacao", icon: Megaphone },
  { title: "Relatórios", url: "/relatorios", icon: FileText },
  { title: "Congregações", url: "/congregacoes", icon: Building2 },
  { title: "Ministério", url: "/ministerio", icon: Users },
  { title: "Listas", url: "/listas", icon: ListChecks },
  { title: "Agendamentos", url: "/agendamentos", icon: Calendar },
];

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 gradient-sidebar transition-transform duration-300 ease-in-out lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center gap-3 px-6 border-b border-sidebar-border">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary shadow-glow">
              <Building2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-sidebar-foreground">CCB Gestão</h1>
              <p className="text-xs text-sidebar-foreground/60">Sistema de Gestão</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <li key={item.title}>
                    <NavLink
                      to={item.url}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                        isActive
                          ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-glow"
                          : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                      )}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-sidebar-border p-4">
            <p className="text-xs text-center text-sidebar-foreground/50">
              © 2024 CCB Gestão
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
