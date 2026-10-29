import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Kaushar Halani Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px',
          color: '#ffffff',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ fontSize: 28, opacity: 0.8, marginBottom: 16 }}>Data Science Portfolio</div>
        <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1 }}>Kaushar Halani</div>
        <div style={{ fontSize: 32, opacity: 0.95, marginTop: 20 }}>
          Machine Learning • NLP • Data Analysis
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
