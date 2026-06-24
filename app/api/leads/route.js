import { NextResponse } from 'next/server';
import { supabase } from '../../../lib/supabase';

export async function GET(request) {
  const token = request.headers.get('x-admin-token');
  
  if (token !== process.env.ADMIN_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { data, error } = await supabase
      .from('ease_leads')
      .select('*');

    if (error) throw error;

    return NextResponse.json({ leads: data });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
