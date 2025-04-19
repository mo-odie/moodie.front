import React, { useState, useEffect, useRef } from "react";
import backgroundLayer from "../assets/BackgroundLayer.webm";
import objectLayer from "../assets/ObjectLayer.webm";

interface LayeredBackgroundProps {
  children: React.ReactNode;
}

const LayeredBackground: React.FC<LayeredBackgroundProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [videosReady, setVideosReady] = useState({ bg: false, desk: false });
  const bgVideoRef = useRef<HTMLVideoElement>(null);
  const deskVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // 두 비디오가 모두 로드되면 isLoaded를 true로 설정
    if (videosReady.bg && videosReady.desk) {
      setIsLoaded(true);
    }
  }, [videosReady]);

  const handleBgVideoLoaded = () => {
    setVideosReady((prev) => ({ ...prev, bg: true }));
    if (bgVideoRef.current) {
      bgVideoRef.current.play();
    }
  };

  const handleDeskVideoLoaded = () => {
    setVideosReady((prev) => ({ ...prev, desk: true }));
    if (deskVideoRef.current) {
      deskVideoRef.current.play();
    }
  };

  return (
    <div className="fixed inset-0 h-full w-full overflow-hidden bg-black">
      {/* 배경 비디오 (창밖 야경) */}
      <video
        ref={bgVideoRef}
        className="absolute inset-0 h-full w-full object-cover"
        muted
        loop
        playsInline
        onCanPlay={handleBgVideoLoaded}
        src={backgroundLayer}
      />

      {/* 책상/모니터 비디오 */}
      <video
        ref={deskVideoRef}
        className="absolute inset-0 z-10 h-full w-full object-cover"
        muted
        loop
        playsInline
        onCanPlay={handleDeskVideoLoaded}
        src={objectLayer}
      />

      {/* 모니터 화면 영역 (타이핑 컨테이너) */}
      <div
        className="absolute z-20 bg-[rgba(18,20,21,0.01)]"
        style={{
          left: "50%",
          top: "52%",
          transform: "translate(-50%, -55%)", // 화면 중앙에서 약간 위로
          width: "34%",
          height: "60%",
        }}
      >
        {children}
      </div>

      {/* 로딩 화면 */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <p className="text-white">로딩 중...</p>
        </div>
      )}
    </div>
  );
};

export default LayeredBackground;
