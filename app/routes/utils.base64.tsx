import type { MetaFunction } from '@remix-run/node';
import React, { useState } from 'react';
import { Textarea } from '~/components/Textarea';
import { services } from '~/services';

const service = services.find((s) => s.key === 'base64')!;

export const meta: MetaFunction = () => {
    return [
        { title: service.text },
        {
            name: 'description',
            content: 'Encode and decode Base64 strings',
        },
        { name: 'key', content: service.key },
    ];
};

export default function Index() {
    const [decoded, setDecoded] = useState('');
    const [encoded, setEncoded] = useState('');

    const handleDecodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newDecoded = e.target.value;
        setDecoded(newDecoded);

        try {
            // Encode to base64
            const base64Encoded = btoa(newDecoded);
            setEncoded(base64Encoded);

            try {
                // Try to decode the encoded string to verify it's valid base64
                const base64Decoded = atob(base64Encoded);
                setDecoded(base64Decoded);
            } catch {
                setDecoded('Invalid base64 string for decoding');
            }
        } catch (error) {
            setEncoded('Cannot encode: Input contains invalid characters');
            setDecoded('');
        }
    };

    const handleEncodedChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newEncoded = e.target.value;
        setEncoded(newEncoded);

        try {
            const base64Decoded = atob(newEncoded);
            setDecoded(base64Decoded);
        } catch (error) {
            setDecoded('Cannot decode: Input contains invalid characters');
        }
    };

    return (
        <div className="flex mt-16 items-center justify-center p-8">
            <div className="flex w-full max-w-4xl gap-8">
                <div className="flex-1">
                    <h2 className="mb-2 text-lg font-semibold">
                        Base64 Decoded
                    </h2>
                    <Textarea
                        placeholder="Type or base64 decoded text will appear here..."
                        value={decoded}
                        onChange={handleDecodedChange}
                    />
                </div>
                <div className="flex-1 ">
                    <h2 className="mb-2 text-lg font-semibold">
                        Base64 Encoded
                    </h2>
                    <Textarea
                        value={encoded}
                        placeholder="Type or paste Base64 encoded text here..."
                        onChange={handleEncodedChange}
                    />
                </div>
            </div>
        </div>
    );
}
