import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Wheat, Droplets, Thermometer, Bug, TrendingUp, AlertCircle, Sun, Sprout } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "../../components/ui/badge";

// Mock data
const soilMoisture = [
  { time: "00:00", zone1: 68, zone2: 72, zone3: 65 },
  { time: "04:00", zone1: 65, zone2: 70, zone3: 63 },
  { time: "08:00", zone1: 62, zone2: 68, zone3: 60 },
  { time: "12:00", zone1: 58, zone2: 64, zone3: 56 },
  { time: "16:00", zone1: 55, zone2: 62, zone3: 54 },
  { time: "20:00", zone1: 72, zone2: 75, zone3: 70 },
  { time: "23:59", zone1: 70, zone2: 73, zone3: 68 },
];

const cropGrowth = [
  { week: "Week 1", height: 5 },
  { week: "Week 2", height: 12 },
  { week: "Week 3", height: 24 },
  { week: "Week 4", height: 38 },
  { week: "Week 5", height: 55 },
  { week: "Week 6", height: 68 },
];

export function CropFarm() {
  const crops = [
    { name: "Tomatoes", area: "Zone A", status: "Flowering", health: 95, daysToHarvest: 28 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 flex items-center gap-3">
            <Wheat className="w-8 h-8 text-green-600" />
            Crop Farm Management
          </h2>
          <p className="text-slate-600 mt-1">Smart irrigation and crop monitoring system</p>
        </div>
        <Badge variant="outline" className="self-start bg-green-50 text-green-700 border-green-200 text-base sm:text-lg px-4 py-2 sm:self-auto">
          Healthy
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Total Area</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Wheat className="w-5 h-5 text-green-600" />
              <span className="text-2xl font-bold text-slate-900">2.5 ha</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">4 cultivation zones</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Soil Moisture</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Droplets className="w-5 h-5 text-blue-500" />
              <span className="text-2xl font-bold text-slate-900">67%</span>
            </div>
            <p className="text-xs text-slate-600 mt-1">Optimal level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-slate-600">Soil Temperature</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-orange-500" />
              <span className="text-2xl font-bold text-slate-900">23°C</span>
            </div>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              Ideal range
            </p>
          </CardContent>
        </Card>

        {/* Environmental Conditions */}
                  <Card>
                      <CardHeader>
                          <CardTitle>Nutrient Levels</CardTitle>
                          <CardDescription>Soil analysis results</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="space-y-4">
                              {[
                                  { nutrient: "Nitrogen (N)", level: 85, status: "good" },
                                  { nutrient: "Phosphorus (P)", level: 78, status: "good" },
                                  { nutrient: "Potassium (K)", level: 92, status: "excellent" },
                                  { nutrient: "Electroconductivity", level: 6.5, status: "optimal", unit: "S/m" },
                              ].map((item) => (
                                  <div key={item.nutrient}>
                                      <div className="flex items-center justify-between mb-1">
                                          <span className="text-sm text-slate-600">{item.nutrient}</span>
                                          <span className="text-sm font-bold text-slate-900">
                                              {item.level}{item.unit !== undefined ? item.unit : '%'}
                                          </span>
                                      </div>
                                  <div className="w-full bg-slate-200 rounded-full h-2">
                                          <div
                                              className={`h-2 rounded-full ${item.status === 'excellent' ? 'bg-green-600' :
                                                      item.status === 'good' ? 'bg-blue-600' :
                                                          'bg-yellow-600'
                                                  }`}
                                              style={{ width: `${item.level}%` }}
                                          ></div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                      </CardContent>
                  </Card>

              </div>


       

          {/* System Alerts */}
          <Card className="border-l-4 border-l-green-500">
              <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-green-500" />
                      Farm Status
                  </CardTitle>
              </CardHeader>
              <CardContent>
                  <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                          <span>All irrigation systems functioning properly</span>
                      </li>
                      <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></div>
                          <span>Soil moisture levels optimal across all zones</span>
                      </li>
                      <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5"></div>
                          <span>Lettuce harvest ready in Zone B - recommended to harvest within 7 days</span>
                      </li>
                      <li className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5"></div>
                          <span>Rain expected Thursday - automatic irrigation will be adjusted</span>
                      </li>
                  </ul>
              </CardContent>
          </Card>

          {/* Charts */}
          <div>
              {/* Soil Moisture Chart */}
              <Card>
                  <CardHeader>
                      <CardTitle>Soil Moisture Levels (24h)</CardTitle>
                      <CardDescription>Moisture percentage by zone</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={soilMoisture}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                              <XAxis dataKey="time" stroke="#64748b" fontSize={12} />
                              <YAxis stroke="#64748b" fontSize={12} label={{ value: '%', angle: -90, position: 'insideLeft' }} />
                              <Tooltip contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                              <Line
                                  type="monotone"
                                  dataKey="zone1"
                                  stroke="#3b82f6"
                                  strokeWidth={2}
                                  name="Zone A"
                                  dot={{ fill: '#3b82f6' }}
                              />
                              <Line
                                  type="monotone"
                                  dataKey="zone2"
                                  stroke="#10b981"
                                  strokeWidth={2}
                                  name="Zone B"
                                  dot={{ fill: '#10b981' }}
                              />
                              <Line
                                  type="monotone"
                                  dataKey="zone3"
                                  stroke="#f59e0b"
                                  strokeWidth={2}
                                  name="Zone C"
                                  dot={{ fill: '#f59e0b' }}
                              />
                          </LineChart>
                      </ResponsiveContainer>
                  </CardContent>
              </Card>

          </div>

      {/* Crop Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Active Crops</CardTitle>
          <CardDescription>Current cultivation zones and crop health</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {crops.map((crop) => (
              <div key={crop.name} className="border-2 border-slate-200 rounded-lg p-4 hover:border-green-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-bold text-lg text-slate-900">{crop.name}</div>
                    <div className="text-sm text-slate-600">{crop.area}</div>
                  </div>
                  <Sprout className="w-6 h-6 text-green-600" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Status</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      {crop.status}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Health</span>
                    <span className="font-bold text-green-600">{crop.health}%</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Harvest in</span>
                    <span className="font-bold text-slate-900">{crop.daysToHarvest} days</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

   

      {/* Irrigation Schedule */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Irrigation Schedule</CardTitle>
          <CardDescription>Automated watering based on soil moisture sensors</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { zone: "Zone A (Tomatoes)", lastWatered: "20:00 (3 hours ago)", nextWatering: "08:00 tomorrow", status: "scheduled" },
            ].map((schedule) => (
              <div key={schedule.zone} className="flex flex-col gap-3 rounded-lg bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="font-medium text-slate-900">{schedule.zone}</div>
                  <div className="text-sm text-slate-600 mt-1">Last: {schedule.lastWatered}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>


      {/* Data Source Note */}
      <Card className="bg-slate-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Live data via LoRa network • Last update: {new Date().toLocaleTimeString()} • Group 4 Module</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
