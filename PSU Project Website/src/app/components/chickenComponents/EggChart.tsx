import { useEffect, useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    CartesianGrid, ResponsiveContainer
} from "recharts";

type EggData = {
    date: string;
    eggs: number;
};

function EggChart() {
    const [data, setData] = useState<EggData[]>([]);

    useEffect(() => {
        fetch("/api/eggs")
            .then(res => res.json())
            .then((rawData: EggData[]) => {

                const formattedData = rawData.map(item => ({
                    ...item,
                    date: new Date(item.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric"
                    })
                }));

                setData(formattedData);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <LineChart data={data}>
                    <CartesianGrid stroke="#2c2c2c" />
                    <XAxis dataKey="date" stroke="#aaa" />
                    <YAxis stroke="#aaa" />
                    <Tooltip />
                    <Line 
                        type="monotone" 
                        dataKey="eggs" 
                        stroke="#4CAF50" 
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default EggChart;