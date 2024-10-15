import { NextApiRequest, NextApiResponse } from 'next';
import { genericEditorSaveFormResponse, telemetryResponse,
  creatLockResponse, genericEditorReviewFormResponse } from './mocked-response';
  
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { path } = query;

  let pathString = Array.isArray(path) ? path.join('/') : (path as string);

  const BASE_URL = process.env.BASE_URL as string;
  const API_KEY = process.env.AUTH_API_TOKEN as string;
  const TENANT_ID = process.env.TENANT_ID as string;

  if (pathString === '/action/data/v3/telemetry') {
    return res.status(200).json(telemetryResponse);
  }

  if (pathString === '/action/data/v1/form/read') {
    if (req.body.request.action === 'save' && req.body.request.subType === 'resource') {
      return res.status(200).json(genericEditorSaveFormResponse);
    }
    if (req.body.request.action === 'review' && req.body.request.subType === 'resource') {
      return res.status(200).json(genericEditorReviewFormResponse);
    }
    console.log('req body ====>', req.body);
  }

  if (pathString === '/action/lock/v1/create') {
    return res.status(200).json(creatLockResponse);
  }

  if (pathString.startsWith('/action/framework/v3/read/')) {
    pathString = pathString.replace('/action/framework/v3/read/', '/api/framework/v1/read/');
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
