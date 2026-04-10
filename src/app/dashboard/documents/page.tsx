'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, FileText, Search, Filter, Trash2, Eye, Download, ShieldCheck, MoreVertical, X, CheckCircle2 } from 'lucide-react';

export default function DocumentVault() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [customName, setCustomName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const res = await fetch('/api/documents');
      if (res.ok) {
        const data = await res.json();
        setDocuments(data.documents);
      }
    } catch (err) {
      console.error('Failed to fetch documents', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      if (!customName) setCustomName(file.name.split('.')[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      if (!customName) setCustomName(file.name.split('.')[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('customName', customName + '.' + selectedFile.name.split('.').pop());
    formData.append('category', 'Other');

    try {
      const res = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setIsModalOpen(false);
        setSelectedFile(null);
        setCustomName('');
        fetchDocuments();
      }
    } catch (err) {
      console.error('Upload failed', err);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (docId: string) => {
    if (!confirm('Are you sure you want to delete this document?')) return;
    
    try {
      const res = await fetch('/api/documents/delete', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ docId }),
      });

      if (res.ok) {
        setDocuments(documents.filter(d => d._id !== docId));
      }
    } catch (err) {
      console.error('Delete failed', err);
    }
  };

  const handleView = (url: string) => {
    // Only apply inline flag if it's a Cloudinary image/video resource
    // raw resources don't support transformations
    if (url.includes('/image/upload/') || url.includes('/video/upload/')) {
       const viewUrl = url.replace('/upload/', '/upload/fl_inline/');
       window.open(viewUrl, '_blank');
    } else {
       window.open(url, '_blank');
    }
  };

  const handleDownload = async (url: string, fileName: string) => {
    try {
      // For images/docs, try to fetch as blob for exact naming
      // But if it's a large raw file, fetch might fail or be blocked
      const response = await fetch(url);
      if (!response.ok) throw new Error('Fetch failed');
      
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = blobUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      // Fallback: Use fl_attachment flag only for image/video types
      let downloadUrl = url;
      if (url.includes('/image/upload/') || url.includes('/video/upload/')) {
        downloadUrl = url.replace('/upload/', '/upload/fl_attachment/');
      }
      window.open(downloadUrl, '_blank');
    }
  };

  const filteredDocs = documents.filter(doc => 
    doc.fileName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-10 pb-20 px-2 lg:px-0">
      {/* Header section with minimal title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div>
          <h1 className="text-4xl font-black text-foreground tracking-tight italic flex items-center gap-3">
             <ShieldCheck className="text-primary w-8 h-8" /> Vault <span className="text-primary text-2xl not-italic font-bold ml-2 opacity-50">/ Documents</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">Securely store and share your business credentials.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-3 px-8 py-4 bg-foreground text-background font-black uppercase tracking-[0.2em] text-[10px] rounded-2xl shadow-sm hover:scale-105 active:scale-95 transition-all"
        >
          <UploadCloud className="w-5 h-5" /> Add Document
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search vault..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card/60 border border-border/50 rounded-3xl py-5 pl-16 pr-6 focus:outline-none focus:border-primary/50 transition-all font-medium"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {loading ? (
             [...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-card/50 animate-pulse rounded-[40px] border border-border/50 shadow-sm" />
             ))
          ) : filteredDocs.length === 0 ? (
            <div className="col-span-full py-24 text-center space-y-4 bg-card/40 border border-dashed border-border/50 rounded-[48px]">
              <div className="w-24 h-24 bg-primary/5 rounded-[32px] flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-primary opacity-30" />
              </div>
              <h3 className="text-2xl font-black text-foreground italic uppercase">Vault is empty</h3>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto font-medium">Your uploaded documents will appear here for 24/7 access.</p>
            </div>
          ) : (
            filteredDocs.map((doc, i) => (
              <motion.div 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                key={doc._id}
                className="group relative bg-card/60 border border-border/50 rounded-[40px] p-8 shadow-sm hover:border-primary/30 transition-all overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button 
                     onClick={() => handleDelete(doc._id)}
                     className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-md flex items-center justify-center text-muted-foreground hover:text-rose-500 transition-colors shadow-sm"
                   >
                      <Trash2 className="w-5 h-5" />
                   </button>
                </div>

                <div className={`w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner`}>
                  <FileText className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-lg font-black text-foreground truncate mb-1">{doc.fileName}</h3>
                <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest opacity-60">Verified Credentials</p>

                <div className="mt-8 flex items-center gap-3">
                  <a 
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-4 bg-background/50 hover:bg-primary/10 hover:text-primary border border-border/50 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
                  >
                    View
                  </a>
                  <a 
                    href={`/api/documents/download?url=${encodeURIComponent(doc.fileUrl)}&name=${encodeURIComponent(doc.fileName)}`}
                    className="w-14 h-14 flex items-center justify-center bg-background/50 hover:bg-emerald-500/10 hover:text-emerald-500 border border-border/50 rounded-2xl transition-all"
                  >
                    <Download className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Premium Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !uploading && setIsModalOpen(false)}
              className="absolute inset-0 bg-background/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 30 }}
              className="relative w-full max-w-xl bg-card border border-border shadow-2xl rounded-[48px] overflow-hidden"
            >
               <div className="p-10 border-b border-border/30 flex items-center justify-between">
                  <div>
                    <h2 className="text-3xl font-black text-foreground italic uppercase h-8 leading-none">Secure Upload</h2>
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mt-1">End-to-End Encrypted Storage</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="w-12 h-12 rounded-full hover:bg-muted flex items-center justify-center text-muted-foreground transition-colors">
                    <X className="w-6 h-6" />
                  </button>
               </div>

               <div className="p-10 space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] text-muted-foreground uppercase font-black tracking-widest ml-4">File Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. My PAN Card, Address Proof"
                      value={customName}
                      onChange={(e) => setCustomName(e.target.value)}
                      className="w-full bg-muted/30 border border-border/50 rounded-3xl py-5 px-8 text-sm text-foreground focus:outline-none focus:border-primary/30 transition-all font-medium"
                    />
                  </div>

                  <div 
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`relative h-64 border-2 border-dashed rounded-[32px] transition-all flex flex-col items-center justify-center gap-4 cursor-pointer group/upload ${
                      dragActive ? 'border-primary bg-primary/5' : 'border-border/60 hover:border-primary/40 hover:bg-primary/5'
                    }`}
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    
                    {selectedFile ? (
                      <div className="text-center p-6">
                         <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-inner">
                            <FileText className="w-8 h-8 text-emerald-500" />
                         </div>
                         <p className="text-sm font-bold text-foreground truncate max-w-[250px]">{selectedFile.name}</p>
                         <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-widest">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <>
                        <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center group-hover/upload:scale-110 transition-transform">
                          <UploadCloud className="w-8 h-8 text-primary shadow-sm" />
                        </div>
                        <div className="text-center">
                          <p className="text-sm font-black text-foreground uppercase tracking-tight">Drag and drop file here</p>
                          <p className="text-xs text-muted-foreground mt-1 font-medium italic">or click to browse local storage</p>
                        </div>
                      </>
                    )}
                  </div>

                  <button 
                    onClick={handleUpload}
                    disabled={!selectedFile || uploading}
                    className="w-full py-6 bg-foreground text-background font-black uppercase tracking-[0.2em] text-[10px] rounded-3xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4 disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {uploading ? (
                      <>
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                        >
                          <UploadCloud className="w-5 h-5" />
                        </motion.div>
                        Encrypting & Syncing...
                      </>
                    ) : (
                      <>
                         Upload
                      </>
                    )}
                  </button>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

