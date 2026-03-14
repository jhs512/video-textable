"use client";

import { TEXT_MAX_LENGTH } from "@/constants/video";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TextEditorProps {
  text: string;
  onChange: (text: string) => void;
}

export default function TextEditor({ text, onChange }: TextEditorProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor="markdown-editor">마크다운 입력</Label>
        <span className="text-xs text-neutral-500">
          {text.length} / {TEXT_MAX_LENGTH}
        </span>
      </div>
      <Textarea
        id="markdown-editor"
        value={text}
        onChange={(e) => {
          if (e.target.value.length <= TEXT_MAX_LENGTH) {
            onChange(e.target.value);
          }
        }}
        placeholder={"# 제목\n\n내용을 입력하세요.\n\n---\n\n# 두 번째 씬"}
        className="min-h-[300px] resize-y font-mono text-sm dark:bg-neutral-900"
      />
    </div>
  );
}
