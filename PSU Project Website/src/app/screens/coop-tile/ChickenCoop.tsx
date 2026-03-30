import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Bird, Egg, Thermometer, Wind, TrendingUp, AlertCircle } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "../../components/ui/badge";

// Mock data
const eggProduction = [
  { date: "Feb 25", eggs: 145 },
  { date: "Feb 26", eggs: 152 },
  { date: "Feb 27", eggs: 148 },
  { date: "Feb 28", eggs: 158 },
  { date: "Mar 1", eggs: 162 },
  { date: "Mar 2", eggs: 155 },
  { date: "Mar 3", eggs: 168 },
];

const environmentalData = [
  { time: "00:00", temp: 18, humidity: 65 },
  { time: "04:00", temp: 16, humidity: 70 },
  { time: "08:00", temp: 20, humidity: 60 },
  { time: "12:00", temp: 24, humidity: 55 },
  { time: "16:00", temp: 26, humidity: 52 },
  { time: "20:00", temp: 22, humidity: 58 },
  { time: "23:59", temp: 19, humidity: 63 },
];

export function ChickenCoop() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Bird className="w-8 h-8 text-orange-500" />
            Chicken Coop Management
          </h2>
          <p className="text-slate-600 mt-1">Automated poultry monitoring and control</p>
        </div>
        <Badge variant="outline" className="self-start bg-green-50 text-green-700 border-green-200 text-base sm:text-lg px-4 py-2 sm:self-auto">
          Optimal
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Total Birds</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Bird className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-bold text-slate-900">240</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">98.5% health rate</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Today's Eggs</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Egg className="w-5 h-5 text-yellow-600" />
              <span className="text-2xl font-bold text-slate-900">168</span>
            </div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +8% from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-red-500" />
              <span className="text-2xl font-bold text-slate-900">22°C</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">Optimal range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Humidity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-slate-900">58%</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">Ventilation active</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Egg Production Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Egg Production</CardTitle>
            <CardDescription>Daily collection totals</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={eggProduction}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} label={{ value: 'Eggs', angle: -90, position: 'insideLeft' }} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Bar dataKey="eggs" fill="#f59e0b" name="Eggs Collected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Environmental Conditions */}
        <Card>
          <CardHeader>
            <CardTitle>Environmental Conditions (24h)</CardTitle>
            <CardDescription>Temperature and humidity monitoring</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={environmentalData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                <YAxis stroke="#64748b" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                <Line 
                  type="monotone" 
                  dataKey="temp" 
                  stroke="#ef4444" 
                  strokeWidth={2} 
                  name="Temperature (°C)"
                  dot={{ fill: '#ef4444' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="humidity" 
                  stroke="#3b82f6" 
                  strokeWidth={2} 
                  name="Humidity (%)"
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Feeding Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Automated Feeding Schedule</CardTitle>
          <CardDescription>Daily feed distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { time: "06:00", status: "completed", amount: "12 kg" },
              { time: "12:00", status: "completed", amount: "12 kg" },
              { time: "18:00", status: "pending", amount: "12 kg" },
              { time: "22:00", status: "scheduled", amount: "8 kg" },
            ].map((feed) => (
              <div key={feed.time} className={`rounded-lg p-4 border-2 ${
                feed.status === 'completed' ? 'bg-green-50 border-green-200' :
                feed.status === 'pending' ? 'bg-yellow-50 border-yellow-200' :
                'bg-slate-50 border-slate-200'
              }`}>
                <div className="font-bold text-lg text-slate-900">{feed.time}</div>
                <div className="text-sm text-slate-600 mt-1">{feed.amount}</div>
                <Badge 
                  className={`mt-2 ${
                    feed.status === 'completed' ? 'bg-green-600' :
                    feed.status === 'pending' ? 'bg-yellow-600' :
                    'bg-slate-600'
                  }`}
                >
                  {feed.status.charAt(0).toUpperCase() + feed.status.slice(1)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Health Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Health Monitoring</CardTitle>
            <CardDescription>Flock health status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Active Birds</span>
                <span className="font-bold text-slate-900">237 / 240</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Mortality Rate</span>
                <span className="font-bold text-green-600">0.4%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Vaccination Status</span>
                <Badge className="bg-green-600">Up to date</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Next Vet Visit</span>
                <span className="font-bold text-slate-900">March 20, 2026</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Consumption</CardTitle>
            <CardDescription>Daily averages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Feed Consumption</span>
                <span className="font-bold text-slate-900">44 kg/day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Water Usage</span>
                <span className="font-bold text-slate-900">72 L/day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Power Usage</span>
                <span className="font-bold text-slate-900">18 kWh/day</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-600">Feed Stock Remaining</span>
                <Badge className="bg-yellow-600">480 kg (11 days)</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Alerts */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-blue-500" />
            System Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
              <span>All environmental systems operating normally</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
              <span>Automated feeders functioning correctly</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
              <span>Feed restock recommended within 5 days</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
              <span>Egg production 12% above seasonal average</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Data Source Note */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live data via LoRa network • Last update: {new Date().toLocaleTimeString()} • Group 3 Module</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
