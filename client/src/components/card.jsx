//card has this info
//`Color palette no. ${id}, created by ${userId}`
//use palette format that is RRR,GGG,BBB;RRR,GGG,BBB;
//card can have 1 to 5 colors

import React from "react";
import ColorBox from "./colorbox";

const Card = ({ id, userId, username, palette }) => {
  // Parse the palette format RRR,GGG,BBB;RRR,GGG,BBB; into individual colors
  const parseColors = (paletteString) => {
    if (!paletteString) return [];

    // Remove trailing semicolon if present and split by semicolon
    const cleanPalette = paletteString.replace(/;$/, "");
    const colors = cleanPalette
      .split(";")
      .filter((color) => color.trim() !== "");

    return colors.map((color) => color.trim());
  };

  const colors = parseColors(palette);

  const cardStyle = {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    margin: "8px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    backgroundColor: "white",
    maxWidth: "600px",
  };

  const headerStyle = {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "12px",
    color: "#333",
  };

  const colorsContainerStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    justifyContent: "center",
  };

  return (
    <div style={cardStyle}>
      <div style={headerStyle}>
        Color palette no. {id}, created by {username}
      </div>
      <div style={colorsContainerStyle}>
        {colors.map((color, index) => (
          <ColorBox key={index} color={color} />
        ))}
      </div>
    </div>
  );
};

export default Card;
