import React from "react";
import { Sandpack } from "@codesandbox/sandpack-react";

const SandpackRunner = ({ files }) => {
  // Convert files object to Sandpack format
  const sandpackFiles = {};
  Object.keys(files).forEach((file) => {
    sandpackFiles[`/${file}`] = { code: files[file].code };
  });

  return (
    <div className="h-full border border-gray-300">
      <Sandpack
        template="react"
        files={sandpackFiles}
        options={{ showConsole: true, showTabs: true }}
      />
    </div>
  );
};

export default SandpackRunner;
