import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Droplets, Gauge, TrendingDown, AlertTriangle, Activity, Waves } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { Badge } from "../../components/ui/badge";
import { useIsMobile } from "../../components/ui/use-mobile";

// Mock data
const waterUsage = [
  { hour: "00:00", usage: 45 },
  { hour: "04:00", usage: 35 },
  { hour: "08:00", usage: 85 },
  { hour: "12:00", usage: 120 },
  { hour: "16:00", usage: 95 },
  { hour: "20:00", usage: 110 },
  { hour: "23:59", usage: 55 },
];

const reservoirLevels = [
  { date: "Feb 26", main: 65, backup: 85 },
  { date: "Feb 27", main: 62, backup: 83 },
  { date: "Feb 28", main: 58, backup: 82 },
  { date: "Mar 1", main: 55, backup: 80 },
  { date: "Mar 2", main: 53, backup: 78 },
  { date: "Mar 3", main: 52, backup: 76 },
];

const flowData = [
  { zone: "Irrigation", flow: 35 },
  { zone: "Livestock", flow: 20 },
  { zone: "Processing", flow: 15 },
  { zone: "Domestic", flow: 12 },
  { zone: "Reserve", flow: 8 },
];

export function WaterDistribution() {
  const isMobile = useIsMobile();

  const zones = [
    { name: "Zone A - Irrigation", status: "active", flow: "85 L/min", pressure: "2.8 bar", valve: "open" },
    { name: "Zone B - Livestock", status: "active", flow: "42 L/min", pressure: "2.5 bar", valve: "open" },
    { name: "Zone C - Processing", status: "standby", flow: "0 L/min", pressure: "2.2 bar", valve: "closed" },
    { name: "Zone D - Domestic", status: "active", flow: "28 L/min", pressure: "3.0 bar", valve: "open" },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Droplets className="w-8 h-8 text-blue-500" />
            Water Distribution System
          </h2>
          <p className="text-slate-600 mt-1">Smart water management and conservation</p>
        </div>
        <Badge variant="outline" className="self-start bg-yellow-50 text-yellow-700 border-yellow-200 text-base sm:text-lg px-4 py-2 sm:self-auto">
          Conservation Mode
        </Badge>
      </div>

      {/* Alert Banner */}
      <Card className="border-l-4 border-l-orange-500 bg-orange-50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-orange-900">Water Conservation Alert</div>
              <p className="text-sm text-orange-800 mt-1">
                Main reservoir at 52% capacity. Conservation measures active. Prioritizing essential systems.
                Borehole backup system available if needed.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Main Reservoir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-slate-900">52%</span>
            </div>
            <p className="text-xs text-orange-600 mt-1 flex items-center gap-1">
              <TrendingDown className="w-3 h-3" />
              15,600 L remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Backup Reservoir</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-green-500" />
              <span className="text-2xl font-bold text-slate-900">76%</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">11,400 L available</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Current Flow</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-slate-900">155 L/m</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">Across all zones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">System Pressure</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-slate-600" />
              <span className="text-2xl font-bold text-slate-900">2.6 bar</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">Normal range</p>
          </CardContent>
        </Card>
      </div>

      {/* Zone Status */}
      <Card>
        <CardHeader>
          <CardTitle>Distribution Zones</CardTitle>
          <CardDescription>Active zones and valve control</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {zones.map((zone) => (
              <div key={zone.name} className={`flex flex-col gap-3 rounded-lg border-2 p-4 sm:flex-row sm:items-center sm:justify-between ${
                zone.status === 'active' ? 'bg-blue-50 border-blue-200' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-start gap-4 sm:items-center">
                  <div className={`w-3 h-3 rounded-full ${
                    zone.status === 'active' ? 'bg-green-500 animate-pulse' : 'bg-slate-400'
                  }`}></div>
                  <div>
                    <div className="font-medium text-slate-900">{zone.name}</div>
                    <div className="text-sm text-slate-600 mt-1">
                      Flow: {zone.flow} • Pressure: {zone.pressure}
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Badge className={zone.status === 'active' ? 'bg-green-600' : 'bg-slate-600'}>
                    {zone.status}
                  </Badge>
                  <Badge variant="outline" className={
                    zone.valve === 'open' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-slate-50 text-slate-700 border-slate-200'
                  }>
                    Valve: {zone.valve}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Water Usage Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Water Usage Today</CardTitle>
            <CardDescription>Hourly consumption (liters/minute)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={waterUsage}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="hour" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} label={{ value: 'L/min', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Area 
                  type="monotone" 
                  dataKey="usage" 
                  stroke="#3b82f6" 
                  fill="#3b82f6" 
                  fillOpacity={0.3}
                  name="Water Usage"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Flow Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Flow Distribution by Zone</CardTitle>
            <CardDescription>Current water allocation (%)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={flowData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis type="number" stroke="#64748b" fontSize={12} />
                <YAxis dataKey="zone" type="category" stroke="#64748b" fontSize={isMobile ? 10 : 12} width={isMobile ? 72 : 100} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="flow" fill="#3b82f6" name="Flow %" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Reservoir Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Reservoir Level Trends (7 Days)</CardTitle>
          <CardDescription>Main and backup water storage capacity</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reservoirLevels}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
              <Line 
                type="monotone" 
                dataKey="main" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                name="Main Reservoir"
                dot={{ fill: '#3b82f6' }}
              />
              <Line 
                type="monotone" 
                dataKey="backup" 
                stroke="#10b981" 
                strokeWidth={2} 
                name="Backup Reservoir"
                dot={{ fill: '#10b981' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Water Quality & Pumps */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Water Quality Monitoring</CardTitle>
            <CardDescription>Latest test results</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { parameter: "pH Level", value: "7.2", status: "excellent", range: "6.5 - 8.5" },
                { parameter: "Turbidity", value: "0.8 NTU", status: "excellent", range: "< 5 NTU" },
                { parameter: "TDS", value: "245 ppm", status: "good", range: "< 500 ppm" },
                { parameter: "Chlorine", value: "0.3 ppm", status: "good", range: "0.2 - 0.5 ppm" },
              ].map((item) => (
                <div key={item.parameter} className="flex flex-col gap-2 rounded-lg bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{item.parameter}</div>
                    <div className="text-xs text-slate-600 mt-1">Range: {item.range}</div>
                  </div>
                  <div className="sm:text-right">
                    <div className="font-bold text-slate-900">{item.value}</div>
                    <Badge 
                      variant="outline"
                      className={`mt-1 ${
                        item.status === 'excellent' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-blue-50 text-blue-700 border-blue-200'
                      }`}
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pump Station Status</CardTitle>
            <CardDescription>Active pumps and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Main Pump 1", status: "active", power: "2.2 kW", uptime: "18h 32m" },
                { name: "Main Pump 2", status: "standby", power: "0 kW", uptime: "N/A" },
                { name: "Backup Pump", status: "standby", power: "0 kW", uptime: "N/A" },
                { name: "Borehole Pump", status: "ready", power: "0 kW", uptime: "N/A" },
              ].map((pump) => (
                <div key={pump.name} className="flex flex-col gap-3 rounded-lg bg-slate-50 p-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3 sm:items-center">
                    <div className={`w-3 h-3 rounded-full ${
                      pump.status === 'active' ? 'bg-green-500 animate-pulse' : 
                      pump.status === 'standby' ? 'bg-yellow-500' : 
                      'bg-blue-500'
                    }`}></div>
                    <div>
                      <div className="font-medium text-slate-900">{pump.name}</div>
                      <div className="text-xs text-slate-600 mt-1">Power: {pump.power}</div>
                    </div>
                  </div>
                  <div className="sm:text-right">
                    <Badge className={
                      pump.status === 'active' ? 'bg-green-600' :
                      pump.status === 'standby' ? 'bg-yellow-600' :
                      'bg-blue-600'
                    }>
                      {pump.status}
                    </Badge>
                    <div className="text-xs text-slate-600 mt-1">{pump.uptime}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conservation Measures */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Active Conservation Measures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
              <span>Irrigation schedules optimized to reduce water usage by 15%</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
              <span>Non-essential water usage restricted until reservoir levels improve</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
              <span>Borehole backup system on standby for emergency use</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
              <span>Rainwater collection systems active - 60% chance of rain Thursday</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Droplets className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">27,000 L</div>
              <div className="text-sm text-slate-600">Total Capacity</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Activity className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">8,450 L</div>
              <div className="text-sm text-slate-600">Used Today</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <TrendingDown className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">-18%</div>
              <div className="text-sm text-slate-600">vs. Last Week</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Gauge className="w-8 h-8 text-slate-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">3.2 days</div>
              <div className="text-sm text-slate-600">Supply Estimate</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Data Source Note */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live data via LoRa network • Last update: {new Date().toLocaleTimeString()} • Group 5 Module</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
