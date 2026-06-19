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

## Known Limitations
* AI may struggle with low-quality, blurry, or heavily wrinkled receipt images.  
* Currently, the application is optimized for standard receipt formats; performance with highly complex or non-standard layouts may vary.

## Responsible AI & Privacy

**Fairness**: The AI model's performance may vary based on image quality, lighting conditions, and the complexity of the receipt layout.

**Reliability and Safety**: AI extraction can occasionally misread digits; users should always manually verify critical financial totals before saving them.

**Privacy and Security**: Only necessary image data is processed. All API keys and connection strings are managed via secure Azure App Settings, ensuring sensitive data is not exposed in the code.

**Inclusiveness**: The UI is designed to be straightforward; however, further testing for accessibility needs may be required in future iterations.

**Transparency**: Users are clearly informed that the image is being processed by Azure AI Vision for text extraction purposes.

**Accountability**: The user is responsible for reviewing and confirming the final expense data for accuracy.
