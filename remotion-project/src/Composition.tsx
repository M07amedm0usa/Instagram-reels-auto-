import React from 'react';
import { AbsoluteFill } from 'remotion';

export const MyVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#121212', justifyContent: 'center', alignItems: 'center' }}>
      <h1 style={{ color: 'white', fontSize: '60px', fontFamily: 'sans-serif' }}>
        FlutterByMousa Ready! 🚀
      </h1>
    </AbsoluteFill>
  );
};
