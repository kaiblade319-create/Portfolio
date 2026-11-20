'use client';

import { useEffect } from 'react';

export default function SecurityGuard() {
  useEffect(() => {
    console.log(
      '%cKaushar Halani — Portfolio & Case Studies',
      'color: #2B6E73; font-weight: bold; font-size: 13px;'
    );
  }, []);

  return null;
}
