import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Kaushar Halani – Technical Project Coordinator & Systems Builder';
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
          color: '#ffffff',
          background: 'linear-gradient(135deg, #090b10 0%, #11141c 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
            }}
          >
            KH
          </div>
          <div style={{ fontSize: '20px', opacity: 0.7, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Personal Portfolio & Engineering Systems
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '76px', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Kaushar Halani
          </div>
          <div style={{ fontSize: '32px', color: '#a1a1aa', fontWeight: 500 }}>
            Technical Project Coordinator & Systems Builder
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '18px',
              color: '#e4e4e7',
            }}
          >
            AI-Accelerated Engineering
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '18px',
              color: '#e4e4e7',
            }}
          >
            Machine Learning Pipelines
          </div>
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '9999px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              fontSize: '18px',
              color: '#e4e4e7',
            }}
          >
            End-to-End Ownership
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
