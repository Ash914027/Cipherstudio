import React from "react";

const FileExplorer = ({ files, currentFile, setCurrentFile, addFile, deleteFile, theme }) => {
  // Theme-based styles
  const themeStyles = {
    light: {
      button: "bg-blue-500 hover:bg-blue-600 text-white",
      fileItem: "hover:bg-gray-100",
      fileItemActive: "bg-blue-100 border border-blue-300 text-blue-700",
      text: "text-gray-800",
      deleteBtn: "text-red-500 hover:text-red-700"
    },
    dark: {
      button: "bg-blue-600 hover:bg-blue-700 text-white",
      fileItem: "hover:bg-gray-700",
      fileItemActive: "bg-blue-900 border border-blue-700 text-blue-300",
      text: "text-gray-100",
      deleteBtn: "text-red-400 hover:text-red-300"
    }
  };

  const styles = themeStyles[theme];

  return (
    <div className="p-2 flex flex-col flex-1">
      <button 
        onClick={addFile} 
        className={`mb-2 ${styles.button} p-2 rounded text-sm font-medium`}
      >
        New File
      </button>
      
      <div className="flex-1 overflow-y-auto">
        {Object.keys(files).map((fileName) => (
          <div
            key={fileName}
            className={`p-2 cursor-pointer flex justify-between items-center rounded mb-1 ${
              currentFile === fileName 
                ? styles.fileItemActive
                : styles.fileItem
            }`}
          >
            <span 
              onClick={() => setCurrentFile(fileName)} 
              className={`text-sm font-medium ${styles.text}`}
            >
              {fileName}
            </span>
            <button 
              onClick={() => deleteFile(fileName)} 
              className={`ml-2 ${styles.deleteBtn} text-xs font-bold`}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;