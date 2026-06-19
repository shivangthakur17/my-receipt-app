# Receipt Scanner AI

A high-performance receipt digitization tool built for my midterm project. This application allows users to upload receipt images to securely extract and display key data points using Azure AI Vision.

## Tech Stack
* **Framework**: Next.js (App Router)
* **Storage**: Azure Blob Storage (for secure image persistence)
* **Intelligence**: Azure AI Vision (for OCR data extraction)
* **Deployment**: Azure App Service

## Getting Started
1. Clone this repository.
2. Run `npm install` to install all dependencies.
3. Create a `.env.local` file in the root directory and add your credentials:
```env
   AZURE_STORAGE_CONNECTION_STRING=your_string_here
   AZURE_AI_VISION_ENDPOINT=your_endpoint_here
   AZURE_AI_VISION_KEY=your_key_here
```

Run npm run dev to start the development server.

## Responsible AI & Privacy
**Transparency**: This tool processes user-provided images specifically for text extraction and expense tracking.

**Security**: All images are uploaded to private, encrypted Azure Blob Storage containers, ensuring no sensitive financial data is publicly accessible.

**Reliability**: While the AI provides high-accuracy text extraction, users are encouraged to verify critical financial totals manually.