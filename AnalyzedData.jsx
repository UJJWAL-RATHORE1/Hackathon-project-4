import {
  ChartColumnIncreasing,
  Search,
  NotepadText,
  FlaskConical,
} from "lucide-react";

import {useEffect, useMemo, useState} from "react";
import {API_ENDPOINTS} from "../config";

const AnalyzedData = ({drugName, newUse, confidence, summary}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [showSources, setShowSources] = useState(false);

  useEffect(() => {
    let ignore = false;
    if (!drugName) return;
    setLoading(true);
    setError(null);
    fetch(API_ENDPOINTS.analyze, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({drugName}),
    })
      .then(async (res) => {
        if (!res.ok) {
          const body = await res.text();
          throw new Error(body || `Request failed with ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        if (ignore) return;
        setData(json);
      })
      .catch((e) => {
        if (ignore) return;
        setError(e.message || "Failed to analyze");
      })
      .finally(() => {
        if (ignore) return;
        setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [drugName]);

  const effective = useMemo(() => {
    return {
      drugName,
      newUse: data?.newUse ?? newUse,
      confidence: data?.confidence ?? confidence,
      summary: data?.summary ?? summary,
      sources: data?.sources ?? [],
    };
  }, [drugName, data, newUse, confidence, summary]);
  return (
    <div className="flex flex-col md:flex-row justify-between items-start gap-6 w-full max-w-5xl mx-auto mt-10">
      {/* Left box */}
      <div className="w-full md:w-1/3 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow duration-300">
        <h2 className="font-semibold mb-4 text-gray-800">Analysis</h2>
        <ul className="space-y-3 text-gray-700">
          <li className="flex items-center gap-2">
            <Search className="w-5 h-5 text-green-600" />
            <span>Data Retrieval</span>
          </li>
          <li className="flex items-center gap-2">
            <NotepadText className="w-5 h-5 text-green-600" />
            <span>Summarization</span>
          </li>
          <li className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5 text-green-600" />
            <span>Analysis</span>
          </li>
          <li className="flex items-center gap-2">
            <ChartColumnIncreasing className="w-5 h-5 text-green-600" />
            <span>Report</span>
          </li>
        </ul>
      </div>

      {/* Right box */}
      <div className="w-full md:w-2/3 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow duration-300">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">
          Data Scanning Progress
        </h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium text-gray-700">Drug:</span>{" "}
            {effective.drugName || "—"}
          </p>
          <p>
            <span className="font-medium text-gray-700">New Use:</span>{" "}
            {loading ? "Loading…" : error ? "—" : effective.newUse || "—"}
          </p>
          <p>
            <span className="font-medium text-gray-700">Confidence:</span>{" "}
            {loading
              ? "—"
              : error
              ? "—"
              : effective.confidence != null
              ? Number(effective.confidence).toFixed(2)
              : "—"}
          </p>
        </div>
        <p className="text-gray-600 text-sm mt-4">
          {loading
            ? "Fetching analysis..."
            : error
            ? error
            : effective.summary ||
              "Based on research data, this analysis shows potential therapeutic applications."}
        </p>
        <div className="mt-5 flex justify-between items-center">
          <button onClick={() => setShowSources(true)} className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
            View Sources →
          </button>
          <div className="p-2 rounded-sm bg-green-200 hover:bg-green-300 transition-colors">
            <ChartColumnIncreasing size={25} />
          </div>
        </div>
      </div>
      {showSources && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <h4 className="font-semibold">Sources</h4>
              <button onClick={() => setShowSources(false)} className="text-gray-600">✕</button>
            </div>
            <div className="p-4 max-h-80 overflow-y-auto">
              {effective.sources?.length ? (
                <ul className="space-y-2">
                  {effective.sources.map((s, i) => (
                    <li key={i} className="text-sm">
                      <a className="text-blue-600 hover:underline" href={s.url} target="_blank" rel="noreferrer">
                        {s.title || s.url}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-600">No sources available.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyzedData;
