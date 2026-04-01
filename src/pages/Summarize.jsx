import React, { useState } from "react";
import axios from "axios";

const Summarize = () => {
  const [topic, setTopic] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    console.log("KEY VALUE:", import.meta.env.VITE_OPENAI_API_KEY);

    if (!topic.trim()) {
        alert("Please enter a topic first");
        return;
    }

    setLoading(true);
    setSummary("");

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      console.log("API KEY:", apiKey);

      if (!apiKey) {
        alert("API key not found. Check your .env file.");
        setLoading(false);
        return;
      }

      const response = await axios.post(
        "/api/v1/responses",
        {
          model: "gpt-4.1-mini",
          input: `Explain and summarize this topic in simple student-friendly language: ${topic}`
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("FULL RESPONSE:", response.data);

      const text =
        response?.data?.output?.[0]?.content?.[0]?.text ||
        "No summary generated.";

      setSummary(text);

    } catch (error) {
      console.error("FULL ERROR:", error);
      console.error("RESPONSE:", error.response);
      console.error("DATA:", error.response?.data);

      if (error.response?.status === 401) {
        alert("Invalid API key");
      } else if (error.response?.status === 429) {
        alert("Quota exceeded or no credits");
      } else if (error.message === "Network Error") {
        alert("Network error — check internet or proxy");
      } else {
        alert("Error generating summary");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "700px",
        margin: "auto",
        fontFamily: "Arial"
      }}
    >
      <h2>AI Topic Summarizer</h2>

      <input
        type="text"
        placeholder="Enter topic (e.g., Binary Trees)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        style={{
          padding: "10px",
          width: "70%",
          marginRight: "10px",
          borderRadius: "6px",
          border: "1px solid #ccc"
        }}
      />

      <button
        onClick={handleSummarize}
        disabled={loading}
        style={{
          padding: "10px 16px",
          borderRadius: "6px",
          backgroundColor: "#2563eb",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        {loading ? "Summarizing..." : "Summarize"}
      </button>

      {summary && (
        <div
          style={{
            marginTop: "25px",
            padding: "15px",
            backgroundColor: "#f3f4f6",
            borderRadius: "8px",
            lineHeight: "1.6"
          }}
        >
          <h3>Summary:</h3>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default Summarize;