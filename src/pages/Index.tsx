import { MainLayout } from "@/components/layout/MainLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { EventsList } from "@/components/dashboard/EventsList";
import { CollectionChart } from "@/components/dashboard/CollectionChart";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { Building2, Users, Music, Calendar } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="pt-12 lg:pt-0">
          <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Dashboard</h1>
          <p className="mt-1 text-muted-foreground">
            Bem-vindo ao sistema de gestão CCB
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Congregações"
            value={12}
            description="Ativas no sistema"
            icon={Building2}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Membros"
            value={1248}
            description="Cadastrados"
            icon={Users}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Músicos"
            value={156}
            description="Oficializados"
            icon={Music}
            trend={{ value: 5, isPositive: true }}
          />
          <StatsCard
            title="Eventos"
            value={28}
            description="Este mês"
            icon={Calendar}
            trend={{ value: 15, isPositive: true }}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <CollectionChart />
            <EventsList />
          </div>
          
          <div className="space-y-6">
            <QuickActions />
            
            {/* Avisos */}
            <div className="rounded-xl bg-gradient-to-br from-primary/10 to-accent/5 p-6 border border-primary/20 animate-slide-up">
              <h3 className="font-semibold text-card-foreground mb-2">Avisos Importantes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  Reunião ministerial agendada para sexta-feira
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  Ensaio regional confirmado para sábado às 15h
                </li>
                <li className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  Atualização dos relatórios mensais pendente
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
