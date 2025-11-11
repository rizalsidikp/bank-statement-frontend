import React from 'react';
import './styles.css';


interface FileUploaderProps {
  onSubmit?: (f: File) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  onSubmit
}) => {
  const handleFile = (f?: File) => {
    if (!f) return;
    const reader = new FileReader();
    if (f.type !== "text/csv" && !f.name.endsWith(".csv")) {
      alert("File must be in .csv format");
      return;
    }
    reader.readAsText(f);
    if (window.confirm("Process this file?")) {
      if (onSubmit) {
        onSubmit(f);
      }
    }
  };
  return (
    <div className="uploader">
      <label className="file-label">
        <input id="file-input" name="file-input" data-testid="file-input" type="file" accept=".csv,text/csv" onChange={(e) => handleFile(e.target.files?.[0])} />
        <div>
          <strong>Upload Statement</strong>
          <div className="muted">Allowed Format: .csv</div>
        </div>
      </label>
    </div>
  );
};

export default FileUploader;