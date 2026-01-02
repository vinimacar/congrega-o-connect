import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', coletas: 12500 },
  { month: 'Fev', coletas: 14200 },
  { month: 'Mar', coletas: 13800 },
  { month: 'Abr', coletas: 15600 },
  { month: 'Mai', coletas: 14900 },
  { month: 'Jun', coletas: 16200 },
];

export function CollectionChart() {
  return (
    <div className="rounded-xl bg-card p-6 shadow-card animate-slide-up">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Coletas Mensais</h3>
        <p className="text-sm text-muted-foreground">Visão geral das coletas dos últimos 6 meses</p>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorColetas" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(38, 92%, 50%)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 20%, 88%)" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(30, 10%, 45%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(30, 10%, 45%)', fontSize: 12 }}
              tickFormatter={(value) => `R$${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(0, 0%, 100%)',
                border: '1px solid hsl(45, 20%, 88%)',
                borderRadius: '8px',
                boxShadow: '0 4px 20px -4px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Coletas']}
            />
            <Area 
              type="monotone" 
              dataKey="coletas" 
              stroke="hsl(38, 92%, 50%)" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorColetas)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
