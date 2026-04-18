import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Zap, TrendingUp, Battery, Sun, Sunrise, Sunset, AlertCircle } from "lucide-react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Badge } from "../../components/ui/badge";
import { useIsMobile } from "../../components/ui/use-mobile";
import { Progress } from "../../components/ui/progress";
import {BatteryStatus, useBatteryData} from "./BatteryLevel";
import {LightLevelPercentage} from "./LightLevel";
import {useSunData} from "./SunData";
import { useSolarPower } from "./SolarPower";

// Mock data for Power Out (Wh) hourly
const powerOutData = [
  { hour: "00:00", power: 120 },
  { hour: "01:00", power: 100 },
  { hour: "02:00", power: 95 },
  { hour: "03:00", power: 90 },
  { hour: "04:00", power: 95 },
  { hour: "05:00", power: 150 },
  { hour: "06:00", power: 300 },
  { hour: "07:00", power: 450 },
  { hour: "08:00", power: 650 },
  { hour: "09:00", power: 850 },
  { hour: "10:00", power: 1050 },
  { hour: "11:00", power: 1200 },
  { hour: "12:00", power: 1350 },
  { hour: "13:00", power: 1400 },
  { hour: "14:00", power: 1300 },
  { hour: "15:00", power: 1100 },
  { hour: "16:00", power: 900 },
  { hour: "17:00", power: 700 },
  { hour: "18:00", power: 500 },
  { hour: "19:00", power: 350 },
  { hour: "20:00", power: 250 },
  { hour: "21:00", power: 200 },
  { hour: "22:00", power: 150 },
  { hour: "23:00", power: 130 },
];

// Mock data for Battery Level (%) every 10 minutes
const batteryLevelData = [
  { time: "00:00", level: 85 },
  { time: "00:10", level: 84 },
  { time: "00:20", level: 83 },
  { time: "00:30", level: 82 },
  { time: "00:40", level: 81 },
  { time: "00:50", level: 80 },
  { time: "01:00", level: 79 },
  { time: "01:10", level: 78 },
  { time: "01:20", level: 77 },
  { time: "01:30", level: 76 },
  { time: "01:40", level: 75 },
  { time: "01:50", level: 74 },
  { time: "02:00", level: 73 },
  { time: "02:10", level: 72 },
  { time: "02:20", level: 71 },
  { time: "02:30", level: 70 },
  { time: "02:40", level: 69 },
  { time: "02:50", level: 68 },
  { time: "03:00", level: 67 },
  { time: "03:10", level: 66 },
  { time: "03:20", level: 65 },
  { time: "03:30", level: 65 },
  { time: "03:40", level: 64 },
  { time: "03:50", level: 63 },
  { time: "04:00", level: 62 },
  { time: "04:10", level: 61 },
  { time: "04:20", level: 61 },
  { time: "04:30", level: 60 },
  { time: "04:40", level: 60 },
  { time: "04:50", level: 59 },
  { time: "05:00", level: 59 },
  { time: "05:10", level: 59 },
  { time: "05:20", level: 59 },
  { time: "05:30", level: 58 },
  { time: "05:40", level: 58 },
  { time: "05:50", level: 58 },
  { time: "06:00", level: 58 },
  { time: "06:10", level: 59 },
  { time: "06:20", level: 60 },
  { time: "06:30", level: 61 },
  { time: "06:40", level: 62 },
  { time: "06:50", level: 63 },
  { time: "07:00", level: 64 },
  { time: "07:10", level: 65 },
  { time: "07:20", level: 66 },
  { time: "07:30", level: 67 },
  { time: "07:40", level: 68 },
  { time: "07:50", level: 70 },
  { time: "08:00", level: 71 },
  { time: "08:10", level: 73 },
  { time: "08:20", level: 74 },
  { time: "08:30", level: 76 },
  { time: "08:40", level: 77 },
  { time: "08:50", level: 79 },
  { time: "09:00", level: 80 },
  { time: "09:10", level: 82 },
  { time: "09:20", level: 83 },
  { time: "09:30", level: 85 },
  { time: "09:40", level: 86 },
  { time: "09:50", level: 88 },
  { time: "10:00", level: 89 },
  { time: "10:10", level: 91 },
  { time: "10:20", level: 92 },
  { time: "10:30", level: 93 },
  { time: "10:40", level: 94 },
  { time: "10:50", level: 95 },
  { time: "11:00", level: 96 },
  { time: "11:10", level: 97 },
  { time: "11:20", level: 98 },
  { time: "11:30", level: 98 },
  { time: "11:40", level: 99 },
  { time: "11:50", level: 99 },
  { time: "12:00", level: 100 },
];

