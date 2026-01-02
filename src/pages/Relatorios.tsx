import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Download, FileText, TrendingUp, Calendar, DollarSign } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', presenca: 850, coletas: 12500 },
  { name: 'Fev', presenca: 920, coletas: 14200 },
  { name: 'Mar', presenca: 880, coletas: 13800 },
  { name: 'Abr', presenca: 950, coletas: 15600 },
  { name: 'Mai', presenca: 900, coletas: 14900 },
  { name: 'Jun', presenca: 980, coletas: 16200 },
];

const reports = [
  { id: 1, name: "Relatório Mensal - Junho 2024", type: "Mensal", date: "01/07/2024", status: "Completo" },
  { id: 2, name: "Relatório de Coletas - Q2 2024", type: "Trimestral", date: "30/06/2024", status: "Completo" },
  { id: 3, name: "Relatório de Presença - Junho", type: "Mensal", date: "01/07/2024", status: "Pendente" },
  { id: 4, name: "Relatório Musical - Junho", type: "Mensal", date: "01/07/2024", status: "Em análise" },
];

const Relatorios = () => {
  return (
    <MainLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">Relatórios</h1>
            <p className="mt-1 text-muted-foreground">
              Análises e relatórios da congregação
            </p>
          </div>
          <Button className="gap-2">
            <FileText className="h-4 w-4" />
            Gerar Relatório
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">+12%</p>
              <p className="text-sm text-muted-foreground">Crescimento</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Calendar className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">24</p>
              <p className="text-sm text-muted-foreground">Relatórios gerados</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <DollarSign className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">R$ 87.200</p>
              <p className="text-sm text-muted-foreground">Total semestral</p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div className="rounded-xl bg-card p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-6">Presença e Coletas - 2024</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 20%, 88%)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(0, 0%, 100%)',
                    border: '1px solid hsl(45, 20%, 88%)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="presenca" fill="hsl(38, 92%, 50%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="rounded-xl bg-card shadow-card overflow-hidden">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Relatórios Recentes</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Nome</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Tipo</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Data</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reports.map((report) => (
                  <tr key={report.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{report.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{report.type}</td>
                    <td className="px-6 py-4 text-muted-foreground">{report.date}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${
                        report.status === "Completo" 
                          ? "bg-emerald-500/10 text-emerald-600"
                          : report.status === "Pendente"
                          ? "bg-amber-500/10 text-amber-600"
                          : "bg-blue-500/10 text-blue-600"
                      }`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Button variant="ghost" size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        Baixar
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Relatorios;
