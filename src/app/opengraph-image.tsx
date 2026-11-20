import { ImageResponse } from 'next/og';

export const alt = 'Kaushar Halani – Data Analyst & Technical Project Coordinator';
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
          justifyContent: 'space-between',
          padding: '72px',
          color: '#232724',
          background: 'linear-gradient(135deg, #F5F1E8 0%, #ECE6DA 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: '#FAF7F0',
              border: '1px solid #DDD6C8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              color: '#2B6E73',
            }}
          >
            KH
          </div>
          <div style={{ fontSize: '20px', color: '#2B6E73', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Data Analytics &amp; Decision Intelligence
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '76px', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: '#232724' }}>
            Kaushar Halani
          </div>
          <div style={{ fontSize: '32px', color: '#3D433E', fontWeight: 600 }}>
            Data Analyst · Technical Project Coordinator
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '20px', color: '#5D655E' }}>
          <span>SQL &amp; Python Analytics</span>
          <span>·</span>
          <span>Root-Cause Diagnostics</span>
          <span>·</span>
          <span>Operational Execution</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
