import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#162621",
          color: "#f6f2ea",
          fontSize: 76,
          fontWeight: 700,
          letterSpacing: "-0.08em",
          fontFamily: "Georgia, serif"
        }}
      >
        LF
      </div>
    ),
    size
  );
}
