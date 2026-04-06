import React, { useEffect, useState } from 'react';
import { AbsoluteFill, useVideoConfig, continueRender, delayRender } from 'remotion';
import { Step, VideoProps } from './types';

export const MyVideo: React.FC<VideoProps> = ({ stepsJsonPath }) => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [handle] = useState(() => delayRender('Loading JSON'));

  useEffect(() => {
    fetch(stepsJsonPath)
      .then((res) => res.json())
      .then((data) => {
        setSteps(data);
        continueRender(handle);
      })
      .catch((err) => console.error("Error loading steps:", err));
  }, [stepsJsonPath, handle]);

  if (steps.length === 0) return null;

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', display: 'flex', flexDirection: 'row' }}>
      {/* الجزء الخاص بالكود */}
      <div style={{ flex: 1, padding: '40px', color: 'white', fontSize: '24px', background: '#1e293b' }}>
        <pre><code>{steps[0].code}</code></pre>
      </div>
      
      {/* الجزء الخاص بمعاينة فلاتر */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0f172a' }}>
         <div style={{ width: '360px', height: '640px', border: '10px solid #334155', borderRadius: '40px', overflow: 'hidden' }}>
            <iframe 
              src={`/flutter_step_${steps[0].step}/index.html`} 
              style={{ width: '100%', height: '100%', border: 'none' }} 
            />
         </div>
      </div>
    </AbsoluteFill>
  );
};
      
