import { useEffect, useState } from "react";
import {
    LineChart, Line, XAxis, YAxis, Tooltip,
    CartesianGrid, ResponsiveContainer
} from "recharts";

type MovementData = {
    date: string;
    count: number;
};

function MovementChart() {
    const [data, setData] = useState<MovementData[]>([]);

    useEffect(() => {

        const fetchData = () => {
            fetch("/api/movement")
                .then(res => res.json())
                .then((rawData: MovementData[]) => {

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
                        stroke="#2196F3" 
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MovementChart;