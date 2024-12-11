import { useEffect, useState } from "react";

export default function VersionChecker() {
  const [currentBuildId, setCurrentBuildId] = useState<string | null>(null);
  const [latestBuildId, setLatestBuildId] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data) => setCurrentBuildId(data.buildId));

    const interval = setInterval(() => {
      fetch("/api/hello")
        .then((res) => res.json())
        .then((data) => setLatestBuildId(data.buildId));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  console.log("currentBuildId: ", currentBuildId);
  console.log("latestBuildId: ", latestBuildId);

  useEffect(() => {
    if (currentBuildId && latestBuildId && currentBuildId !== latestBuildId) {
      alert("새 버전이 배포되었습니다. 페이지를 새로고침합니다.");
      window.location.reload();
    }
  }, [currentBuildId, latestBuildId]);

  return null;
}
