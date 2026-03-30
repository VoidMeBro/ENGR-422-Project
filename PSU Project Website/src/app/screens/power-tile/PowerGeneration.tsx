import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Zap, TrendingUp, Battery, Sun, AlertCircle } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "../../components/ui/badge";
import { useIsMobile } from "../../components/ui/use-mobile";

// Mock data
const hourlyGeneration = [
  { hour: "06:00", solar: 5, battery: 0 },
  { hour: "08:00", solar: 35, battery: 5 },
  { hour: "10:00", solar: 65, battery: 10 },
  { hour: "12:00", solar: 85, battery: 15 },
  { hour: "14:00", solar: 75, battery: 12 },
  { hour: "16:00", solar: 50, battery: 8 },
  { hour: "18:00", solar: 15, battery: 3 },
  { hour: "20:00", solar: 0, battery: 0 },
];

const energyDistribution = [
  { name: "Irrigation", value: 35, color: "#3b82f6" },
  { name: "Chicken Coop", value: 20, color: "#f59e0b" },
  { name: "Processing", value: 25, color: "#10b981" },
  { name: "Lighting", value: 15, color: "#8b5cf6" },
  { name: "Other", value: 5, color: "#6b7280" },
];

export function PowerGeneration() {
  const isMobile = useIsMobile();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-500" />
            Power Generation
          </h2>
          <p className="text-slate-600 mt-1">Solar energy monitoring and management</p>
        </div>
        <Badge variant="outline" className="self-start bg-green-50 text-green-700 border-green-200 text-base sm:text-lg px-4 py-2 sm:self-auto">
          Online
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Current Output</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Sun className="w-5 h-5 text-yellow-500" />
              <span className="text-2xl font-bold text-slate-900">68.5 kW</span>
            </div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +12% from avg
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Battery Storage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold text-slate-900">78%</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">23.4 kWh available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Today's Total</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">342 kWh</div>
            <p className="text-xs text-slate-600 mt-1">Est. 450 kWh by sunset</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Grid Status</CardTitle>
          </CardHeader>
          <CardContent>
            <Badge className="bg-green-600">Independent</Badge>
            <p className="text-xs text-slate-600 mt-2">0 kW from grid</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generation Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Solar Generation Today</CardTitle>
            <CardDescription>Hourly power generation and battery charging</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyGeneration}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} label={{ value: 'kW', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="solar" fill="#fbbf24" name="Solar Generation" />
                <Bar dataKey="battery" fill="#10b981" name="Battery Charge" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Energy Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Energy Distribution</CardTitle>
            <CardDescription>Current power consumption by system</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={energyDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={isMobile ? false : ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={isMobile ? 70 : 100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {energyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {energyDistribution.map((entry) => (
                <div key={entry.name} className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2 text-sm">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: entry.color }}></span>
                    <span className="truncate text-slate-700">{entry.name}</span>
                  </div>
                  <span className="font-medium text-slate-900">{entry.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Solar Panel Status */}
      <Card>
        <CardHeader>
          <CardTitle>Solar Panel Array Status</CardTitle>
          <CardDescription>Individual panel performance monitoring</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((panel) => {
              const performance = Math.floor(Math.random() * 15) + 85; // 85-100%
              const status = performance >= 95 ? 'excellent' : performance >= 85 ? 'good' : 'warning';
              const bgColor = status === 'excellent' ? 'bg-green-100' : status === 'good' ? 'bg-blue-100' : 'bg-yellow-100';
              const textColor = status === 'excellent' ? 'text-green-700' : status === 'good' ? 'text-blue-700' : 'text-yellow-700';
              
              return (
                <div key={panel} className={`${bgColor} rounded-lg p-3 text-center`}>
                  <div className="font-bold text-slate-900">Panel {panel}</div>
                  <div className={`text-lg font-bold ${textColor}`}>{performance}%</div>
                  <div className="text-xs text-slate-600">{(performance * 0.1).toFixed(1)} kW</div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* System Messages */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            System Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
              <span>All solar panels operating at optimal efficiency</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
              <span>Battery bank fully charged and ready for evening operations</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
              <span>Next maintenance scheduled for March 15, 2026</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
              <span>Weather forecast predicts cloudy conditions tomorrow - expect 30% reduced output</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Data Source Note */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live data via LoRa network • Last update: {new Date().toLocaleTimeString()} • Group 2 Module</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
