// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

type Data = {
  buildId: string; // buildId 타입 정의
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // .next/BUILD_ID 파일의 경로를 읽음
  const buildId = fs.readFileSync(
    path.join(process.cwd(), ".next/BUILD_ID"),
    "utf8"
  );

  // 클라이언트에 빌드 ID 반환
  res.status(200).json({ buildId });
}
