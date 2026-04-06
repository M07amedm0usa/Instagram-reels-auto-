import React, { useEffect, useState } from 'react';
import { AbsoluteFill, continueRender, delayRender, staticFile, useCurrentFrame } from 'remotion';
import { Step } from './types';

export const MyVideo: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [handle] = useState(() => delayRender('Loading JSON'));
  const frame = useCurrentFrame();

  useEffect(() => {
    fetch(staticFile('steps.json'))
      .then((res) => res.json())
      .then((data) => {
        setSteps(data);
        continueRender(handle);
      })
      .catch((err) => {
        console.error("Error loading steps:", err);
        continueRender(handle);
      });
  }, [handle]);

  if (!steps || steps.length === 0) {
    return (
       <AbsoluteFill style={{ backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '40px' }}>Loading Flutter Tutorial...</h1>
       </AbsoluteFill>
    );
  }

  // حساب الخطوة الحالية بناءً على الفريم الحالي (التايم لاين)
  let currentStepIndex = 0;
  let framesAccumulated = 0;
  
  for (let i = 0; i < steps.length; i++) {
    framesAccumulated += steps[i].duration_in_frames;
    if (frame < framesAccumulated) {
      currentStepIndex = i;
      break;
    }
  }
  
  const currentStep = steps[currentStepIndex] || steps[steps.length - 1];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', display: 'flex', flexDirection: 'column' }}>
      
      {/* النصف العلوي: الكود */}
      <div style={{ 
        flex: 1, 
        padding: '50px', 
        color: '#38bdf8', 
        fontSize: '38px', 
        background: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '4px solid #334155'
      }}>
        {/* whiteSpace: 'pre-wrap' هي اللي بتمنع الكود إنه يخرج بره الشاشة */}
        <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', width: '100%', lineHeight: '1.5' }}>
          <code>{currentStep.code}</code>
        </pre>
      </div>
      
      {/* النصف السفلي: معاينة فلاتر داخل إطار موبايل */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0f172a' }}>
         <div style={{ width: '420px', height: '800px', border: '16px solid #334155', borderRadius: '50px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}>
            <iframe 
              src={staticFile(`flutter_step_${currentStep.step}/index.html`)} 
              style={{ width: '100%', height: '100%', border: 'none' }} 
            />
         </div>
      </div>
      
    </AbsoluteFill>
  );
};
