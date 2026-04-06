import { Composition } from "remotion";
import { MyVideo } from "./Composition";

export const RemotionRoot: React.FC = () => {
  // هنا بنقول لريموشن: لو مبعتلكش مدة، افترض إنها 300 فريم (10 ثواني) مبدئياً
  return (
    <>
      <Composition
        id="MyComp"
        component={MyVideo}
        durationInFrames={450} // خليها رقم كبير كفاية (15 ثانية مثلاً)
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
            stepsJsonPath: "/steps.json"
        }}
      />
    </>
  );
};
