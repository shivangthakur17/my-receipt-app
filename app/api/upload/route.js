import { NextResponse } from 'next/server';
import { BlobServiceClient } from '@azure/storage-blob';
import ImageAnalysisClient from '@azure-rest/ai-vision-image-analysis';

// Add this line at the top of your route.js file
export const bodyParser = false;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');
    if (!file) return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });

    // 1. Upload to Azure Blob Storage
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient('receipt-uploads');
    const blobClient = containerClient.getBlockBlobClient(file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    await blobClient.uploadData(buffer);

    // 2. AI Vision Analysis (OCR)
    const client = ImageAnalysisClient(
      process.env.AZURE_AI_VISION_ENDPOINT, 
     { key: process.env.AZURE_AI_VISION_KEY }
    );

    const result = await client.path('/imageanalysis:analyze', buffer).post({
    queryParameters: { features: 'read' },
    // Explicitly tell Azure we are sending an image, not JSON
     contentType: 'image/jpeg', 
     body: buffer
    });

    return NextResponse.json({ data: result.body });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}