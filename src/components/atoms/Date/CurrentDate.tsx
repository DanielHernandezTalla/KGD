"use client";
import { useEffect, useState } from "react";

const CurrentDate = ({}) => {
    const [date, setDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setDate(new Date()), 1000);
        return function cleanup() {
            clearInterval(timer);
        };
    }, []);

    return (
        <div>
            <span className="text-sm font-semibold text-gray-600 md:text-lg">{`${date.toLocaleDateString(
                "es-MX",
                {
                    timeZone: "America/Hermosillo",
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    hour12: true,
                }
            )}`}</span>
        </div>
    );
};

export default CurrentDate;
