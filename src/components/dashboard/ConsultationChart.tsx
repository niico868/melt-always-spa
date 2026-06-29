import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { consultationChartData } from "@/data/mockData";

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-100 rounded-lg px-3 py-2 shadow-sm text-xs">
      <div className="text-gray-500">{label}</div>
      <div className="font-semibold text-gray-900">{payload[0].value} submissions</div>
    </div>
  );
}

export function ConsultationChart() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-base font-semibold text-gray-900">Consultation submissions</h3>
        <Select defaultValue="week">
          <SelectTrigger className="w-[110px] h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week" className="text-xs">This week</SelectItem>
            <SelectItem value="month" className="text-xs">This month</SelectItem>
            <SelectItem value="quarter" className="text-xs">This quarter</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <AreaChart data={consultationChartData} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="pinkGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E8246A" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#E8246A" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
            <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{ fill: "#9CA3AF", fontSize: 11 }} />
            <YAxis domain={[0, 40]} tickLine={false} axisLine={false} tick={{ fill: "#9CA3AF", fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="count" stroke="#E8246A" strokeWidth={2} fill="url(#pinkGradient)" activeDot={{ r: 5, fill: "#E8246A" }} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}