import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

const Dashboard = () => {
  const chartData = [
    { month: 'January', pemasukan: 186, pengeluaran: 80 },
    { month: 'February', pemasukan: 305, pengeluaran: 200 },
    { month: 'March', pemasukan: 237, pengeluaran: 120 },
    { month: 'April', pemasukan: 73, pengeluaran: 190 },
    { month: 'May', pemasukan: 209, pengeluaran: 130 },
    { month: 'June', pemasukan: 170, pengeluaran: 145 },
    { month: 'July', pemasukan: 194, pengeluaran: 110 },
    { month: 'August', pemasukan: 200, pengeluaran: 190 },
    { month: 'September', pemasukan: 280, pengeluaran: 250 },
    { month: 'October', pemasukan: 73, pengeluaran: 200 },
    { month: 'November', pemasukan: 114, pengeluaran: 100 },
    { month: 'December', pemasukan: 204, pengeluaran: 150 },
  ];

  const chartConfig = {
    pemasukan: {
      label: 'Pemasukan',
      color: 'hsl(var(--chart-2))',
    },
    pengeluaran: {
      label: 'Pengeluaran',
      color: 'hsl(var(--chart-5))',
    },
  };

  return (
    <div>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
        <div className="w-2/3">
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar
                dataKey="pemasukan"
                fill="var(--color-pemasukan)"
                radius={4}
              />
              <Bar
                dataKey="pengeluaran"
                fill="var(--color-pengeluaran)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
