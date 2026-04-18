import { useState, useEffect } from 'react';

// Define what a single data point looks like
export interface PowerDataPoint {
  time: string;
  power: number;
}

export const useSolarPower = () => {
  const [chartData, setChartData] = useState<PowerDataPoint[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/api/solar-hourly')
        .then((res) => res.json())
        .then((data) => {
          // Safety Check: Ensure 'data' is actually an array
          if (!Array.isArray(data)) {
            console.error("API did not return an array:", data);
            return;
          }

          const formatted = data.map((item: any) => {
            // 1. Safe Date Parsing
            const dateObj = new Date(item.hour_bucket);
            const timeLabel = isNaN(dateObj.getTime()) 
              ? "00:00" // Fallback if date is broken
              : dateObj.toLocaleTimeString('en-ZA', {
                  hour: '2-digit', 
                  minute: '2-digit', 
                  hour12: false
                });

            // 2. Safe Power Parsing (Prevents .toFixed crashes)
            const rawValue = parseFloat(item.avg_power);
            const powerValue = isNaN(rawValue) ? 0 : parseFloat(rawValue.toFixed(2));

            return {
              time: timeLabel,
              power: powerValue
            };
          });

          setChartData(formatted);
          setLoading(false);
        })
        .catch(err => {
          console.error("Connection Error:", err);
          setLoading(false);
        });
    };

    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  return { chartData, loading };
};

