import { NextResponse } from 'next/server';

export async function POST(request) {
  const token = request.headers.get('x-admin-token');
  const validToken = process.env.ADMIN_TOKEN || 'ease_admin_2025';
  if (token !== validToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { text, imageUrl, fileId, fileType, title } = body;

    if (!text) {
      return NextResponse.json({ error: 'Text content is required' }, { status: 400 });
    }

    const webhookUrl = process.env.N8N_WEBHOOK_URL || 'https://variz19311.app.n8n.cloud/webhook/publish-social-media';
    
    if (!webhookUrl) {
      return NextResponse.json({ error: 'N8N_WEBHOOK_URL is not configured' }, { status: 500 });
    }

    // Forward the payload to the n8n webhook
    const n8nResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        text,
        imageUrl,
        fileId,
        fileType,
        title,
        timestamp: new Date().toISOString()
      })
    });

    if (!n8nResponse.ok) {
      throw new Error(`n8n webhook failed with status: ${n8nResponse.status}`);
    }

    const n8nData = await n8nResponse.text();

    return NextResponse.json({ 
      success: true, 
      results: { 
        n8n: { status: 'success', message: 'Workflow triggered successfully', data: n8nData }
      }
    });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
