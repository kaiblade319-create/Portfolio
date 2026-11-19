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
          color: '#FAFAFA',
          background: 'linear-gradient(135deg, #050507 0%, #141418 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 94, 26, 0.16)',
              border: '1px solid rgba(255, 130, 67, 0.45)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 700,
              color: '#FF8243',
            }}
          >
            KH
          </div>
          <div style={{ fontSize: '20px', color: '#FF8243', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Data Analytics &amp; Decision Intelligence
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ fontSize: '76px', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Kaushar Halani
          </div>
          <div style={{ fontSize: '32px', color: '#D4D4D8', fontWeight: 600 }}>
            Data Analyst · Technical Project Coordinator
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', fontSize: '20px', color: '#A1A1AA' }}>
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
