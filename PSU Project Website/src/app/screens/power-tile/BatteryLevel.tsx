import { useState, useEffect } from "react";

export function BatteryStatus()
{
    const [batteryLevel, setBatteryLevel] = useState<number>(0);

        useEffect(() => {
        const fetchBatteryLevel = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/batteryLevel`);
                const data = await res.json();
                setBatteryLevel(data[0].batteryLevelPercent);
            } catch (error) {
                console.error("Error fetching battery level data:", error);
            }
        };
        fetchBatteryLevel();
    }, []);

    return batteryLevel
}

export default BatteryStatus;