// pages/index.tsx
'use client';

import { useState, useEffect } from 'react';
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";


interface WhatInterface {
    _id: string;
    name: string;
    text: any;
    disciplines: [any];
    field: object;
    fieldName: string;
    fieldText: any;
    info: any;
}

const WhatTab: React.FC = () => {
    const [data, setData] = useState<WhatInterface[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Define your GROQ query
        const query = `*[_type == "what"]{_id, name, text}`;

        // Fetch data from Sanity
        client.fetch<WhatInterface[]>(query)
            .then((data) => {
                // Ensure data is an array
                if (Array.isArray(data)) {
                    setData(data);
                } else {
                    setError('Fetched data is not an array');
                }
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!data.length) return <div>No data found</div>;

    return (
        <div>
            <h1>My Sanity Data</h1>
            <ul>
                {data.map((item) => (
                    <li key={item._id}>
                        <h2>{item.name}</h2>
                        <PortableText value={item.text} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default WhatTab;
