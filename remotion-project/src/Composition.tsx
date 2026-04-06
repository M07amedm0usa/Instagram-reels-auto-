import React, { useEffect, useState } from 'react';
import { AbsoluteFill, continueRender, delayRender, staticFile } from 'remotion';
import { Step } from './types';

export const MyVideo: React.FC = () => {
  const [steps, setSteps] = useState<Step[]>([]);
  const [handle] = useState(() => delayRender('Loading JSON'));

  useEffect(() => {
    // السحر هنا: بنستخدم staticFile عشان نجيب الملف بدقة
    fetch(staticFile('steps.json'))
      .then((res) => res.json())
      .then((data) => {
        setSteps(data);
        continueRender(handle);
      })
      .catch((err) => {
        console.error("Error loading steps:", err);
        continueRender(handle); // عشان لو في خطأ الماكينة ما توقفش
      });
  }, [handle]);

  // شاشة تحميل سريعة لحد ما الداتا تيجي بدل ما يضرب Error
  if (!steps || steps.length === 0) {
    return (
       <AbsoluteFill style={{ backgroundColor: '#0f172a', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ color: 'white', fontSize: '40px' }}>Loading Data...</h1>
       </AbsoluteFill>
    );
  }

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', display: 'flex', flexDirection: 'row' }}>
      {/* الجزء الخاص بالكود */}
      <div style={{ flex: 1, padding: '40px', color: 'white', fontSize: '24px', background: '#1e293b' }}>
        <pre><code>{steps[0]?.code}</code></pre>
      </div>
      
      {/* الجزء الخاص بمعاينة فلاتر */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0f172a' }}>
         <div style={{ width: '360px', height: '640px', border: '10px solid #334155', borderRadius: '40px', overflow: 'hidden' }}>
            {/* استخدمنا staticFile هنا كمان عشان نضمن إن الـ iframe يلاقي موقع فلاتر */}
            <iframe 
              src={staticFile(`flutter_step_${steps[0]?.step}/index.html`)} 
              style={{ width: '100%', height: '100%', border: 'none' }} 
            />
         </div>
      </div>
    </AbsoluteFill>
  );
};
