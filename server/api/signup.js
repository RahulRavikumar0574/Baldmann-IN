// api/signup.js
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
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  if (req.method !== 'POST') return res.status(405).end();

  const { email, password } = req.body;
  console.log('Signup attempt:', { email, passwordLength: password?.length });
  
  try {
    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        emailRedirectTo: 'https://baldmann-frontend.vercel.app/baldsphere/app/login'
      }
    });
    
    if (error) {
      console.error('Signup error:', error);
      return res.status(400).json({ error: error.message });
    }
    
    console.log('Signup success:', data.user?.id);
    res.json({ user: data.user, session: data.session });
  } catch (e) {
    console.error('Unexpected signup error:', e);
    return res.status(500).json({ error: 'Internal server error' });
  }
}