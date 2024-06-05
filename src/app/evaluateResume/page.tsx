"use client";

import React, { useState } from "react";
import Link from "next/link";

const EvaluateResume = () => {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);
  const [warning, setWarning] = useState("");
  const maxLength = 1000;
  const maxFileSize = 300 * 1024; // 300 KB or 3 MB

  const handleTextChange = (event: any) => {
    setText(event.target.value);
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.size <= maxFileSize) {
      setFile(selectedFile);
      setWarning("");
    } else {
      setWarning("File size exceeds the limit of 300KB.");
      event.target.value = null; // Clear the file input
      setFile(null);
    }
  };

  const handleAnalyzeClick = (event: any) => {
    if (!text || !file) {
      event.preventDefault(); // Prevent navigation
      setWarning("Both Job Description and Resume are mandatory fields.");
    }
  };

  return (
    <>
      <h1 className="text-3xl text-center font-bold text-purple-800 hover:text-green-500 transition-all">
        Evaluate your Resume
      </h1>
      <br />
      <br />
      <h1 className="text-3xl font-bold text-purple-800 hover:text-green-500 transition-all">
        Job Description
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "flex-start",
        }}
      >
        <div style={{ position: "relative", width: "50%" }}>
          <textarea
            maxLength={maxLength}
            rows={7}
            cols={35}
            placeholder={"Add your Job Description here"}
            value={text}
            onChange={handleTextChange}
            style={{
              border: "2px solid black",
              padding: "10px",
              boxSizing: "border-box",
              width: "100%",
              position: "relative",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              backgroundColor: "white",
              padding: "0 5px",
              color: "gray",
              fontSize: "14px",
            }}
          >
            {text.length}/{maxLength}
          </div>
        </div>
        <div style={{ width: "40%", position: "relative" }}>
          <h1 className="text-3xl font-bold text-purple-800 hover:text-green-500 transition-all">
            Upload Resume
          </h1>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            style={{
              border: "2px solid black",
              padding: "10px",
              width: "100%",
              boxSizing: "border-box",
              position: "relative",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "10px",
              right: "10px",
              backgroundColor: "white",
              padding: "0 5px",
              color: "gray",
              fontSize: "14px",
            }}
          >
            Max file size: 300KB
          </div>
          <div style={{ marginTop: "10px", color: "gray", fontSize: "14px" }}>
            {file ? `Selected file: ${file["name"]}` : "No file selected"}
          </div>
          <div style={{ marginTop: "10px", color: "gray", fontSize: "14px" }}>
            {file ? `File size: ${(file["size"] / 1024).toFixed(2)} KB` : ""}
          </div>
          {/* {warning && (
            <div style={{ marginTop: "10px", color: "red", fontSize: "14px" }}>
              {warning}
            </div>
          )} */}
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Link href="/Home/components/createResume">
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-all"
            onClick={handleAnalyzeClick}
          >
            Analyze
          </button>
        </Link>
      </div>
      {warning && (
        <div style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
          {warning}
        </div>
      )}
    </>
  );
};

export default EvaluateResume;
