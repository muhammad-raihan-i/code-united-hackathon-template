//color format is RRR,GGG,BBB;
//colorbox has two stuffs, square and text below
//square is 100px x 100px that has black border 1px
//under the square is text telling the color

import React from "react";

const ColorBox = ({ color }) => {
  // Parse the color format RRR,GGG,BBB
  const parseColor = (colorString) => {
    if (!colorString) return "rgb(0, 0, 0)";

    // Remove any trailing semicolon and split by comma
    const cleanColor = colorString.replace(";", "");
    const [r, g, b] = cleanColor.split(",").map((num) => parseInt(num.trim()));

    return `rgb(${r},${g},${b})`;
  };

  const rgbColor = parseColor(color);

  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "8px",
  };

  const squareStyle = {
    width: "100px",
    height: "100px",
    backgroundColor: rgbColor,
    border: "1px solid black",
  };

  const textStyle = {
    fontSize: "14px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  };

  return (
    <div style={containerStyle}>
      <div style={squareStyle}></div>
      <div style={textStyle}>{color}</div>
    </div>
  );
};

export default ColorBox;
