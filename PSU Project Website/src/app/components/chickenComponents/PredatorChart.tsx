import { useEffect, useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    CartesianGrid, ResponsiveContainer
} from "recharts";

type PredatorData = {
    date: string;
    count: number;
};

function PredatorChart() {
    const [data, setData] = useState<PredatorData[]>([]);

    useEffect(() => {
        const fetchData = () => {
            fetch("/api/predators")
                .then(res => res.json())
                .then((rawData: PredatorData[]) => {

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
        };

        fetchData();

        const interval = setInterval(fetchData, 3000);

        return () => clearInterval(interval);
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
                        dataKey="count" 
                        stroke="#FF5722" 
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PredatorChart;