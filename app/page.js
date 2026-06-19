"use client";
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a receipt image first!");
      return;
    }
    setLoading(true);
    setResult("Uploading and processing with AI...");

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to process receipt");

      const result = await response.json();
      
      // Parse the JSON data into a clean, readable text format
      if (result.data?.readResult?.blocks) {
        const extractedText = result.data.readResult.blocks
          .map(block => block.lines.map(line => line.text).join('\n')) // Use \n here
          .join('\n\n'); // Use double \n for block spacing
        setResult(extractedText);
      } else {
        setResult("No text detected or invalid response format.");
      }
      
    } catch (error) {
      setResult("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ maxWidth: '600px', margin: '50px auto', padding: '30px', fontFamily: 'system-ui, sans-serif', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
      <h1 style={{ color: '#4f46e5' }}>Receipt Scanner</h1>
      <p>Quickly digitize your receipts. Upload an image, and let our AI handle the rest.</p>
      
      <div style={{ margin: '20px 0', border: '2px dashed #e5e7eb', padding: '20px', textAlign: 'center' }}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
      </div>

      <button 
        onClick={handleUpload} 
        disabled={loading}
        style={{ width: '100%', padding: '12px', backgroundColor: loading ? '#9ca3af' : '#4f46e5', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
      >
        {loading ? "Processing..." : "Extract Data Now"}
      </button>

      <div style={{ marginTop: '30px', backgroundColor: '#f9fafb', padding: '20px', borderRadius: '8px' }}>
        <h3 style={{ marginTop: '0' }}>Extracted Data</h3>
        <pre style={{ whiteSpace: 'pre-wrap', color: '#374151', fontSize: '14px' }}>
          {result || "Your AI output will appear here..."}
        </pre>
      </div>
    </main>
  );
}