import React from "react";
import DocumentAnalysis from "./components/DocumentAnalysis";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="bg-blue-700 text-white p-4 shadow-md">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Document Analysis Tool</h1>
          <p className="text-blue-100">
            Upload a document and analyze it with AI
          </p>
        </div>
      </header>

      <main className="flex-1 p-4">
        <DocumentAnalysis />
      </main>

      <footer className="bg-gray-100 p-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center text-sm text-gray-600">
          <p>Powered by AI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
