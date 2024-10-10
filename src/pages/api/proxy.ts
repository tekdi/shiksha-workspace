import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { path } = query;

  const pathString = Array.isArray(path) ? path.join('/') : (path as string);

  const BASE_URL = process.env.BASE_URL as string;
  const API_KEY = process.env.AUTH_API_TOKEN as string;
  const TENANT_ID = process.env.TENANT_ID as string;

  if (pathString === '/action/data/v3/telemetry') {
    return res.status(200).json({ message: 'Mocked Success - Skipping actual API call', data: {} });
  }

  if (pathString === '/action/lock/v1/create') {
    const lockResponse = {
      "responseCode": "OK",
      "result": {
        "lockKey": "69d82e1c-6d91-4b2e-a873-39ebeab007b9",
          "expiresAt": "2026-10-09T12:53:41.138Z",
          "expiresIn": 63072000
        }
      };
    return res.status(200).json(lockResponse);
  }

  const queryString = req.url?.includes('?') ? req.url.split('?')[1] : '';

  // Build target URL
  const targetUrl = `${BASE_URL}${pathString}${queryString ? `?${queryString}` : ''}`;
  console.log('Target URL:', targetUrl);

  try {
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`,
        'tenantId': TENANT_ID,
        'X-Channel-Id': 'test-k12-channel'
      },
    };

    if (method === 'POST' || method === 'PATCH') {
      options.body = JSON.stringify(req.body);
    }

    const response = await fetch(targetUrl, options);

    const data = await response.json();

    res.status(response.status).json(data);
  } catch (error: any) {
    console.error('Error in proxy:', error.message);
    res.status(500).json({ message: 'Error fetching data', error: error.message });
  }
}
