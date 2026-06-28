import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  const token = request.headers.get('x-admin-token');
  const validToken = process.env.ADMIN_TOKEN || 'ease_admin_2025';
  if (token !== validToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { fileName } = await request.json();

    if (!fileName) {
      return NextResponse.json({ error: 'fileName is required' }, { status: 400 });
    }

    // Create a signed upload URL for the file in the "social_media" bucket
    const { data, error } = await supabase.storage
      .from('social_media')
      .createSignedUploadUrl(fileName);

    if (error) {
      return NextResponse.json({ error: error.message, debugUrl: process.env.SUPABASE_URL || 'missing' }, { status: 500 });
    }

    return NextResponse.json({ success: true, signedUrl: data.signedUrl, path: data.path });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
