import { useState, useEffect } from "react";
import http from "../helpers/http";
import Navbar from "../components/navbar";
import Card from "../components/card";
import Swal from "sweetalert2";

export default function MainPage() {
  const [palettes, setPalettes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all palettes on component mount
  useEffect(() => {
    fetchAllPalettes();
  }, []);

  const fetchAllPalettes = async () => {
    try {
      console.log("try fetchAllPalettes");
      setLoading(true);
      // Get all palettes without authentication
      const response = await http.get("/palettes");
      console.log("response", response);
      if (response.status === 200) {
        setPalettes(response.data.palettes || response.data);
      }
    } catch (error) {
      console.log("Error fetching palettes:", error);
      // If public endpoint doesn't exist, try the regular endpoint
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <div
        style={{
          padding: "20px",
          backgroundColor: "#f8f9fa",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <h1
            style={{
              textAlign: "center",
              color: "#333",
              marginBottom: "30px",
              fontSize: "2.5rem",
              fontWeight: "bold",
            }}
          >
            Color Palette Gallery
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "#666",
              marginBottom: "40px",
              fontSize: "1.1rem",
            }}
          >
            Discover beautiful color palettes created by our community
          </p>

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "200px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  color: "#666",
                }}
              >
                Loading palettes...
              </div>
            </div>
          ) : palettes.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >
              {palettes.map((palette) => (
                <Card
                  key={palette.id}
                  id={palette.id}
                  username={palette.User.username}
                  palette={palette.palette}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#666",
              }}
            >
              <h3 style={{ marginBottom: "10px" }}>No Palettes Yet</h3>
              <p>Be the first to create and share a beautiful color palette!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
