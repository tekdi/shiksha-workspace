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