// Energy distribution for farm operations
const energyDistribution = [
  { name: "Chicken Coop", value: 25, color: "#f59e0b" },
  { name: "Irrigation", value: 35, color: "#3b82f6" },
  { name: "Other", value: 5, color: "#6b7280" },
  { name: "Processing", value: 25, color: "#10b981" },
  { name: "Lightning", value: 10, color: "#8b5cf6" },
];

export function PowerGeneration() {
  const isMobile = useIsMobile();
  const {sunrise, sunset} = useSunData();
  const { chartData, loading } = useSolarPower();
  const { batteryLevelData, isBatteryLoading, batteryError} = useBatteryData(1);
  
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
      {/* Light Level & Sun Times Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Light Level */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <Sun className="w-5 h-5 text-yellow-500" />
                Light Level
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-slate-900">{LightLevelPercentage()}%</span>
                <span className="text-sm text-slate-600">Current intensity</span>
              </div>
              <Progress value={LightLevelPercentage()} className="h-3" />
            </CardContent>
          </Card>

          {/* Sunrise & Sunset Times */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle>Sun Times - Bela Bela, Gauteng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-orange-100 rounded-lg">
                    <Sunrise className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Sunrise</p>
                    <p className="text-2xl font-bold text-slate-900">{sunrise}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <Sunset className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-600">Sunset</p>
                    <p className="text-2xl font-bold text-slate-900">{sunset}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Battery Status */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2">
              <Battery className="w-5 h-5 text-green-500" />
              Battery Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-slate-900">{BatteryStatus()}%</span>
              <span className="text-sm text-slate-600">Charge level</span>
            </div>
            <Progress value={BatteryStatus()} className="h-3" />
          </CardContent>
        </Card>
        {/* Power Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Power In Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Power In (Wh) - Hourly</CardTitle>
              <CardDescription>{loading? "Fetching live readings..." : "Live solar generation from database"}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="time"
                    stroke="#64748b"
                    fontSize={12}
                    interval={isMobile ? 5 : 2}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    label={{ value: 'Wh', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="power"
                    stroke="#fbbf24"
                    strokeWidth={2}
                    name="Power In"
                    dot={false}
                    animationDuration={1500}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Power Out Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Power Out (Wh) - Hourly</CardTitle>
              <CardDescription>Power consumption throughout the day</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={powerOutData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="hour"
                    stroke="#64748b"
                    fontSize={12}
                    interval={isMobile ? 5 : 2}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    label={{ value: 'Wh', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="power"
                    stroke="#ef4444"
                    strokeWidth={2}
                    name="Power Out"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Battery Level Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Battery Level (%) - 10 Min Intervals</CardTitle>
              <CardDescription>Battery charge level over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={batteryLevelData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="time"
                    stroke="#64748b"
                    fontSize={12}
                    interval={isMobile ? 11 : 5}
                  />
                  <YAxis
                    stroke="#64748b"
                    fontSize={12}
                    domain={[0, 100]}
                    label={{ value: '%', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="level"
                    stroke="#10b981"
                    strokeWidth={2}
                    name="Battery Level"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Energy Distribution Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Energy Distribution</CardTitle>
              <CardDescription>Power consumption by farm operation</CardDescription>
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
        {/* Footer - Data Source Note */}
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
