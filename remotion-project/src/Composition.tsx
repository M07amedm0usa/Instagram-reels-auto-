import React from 'react';
import { useVideoConfig, AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { CodeEditor } from './CodeEditor';
import { FlutterPreview } from './FlutterPreview';
import { Step } from './types';

export const MyVideo: React.FC<{ stepsJsonPath: string }> = ({ stepsJsonPath }) => {
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // هنا بنفترض إن n8n بعت ملف الـ steps.json
  // لو لسه مش موجود، ممكن نستخدم داتا وهمية للتجربة
  const steps: Step[] = [
    {
      step: 1,
      code: "void main() => runApp(MyApp());",
      duration_in_frames: 150
    }
  ];

  return (
    <AbsoluteFill style={{ backgroundColor: '#0f172a', display: 'flex', flexDirection: 'row' }}>
      <div style={{ flex: 1, padding: '20px' }}>
         <CodeEditor code={steps[0].code} />
      </div>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
         <FlutterPreview step={steps[0].step} />
      </div>
    </AbsoluteFill>
  );
};
      
