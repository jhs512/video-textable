"use client";

import { Download } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ExportButtonProps {
  onExport: () => void;
  disabled: boolean;
}

export default function ExportButton({
  onExport,
  disabled,
}: ExportButtonProps) {
  return (
    <Button variant="outline" onClick={onExport} disabled={disabled}>
      <Download className="h-4 w-4" />
      이미지 내보내기
    </Button>
  );
}
