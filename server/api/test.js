export default async function handler(req, res) {
  try {
    // Test 1: Basic response
    const tests = {
      method: req.method,
      hasSupabaseUrl: !!process.env.SUPABASE_URL,
      hasSupabaseKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      supabaseUrlPrefix: process.env.SUPABASE_URL?.substring(0, 20),
    };

    // Test 2: Try to import Supabase
    let supabaseImportWorks = false;
    let supabaseError = null;
    try {
      const { createClient } = await import('@supabase/supabase-js');
      supabaseImportWorks = true;
      
      // Test 3: Try to create client
      const supabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY
      );
      tests.supabaseClientCreated = !!supabase;
    } catch (e) {
      supabaseError = e.message;
    }

    return res.status(200).json({
      ok: true,
      tests,
      supabaseImportWorks,
      supabaseError,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
      stack: error.stack,
    });
  }
}
