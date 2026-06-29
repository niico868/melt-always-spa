import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { topServicesData } from "@/data/mockData";

export function TopServicesChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-3">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Top services (this month)</h3>
      <div style={{ width: "100%", height: 110 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={topServicesData}
              dataKey="percentage"
              nameKey="name"
              innerRadius={30}
              outerRadius={50}
              paddingAngle={1}
              stroke="none"
            >
              {topServicesData.map((d) => (
                <Cell key={d.name} fill={d.fill} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
      <ul className="space-y-1 mt-1">
        {topServicesData.map((d) => (
          <li key={d.name} className="flex items-center gap-2 text-[10px]">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.fill }} />
            <span className="text-gray-600">{d.name}</span>
            <span className="font-semibold text-gray-900 ml-auto">{d.percentage}%</span>
          </li>
        ))}
      </ul>
      <div className="border-t border-gray-100 mt-2 pt-2">
        <table className="w-full">
          <tbody>
            {topServicesData.filter((d) => d.revenue > 0).map((d) => (
              <tr key={d.name} className="border-b border-gray-50 last:border-0">
                <td className="text-[10px] text-gray-600 py-0.5">{d.name}</td>
                <td className="text-[10px] font-semibold text-gray-900 text-right py-0.5">TT${d.revenue.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}