import { useState } from "react";
import AIAssistant from "../components/AIAssistent";
import AnalyzedData from "../components/AnalyzedData";
import Scanner from "../components/Scanner";

const Home = () => {
  const [showScanner, setShowScanner] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [drugName, setDrugName] = useState("");

  // Handles clicking "Start Discovery"
  const handleStart = async () => {
    if (drugName.trim() === "") return;
    setScanResult(drugName);
  };

  // Handles successful scan
  const handleScanSuccess = (data) => {
    setScanResult(data);
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-tr from-gray-900 via-green-900 to-black p-8">
      {/* Header Section */}
      <div className="max-w-3xl text-center">
        <h1 className="text-3xl md:text-4xl text-white">
          Discover New Uses <span className="text-green-600">Existing Drugs</span>
        </h1>
        <p className="text-white mt-3">
          An AI-powered research assistant that scans scientific data to find hidden drug potentials.
        </p>

        {/* Search Bar */}
        <div className="mt-8 mb-10 flex flex-col md:flex-row gap-3 items-center w-full max-w-2xl">
          <input
            type="text"
            placeholder="Enter drug name (e.g. Metformin)"
            value={drugName}
            onChange={(e) => setDrugName(e.target.value)}
            className="w-full bg-gray-50 md:flex-1 px-4 py-3 rounded-xl border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={handleStart}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl shadow-md transition font-medium"
          >
            Start Discovery 🚀
          </button>
        </div>

        {/* Scanner Section */}
        <div className="mt-8 h-full p-4 rounded-xl border border-green-50 shadow-sm">
          <p className="text-xl mb-4 text-white">
            Get smart insights — <span className="text-green-100">just scan to begin</span>
          </p>

          {scanResult && <p className="text-white mb-3">Result: {scanResult}</p>}

          {!showScanner ? (
            <button
              onClick={() => setShowScanner(true)}
              className="px-3 py-1 text-xl mb-3 rounded-lg cursor-pointer bg-green-600 text-white"
            >
              Scan Me
            </button>
          ) : (
            <Scanner
              onScanSuccess={handleScanSuccess}
              onClose={() => setShowScanner(false)}
            />
          )}
        </div>
      </div>

      {/* Analyzed Data */}
      {scanResult && <AnalyzedData drugName={scanResult} />}

      {/* AI Assistant Popup */}
      <AIAssistant />
    </div>
  );
};

export default Home;
