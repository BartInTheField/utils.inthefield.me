import type { MetaFunction } from '@remix-run/node';
import React, { useState } from 'react';
import { Textarea } from '~/components/Textarea';
import { services } from '~/services';

const service = services.find((s) => s.key === 'jwt-decode')!;

export const meta: MetaFunction = () => {
    return [
        { title: service.text },
        {
            name: 'description',
            content: 'Decode a JWT token',
        },
        { name: 'key', content: service.key },
    ];
};

export default function Index() {
    const [token, setToken] = useState('');
    const [header, setHeader] = useState('');
    const [payload, setPayload] = useState('');

    const handleTokenChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newToken = e.target.value;
        setToken(newToken);

        try {
            // Get the header (first) and payload (second) parts of the JWT
            const parts = newToken.split('.');
            if (parts.length !== 3) {
                setHeader('Invalid JWT format');
                setPayload('Invalid JWT format');
                return;
            }

            // Decode the base64 header
            const decodedHeader = atob(
                parts[0].replace(/-/g, '+').replace(/_/g, '/'),
            );
            const jsonHeader = JSON.stringify(
                JSON.parse(decodedHeader),
                null,
                2,
            );
            setHeader(jsonHeader);

            // Decode the base64 payload
            const decodedPayload = atob(
                parts[1].replace(/-/g, '+').replace(/_/g, '/'),
            );
            const jsonPayload = JSON.stringify(
                JSON.parse(decodedPayload),
                null,
                2,
            );
            setPayload(jsonPayload);
        } catch (error) {
            setHeader('Invalid JWT token');
            setPayload('Invalid JWT token');
        }
    };

    return (
        <div className="flex mt-16 items-center justify-center p-8">
            <div className="flex w-full max-w-4xl gap-8">
                <div className="flex-1">
                    <h2 className="mb-2 text-lg font-semibold">JWT Token</h2>
                    <Textarea
                        placeholder="Paste JWT token here..."
                        value={token}
                        onChange={handleTokenChange}
                        className="h-[36rem]"
                    />
                </div>
                <div className="flex-1 space-y-4">
                    <div>
                        <h2 className="mb-2 text-lg font-semibold">Header</h2>
                        <Textarea
                            value={header}
                            readOnly
                            placeholder="JWT header will appear here..."
                            className="h-32"
                        />
                    </div>
                    <div>
                        <h2 className="mb-2 text-lg font-semibold">Payload</h2>
                        <Textarea
                            value={payload}
                            readOnly
                            placeholder="JWT payload will appear here..."
                            className="h-96"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
