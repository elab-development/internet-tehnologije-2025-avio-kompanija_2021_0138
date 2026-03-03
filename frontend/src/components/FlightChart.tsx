import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Cell } from 'recharts';

const FlightChart = ({ data }: { data: any[] }) => {
  // Uzimamo samo prvih 6-7 letova da grafikon ne bude pretrpann
  const chartData = data.slice(0, 7).map(f => ({
    name: f.odrediste,
    cena: f.cena,
    relacija: `${f.polaziste} - ${f.odrediste}`
  }));

  return (
    <div className="bg-white/5 border border-white/10 p-6 rounded-3xl mb-8 h-[350px] w-full glass shadow-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-white font-bold font-display text-lg">Analiza cena po destinacijama</h3>
        <span className="text-xs text-muted-foreground bg-white/5 px-3 py-1 rounded-full border border-white/10">
          Valuta: RSD
        </span>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false}
            dy={10}
          />
          <YAxis 
            stroke="#888" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false} 
            tickFormatter={(value) => `${value / 1000}k`}
          />
          <Tooltip 
            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
            contentStyle={{ 
              backgroundColor: '#1a1a2e', 
              border: '1px solid rgba(255,255,255,0.1)', 
              borderRadius: '16px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' 
            }}
            itemStyle={{ color: '#8b5cf6', fontWeight: 'bold' }}
            labelStyle={{ color: '#fff', marginBottom: '4px' }}
          />
          <Bar dataKey="cena" radius={[8, 8, 0, 0]} barSize={45}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8b5cf6' : '#3b82f6'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FlightChart;