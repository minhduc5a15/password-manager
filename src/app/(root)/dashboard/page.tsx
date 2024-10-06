'use client';

import { Button } from '@/components/ui';
import { storage } from '@/lib/db/firebase';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Page() {
    const [url, setUrl] = useState('');

    const test = async () => {
        await axios
            .get('/api/images/logo/facebook.png')
            .then(res => {
                console.log(res)
                setUrl(res.data);
            })
            .catch((err) => {
                console.error(err)
                return;
            });
    };

    return (
        <div className={'w-screen h-screen'}>
            <Button onClick={test}>Test</Button>
            {url && <img src={url} />}
        </div>
    );
}
