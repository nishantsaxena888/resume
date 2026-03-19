import React from "react";

import { MinimalTiptapEditor } from "./minimal-tiptap";

export const EditorInput = ({ value, onChange }: any) => {
  return (
    <div>
      <MinimalTiptapEditor
        value={value}
        onChange={onChange}
        className="w-full min-h-[300px]"
        editorContentClassName="p-5"
        output="html"
        placeholder="Enter your description..."
        autofocus={true}
        editable={true}
        editorClassName="focus:outline-hidden"
      />
    </div>
  );
};
