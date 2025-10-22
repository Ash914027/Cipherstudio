import React, { useState, useEffect } from "react";
import CodeEditor from "./editor/CodeEditor.jsx";
import SandpackRunner from "./sandbox/SandpackRunner.jsx";
import FileExplorer from "./components/FileExplorer.jsx";

function App() {
  const [files, setFiles] = useState({
    "App.jsx": { 
      code: `export default function App() { 
  return (
    <div>
      <h1>Hello CipherStudio</h1>
      <p>Edit this code and save!</p>
    </div>
  ); 
}` 
    },
    "index.js": { 
      code: `import React from "react"; 
import ReactDOM from "react-dom/client"; 
import App from "./App.jsx"; 

const root = ReactDOM.createRoot(document.getElementById("root")); 
root.render(<App />);` 
    },
    "index.css": {
      code: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#root {
  min-height: 100vh;
  padding: 20px;
}`
    }
  });

  const [currentFile, setCurrentFile] = useState("App.jsx");
  const [theme, setTheme] = useState('light'); // 'light' or 'dark'
  const projectId = "myproject";

  // Load project and theme on component mount
  useEffect(() => {
    const savedData = localStorage.getItem(`project_${projectId}`);
    if (savedData) {
      try {
        const parsedFiles = JSON.parse(savedData);
        setFiles(parsedFiles);
        setCurrentFile(Object.keys(parsedFiles)[0]);
      } catch (err) {
        console.error("Error loading saved project:", err);
      }
    }

    // Load saved theme
    const savedTheme = localStorage.getItem('cipherstudio_theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [projectId]);

  // Apply theme to document
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('cipherstudio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const addFile = () => {
    const fileName = prompt("Enter file name (e.g., Component.jsx):") || `NewFile${Object.keys(files).length + 1}.jsx`;
    if (fileName && !files[fileName]) {
      setFiles({ ...files, [fileName]: { code: "// New file\n" } });
      setCurrentFile(fileName);
    } else if (files[fileName]) {
      alert("File already exists!");
    }
  };

  const deleteFile = (fileName) => {
    if (Object.keys(files).length <= 1) {
      alert("Cannot delete the last file!");
      return;
    }
    
    const newFiles = { ...files };
    delete newFiles[fileName];
    setFiles(newFiles);
    
    const remainingFiles = Object.keys(newFiles);
    setCurrentFile(remainingFiles[0]);
  };

  const updateCode = (newCode) => {
    setFiles(prevFiles => ({
      ...prevFiles,
      [currentFile]: { code: newCode }
    }));
  };

  const handleSave = () => {
    try {
      localStorage.setItem(`project_${projectId}`, JSON.stringify(files));
      alert("Project Saved Successfully!");
    } catch (err) {
      alert("Error saving project");
    }
  };

  const handleLoad = () => {
    try {
      const savedData = localStorage.getItem(`project_${projectId}`);
      if (savedData) {
        const parsedFiles = JSON.parse(savedData);
        setFiles(parsedFiles);
        setCurrentFile(Object.keys(parsedFiles)[0]);
        alert("Project Loaded Successfully!");
      } else {
        alert("No saved project found!");
      }
    } catch (err) {
      alert("Error loading project");
    }
  };

  // Theme classes
  const themeClasses = {
    light: {
      bg: 'bg-gray-100',
      sidebar: 'bg-white border-gray-300',
      text: 'text-gray-800',
      textSecondary: 'text-gray-600',
      header: 'bg-gray-800 text-white',
      button: 'bg-blue-500 hover:bg-blue-600 text-white',
      saveButton: 'bg-green-500 hover:bg-green-600 text-white',
      fileItem: 'hover:bg-gray-100',
      fileItemActive: 'bg-blue-100 border-blue-300 text-blue-700'
    },
    dark: {
      bg: 'bg-gray-900',
      sidebar: 'bg-gray-800 border-gray-700',
      text: 'text-gray-100',
      textSecondary: 'text-gray-400',
      header: 'bg-gray-900 text-white',
      button: 'bg-blue-600 hover:bg-blue-700 text-white',
      saveButton: 'bg-green-600 hover:bg-green-700 text-white',
      fileItem: 'hover:bg-gray-700',
      fileItemActive: 'bg-blue-900 border-blue-700 text-blue-300'
    }
  };

  const currentTheme = themeClasses[theme];

  return (
    <div className={`flex h-screen ${currentTheme.bg}`}>
      {/* File Explorer Sidebar */}
      <div className={`w-64 ${currentTheme.sidebar} border-r flex flex-col`}>
        <div className="p-4 border-b border-gray-300">
          <h1 className={`text-xl font-bold ${currentTheme.text}`}>CipherStudio</h1>
          <p className={`text-sm ${currentTheme.textSecondary}`}>Your React IDE</p>
        </div>
        
        {/* Theme Toggle Button */}
        <div className="p-2 border-b border-gray-300">
          <button 
            onClick={toggleTheme}
            className={`w-full ${currentTheme.button} py-2 px-3 rounded flex items-center justify-center gap-2`}
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
        </div>

        <FileExplorer
          files={files}
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          addFile={addFile}
          deleteFile={deleteFile}
          theme={theme}
        />

        <div className="p-2 mt-auto border-t border-gray-300">
          <button 
            onClick={handleSave} 
            className={`w-full ${currentTheme.saveButton} py-2 px-3 rounded mb-2`}
          >
            Save Project
          </button>
          <button 
            onClick={handleLoad} 
            className={`w-full ${currentTheme.button} py-2 px-3 rounded`}
          >
            Load Project
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Editor and Preview */}
        <div className="flex-1 flex">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col border-r border-gray-300">
            <div className={currentTheme.header + " p-2"}>
              <span className="font-mono">Editing: {currentFile}</span>
            </div>
            <div className="flex-1">
              {currentFile && (
                <CodeEditor
                  code={files[currentFile]?.code || ""}
                  onChange={updateCode}
                  theme={theme}
                />
              )}
            </div>
          </div>

          {/* Live Preview */}
          <div className="flex-1 flex flex-col">
            <div className={currentTheme.header + " p-2"}>
              <span className="font-mono">Live Preview</span>
            </div>
            <div className="flex-1">
              <SandpackRunner files={files} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;