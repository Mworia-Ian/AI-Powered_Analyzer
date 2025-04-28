import React, { useState } from "react";
import litellmService from "../services/litellmservice";

function DocumentAnalysis() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentContent, setDocumentContent] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [apiResponse, setApiResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setDocumentContent(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handlePromptChange = (event) => {
    setUserPrompt(event.target.value);
  };

  const handleAnalyzeDocument = async () => {
    if (!documentContent) {
      setErrorMessage("Please upload a document first");
      return;
    }

    if (!userPrompt.trim()) {
      setErrorMessage("Please enter a prompt for analysis");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await litellmService.analyzeDocument(
        documentContent,
        userPrompt
      );
      setApiResponse(response);
    } catch (error) {
      setErrorMessage("Error analyzing document. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const displayAnalysisResult = () => {
    if (!apiResponse || !apiResponse.choices || !apiResponse.choices[0]) {
      return null;
    }

    return apiResponse.choices[0].message.content;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Document Analysis with LiteLLM
      </h2>

      {/* Document Upload Section */}
      <div className="p-6 mb-6 border-2 border-dashed border-gray-300 rounded-lg">
        <label
          htmlFor="document"
          className="block mb-2 font-semibold text-gray-700"
        >
          Upload Document:
        </label>
        <input
          type="file"
          id="document"
          onChange={handleFileChange}
          accept=".txt,.pdf,.doc,.docx"
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
        {selectedFile && (
          <p className="mt-2 text-sm text-gray-600">
            Selected file: {selectedFile.name}
          </p>
        )}
      </div>

      {/* Analysis Prompt Section */}
      <div className="mb-6">
        <label
          htmlFor="prompt"
          className="block mb-2 font-semibold text-gray-700"
        >
          Analysis Prompt:
        </label>
        <textarea
          id="prompt"
          value={userPrompt}
          onChange={handlePromptChange}
          placeholder="Enter your analysis instructions here (e.g., 'Summarize this document', 'Extract key points', 'Analyze the sentiment')"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows="4"
        ></textarea>
      </div>

      {/* Analysis Button */}
      <button
        onClick={handleAnalyzeDocument}
        disabled={!selectedFile || !userPrompt.trim() || isLoading}
        className={`px-5 py-3 rounded-md font-medium text-white 
          ${
            !selectedFile || !userPrompt.trim() || isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {isLoading ? "Analyzing..." : "Analyze Document"}
      </button>

      {/* Error Message */}
      {errorMessage && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md">
          {errorMessage}
        </div>
      )}

      {/* Analysis Results */}
      {apiResponse && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-3">Analysis Results:</h3>
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="prose max-w-none">{displayAnalysisResult()}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DocumentAnalysis;
