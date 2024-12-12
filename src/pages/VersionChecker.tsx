import { useEffect, useState } from "react";

const getBuildVersion = async () => {
  return await fetch("/api/hello")
    .then((res) => res.json())
    .then((data) => data.buildId);
};

export default function VersionChecker() {
  const [currentBuildId, setCurrentBuildId] = useState<string | null>(null);
  const [latestBuildId, setLatestBuildId] = useState<string | null>(null);
  useEffect(() => {
    getBuildVersion().then((buildId) => setCurrentBuildId(buildId));
    const handleFocusBuildVersion = () => {
      getBuildVersion().then((buildId) => setLatestBuildId(buildId));
    };
    window.addEventListener("focus", handleFocusBuildVersion);
    return () => window.removeEventListener("focus", handleFocusBuildVersion);
  }, []);

  console.log("currentBuildId: ", currentBuildId);
  console.log("latestBuildId: ", latestBuildId);

  useEffect(() => {
    if (currentBuildId && latestBuildId && currentBuildId !== latestBuildId) {
      alert("새 버전이 배포되었습니다. 페이지를 새로고침합니다.");
      // window.location.reload();
    }
  }, [currentBuildId, latestBuildId]);

  return null;
}
