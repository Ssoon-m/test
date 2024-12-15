import { useEffect, useState } from "react";

const getBuildVersion = async () => {
  return await fetch("/api/hello")
    .then((res) => res.json())
    .then((data) => data.buildId);
};

export default function VersionChecker() {
  const [buildIds, setBuildIds] = useState({
    current: null as string | null,
    latest: null as string | null,
  });

  // 빌드 버전 가져와서 상태 업데이트
  const fetchAndSetBuildVersion = async (key: "current" | "latest") => {
    const buildId = await getBuildVersion();
    setBuildIds((prev) => ({ ...prev, [key]: buildId }));
  };

  useEffect(() => {
    fetchAndSetBuildVersion("current");

    const handleFocus = () => fetchAndSetBuildVersion("latest");
    window.addEventListener("focus", handleFocus);

    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  //
  console.log("current : ", buildIds.current);
  console.log("latest : ", buildIds.latest);

  // 버전 비교 및 새로고침
  useEffect(() => {
    if (
      buildIds.current &&
      buildIds.latest &&
      buildIds.current !== buildIds.latest
    ) {
      alert("새 버전이 배포되었습니다. 페이지를 새로고침합니다.");
      window.location.reload();
    }
  }, [buildIds]);

  return null;
}
