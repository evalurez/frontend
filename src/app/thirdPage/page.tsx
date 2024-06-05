import React from "react";
import styles from "./Third.module.css";

const ThirdPage = () => {
  return (
    <div className={styles.area}>
      <ul className={styles.circles}>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          height: "100vh",
          width: "100%",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "45px",
              marginBottom: "10px",
              color: "purple",
              letterSpacing: "2px",
            }}
          >
            Simplifying Resume
          </h1>
          <h1
            style={{
              fontSize: "45px",
              marginBottom: "30px",
              color: "purple",
              letterSpacing: "2px",
            }}
          >
            Enhancement with AI
          </h1>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingLeft: "20px",
            textAlign: "left",
            color: "black",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <h2 style={{ fontSize: "1.2em", marginBottom: "20px" }}>
              Step 1: Upload Your Resume
            </h2>
            <h2 style={{ fontSize: "1.2em", marginBottom: "20px" }}>
              Step 2: Receive Personalized Scores
            </h2>
            <h2 style={{ fontSize: "1.2em", marginBottom: "20px" }}>
              Step 3: Get Actionable Insights
            </h2>
            <h2 style={{ fontSize: "1.2em", marginBottom: "20px" }}>
              Step 4: Improve Your Job Prospects
            </h2>
            <h2 style={{ fontSize: "1.2em", marginBottom: "20px" }}>
              Step 5: Join the Evalurez Community
            </h2>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
          }}
        >
          <iframe
            width="80%"
            height="50%"
            src="https://www.youtube.com/embed/X3VV5TcCh6E"
            title="YouTube video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              border: "none",
              borderRadius: "10px",
            }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
