import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://baldmann.in',
    'https://baldmann-frontend.vercel.app'
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST', 'OPTIONS']);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, phone, service, company, message } = req.body || {};

  const serviceString = Array.isArray(service) ? service.join(', ') : service;

  if (!name || !email || !serviceString || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const finalMessage = company
      ? `Company: ${company}\n\n${message}`
      : message;

    console.log('POST /api/service-request payload:', { name, email, phone, service: serviceString, company });
    const { data, error } = await supabase
      .from('service_requests')
      .insert([
        {
          name,
          email,
          phone: phone || null,
          service: serviceString,
          message: finalMessage,
          status: 'new'
        },
      ])
      .select();

    if (error) {
      console.error('Supabase insert error:', error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(201).json({ success: true, id: data?.[0]?.id });
  } catch (e) {
    console.error('Unhandled error:', e);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
