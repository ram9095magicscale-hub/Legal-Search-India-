'use client';

import { useState } from 'react';
import { 
  Save, 
  X, 
  Plus, 
  Trash2, 
  GripVertical, 
  Type, 
  Heading2, 
  Image as ImageIcon, 
  List as ListIcon, 
  ArrowLeft,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { motion, Reorder } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface BlogBlock {
  id: string;
  type: 'h2' | 'h3' | 'p' | 'image' | 'ul' | 'ol' | 'list';
  text?: string;
  url?: string;
  items?: string[];
}

interface BlogEditorProps {
  initialData?: any;
  isEditing?: boolean;
}

export default function BlogEditor({ initialData, isEditing = false }: BlogEditorProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    tag: initialData?.tag || 'General',
    desc: initialData?.desc || '',
    date: initialData?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: initialData?.readTime || '5 min read',
    image: initialData?.image || 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=1200',
  });

  const [blocks, setBlocks] = useState<BlogBlock[]>(
    initialData?.content?.map((b: any, index: number) => ({ 
      ...b, 
      id: `block-${index}`,
      items: b.items || (b.type === 'ul' || b.type === 'ol' || b.type === 'list' ? [''] : undefined)
    })) || [
      { id: 'initial-p', type: 'p', text: '' }
    ]
  );

  const handleFileUpload = async (file: File, blockId?: string) => {
    setUploading(true);
    setError(null);
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/admin/blog-upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!res.ok) throw new Error('Upload failed');
      
      const { url } = await res.json();
      
      if (blockId) {
        setBlocks(blocks.map(b => b.id === blockId ? { ...b, url } : b));
      } else {
        setFormData({ ...formData, image: url });
      }
    } catch (err) {
      setError('Image upload failed. Please try again.');
    } finally {
      setUploading(false);
      setIsDragging(false);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileUpload(file);
    } else {
      setIsDragging(false);
    }
  };

  const addBlock = (type: BlogBlock['type']) => {
    const newBlock: BlogBlock = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      text: (type === 'h2' || type === 'h3' || type === 'p') ? '' : undefined,
      items: (type === 'ul' || type === 'ol' || type === 'list') ? [''] : undefined,
    };
    setBlocks([...blocks, newBlock]);
  };

  const removeBlock = (id: string) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const updateBlock = (id: string, updates: Partial<BlogBlock>) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const addListItem = (blockId: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId && b.items) {
        return { ...b, items: [...b.items, ''] };
      }
      return b;
    }));
  };

  const updateListItem = (blockId: string, index: number, value: string) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId && b.items) {
        const newItems = [...b.items];
        newItems[index] = value;
        return { ...b, items: newItems };
      }
      return b;
    }));
  };

  const removeListItem = (blockId: string, index: number) => {
    setBlocks(blocks.map(b => {
      if (b.id === blockId && b.items) {
        const newItems = b.items.filter((_, i) => i !== index);
        return { ...b, items: newItems.length ? newItems : [''] };
      }
      return b;
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        ...formData,
        content: blocks.map(({ type, text, url, items }) => ({ type, text, url, items }))
      };

      const url = isEditing ? `/api/blogs/${initialData._id}` : '/api/blogs';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push('/admin/blogs');
          router.refresh();
        }, 1500);
      } else {
        const errData = await res.json();
        setError(errData.error || 'Failed to save blog');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-10">
        <button 
          onClick={() => router.back()}
          className="p-3 bg-card border border-border/50 rounded-2xl text-muted-foreground hover:text-foreground transition-all flex items-center gap-2 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> Back
        </button>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted/30 rounded-full border border-border/50">
             <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest whitespace-nowrap">Pro Tip: Use <span className="text-primary">**text**</span> for bold</span>
          </div>
          {error && <p className="text-rose-500 text-sm font-bold animate-pulse">{error}</p>}
          <button 
            onClick={handleSave}
            disabled={loading || success || uploading}
            className={`px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg ${
              success ? 'bg-emerald-500 text-white' : 'bg-primary text-primary-foreground hover:scale-105 active:scale-95 shadow-primary/20 disabled:opacity-50'
            }`}
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : success ? <CheckCircle2 className="w-5 h-5" /> : <Save className="w-5 h-5" />}
            {loading ? 'Saving...' : success ? 'Published' : isEditing ? 'Update Article' : 'Publish Article'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Metadata */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-card border border-border/50 rounded-[40px] p-8 shadow-sm space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary italic mb-2">Metadata Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Article Slug</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={(e) => setFormData({...formData, slug: e.target.value})}
                  placeholder="e.g. gst-changes-2026"
                  className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary/50"
                  disabled={isEditing}
                />
                {!isEditing && <p className="text-[10px] text-muted-foreground mt-2 px-1">Unique URL identifier.</p>}
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Category Tag</label>
                <select 
                  value={formData.tag}
                  onChange={(e) => setFormData({...formData, tag: e.target.value})}
                  className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary/50"
                >
                  <option value="Compliance">Compliance</option>
                  <option value="Taxation">Taxation</option>
                  <option value="Legal Tech">Legal Tech</option>
                  <option value="Business Growth">Business Growth</option>
                  <option value="IP Protection">IP Protection</option>
                  <option value="General">General</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Reading Time</label>
                <input 
                  type="text" 
                  value={formData.readTime}
                  onChange={(e) => setFormData({...formData, readTime: e.target.value})}
                  className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-primary/50"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Cover Image</label>
                <div 
                  onDragOver={onDragOver}
                  onDragLeave={onDragLeave}
                  onDrop={onDrop}
                  className={`aspect-video rounded-[32px] overflow-hidden border-2 border-dashed transition-all relative group cursor-pointer ${
                    isDragging ? 'border-primary bg-primary/5 scale-105' : 'border-border/50 bg-muted hover:border-primary/30'
                  }`}
                  onClick={() => document.getElementById('cover-upload')?.click()}
                >
                  <img src={formData.image} alt="Preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className={`absolute inset-0 flex flex-col items-center justify-center bg-background/60 backdrop-blur-sm transition-opacity ${
                    isDragging || uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                    {uploading ? (
                      <Loader2 className="w-8 h-8 animate-spin text-primary" />
                    ) : (
                      <>
                        <ImageIcon className="w-8 h-8 mb-2 text-primary" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                          {isDragging ? 'Drop Image' : 'Click or Drag to Upload'}
                        </span>
                      </>
                    )}
                  </div>
                  <input 
                    id="cover-upload"
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                  />
                </div>
                <input 
                  type="text" 
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  placeholder="Or paste URL here..."
                  className="w-full bg-muted/30 border border-border/50 rounded-2xl px-5 py-3 text-xs focus:outline-none focus:border-primary/50 mt-4"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Content Editor */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border border-border/50 rounded-[40px] p-10 shadow-sm min-h-[600px] flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary italic mb-10 border-b border-border/30 pb-4">Manuscript Editor</h3>
            
            <div className="space-y-8 flex-1">
              <textarea 
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Enter Impactful Title..."
                className="w-full bg-transparent text-4xl md:text-5xl font-black text-foreground placeholder:opacity-20 focus:outline-none resize-none overflow-hidden h-auto"
                rows={2}
              />
              
              <textarea 
                value={formData.desc}
                onChange={(e) => setFormData({...formData, desc: e.target.value})}
                placeholder="Write a compelling executive summary..."
                className="w-full bg-transparent text-xl text-muted-foreground italic border-l-4 border-primary/20 pl-6 focus:outline-none focus:border-primary/50 transition-colors resize-none mb-10"
                rows={3}
              />

              <Reorder.Group axis="y" values={blocks} onReorder={setBlocks} className="space-y-6">
                {blocks.map((block) => (
                  <Reorder.Item key={block.id} value={block} className="group relative">
                    <div className="absolute -left-10 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab active:cursor-grabbing" />
                    </div>

                    <div className="flex gap-4">
                      <div className="flex-1">
                        {block.type === 'h2' && (
                          <input 
                            type="text" 
                            value={block.text}
                            onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                            placeholder="Primary Heading..."
                            className="w-full bg-transparent text-2xl font-bold text-foreground focus:outline-none"
                          />
                        )}
                        {block.type === 'h3' && (
                          <input 
                            type="text" 
                            value={block.text}
                            onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                            placeholder="Sub-heading..."
                            className="w-full bg-transparent text-xl font-bold text-foreground focus:outline-none opacity-80"
                          />
                        )}
                        {block.type === 'p' && (
                          <textarea 
                            value={block.text}
                            onChange={(e) => updateBlock(block.id, { text: e.target.value })}
                            placeholder="Start writing... (use **text** for bold)"
                            className="w-full bg-transparent text-lg text-muted-foreground focus:outline-none resize-none h-auto leading-relaxed"
                            rows={3}
                          />
                        )}
                        {block.type === 'image' && (
                          <div className="space-y-4">
                            <div className="flex items-center gap-2">
                              <input 
                                type="text" 
                                value={block.url || ''}
                                onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                                placeholder="Media URL or click Upload..."
                                className="flex-1 bg-muted/20 border border-border/30 rounded-xl px-4 py-2 text-sm focus:outline-none"
                              />
                              <button 
                                onClick={() => document.getElementById(`upload-${block.id}`)?.click()}
                                className="px-4 py-2 bg-primary text-white rounded-xl text-xs font-bold hover:scale-105 transition-all text-nowrap"
                              >
                                Upload
                              </button>
                              <input 
                                id={`upload-${block.id}`}
                                type="file" 
                                className="hidden" 
                                accept="image/*"
                                onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], block.id)}
                              />
                            </div>
                            {block.url && (
                              <div className="relative group/img">
                                <img src={block.url} className="w-full rounded-2xl border border-border/50 shadow-lg group-hover/img:opacity-90 transition-opacity" />
                                {uploading && (
                                  <div className="absolute inset-0 flex items-center justify-center bg-background/40 backdrop-blur-sm rounded-2xl">
                                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                        {(block.type === 'ul' || block.type === 'ol' || block.type === 'list') && (
                          <div className="space-y-3 pl-4 border-l-2 border-primary/20">
                            <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground opacity-50 mb-2 block">
                              {block.type === 'ol' ? 'Numbered List' : 'Bulleted List'}
                            </span>
                            {block.items?.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-3 group/item">
                                <span className="text-xs font-bold text-primary/40">
                                  {block.type === 'ol' ? `${idx + 1}.` : '•'}
                                </span>
                                <input 
                                  type="text"
                                  value={item}
                                  onChange={(e) => updateListItem(block.id, idx, e.target.value)}
                                  placeholder="List item..."
                                  className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
                                />
                                <button 
                                  onClick={() => removeListItem(block.id, idx)}
                                  className="opacity-0 group-hover/item:opacity-100 p-1 text-muted-foreground hover:text-rose-500 transition-all"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                            <button 
                              onClick={() => addListItem(block.id)}
                              className="text-[10px] font-bold text-primary hover:underline mt-2 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" /> Add Point
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <button 
                        onClick={() => removeBlock(block.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-muted-foreground hover:text-rose-500 transition-all flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            </div>

            {/* Advanced Block Controls */}
            <div className="mt-20 pt-8 border-t border-border/30">
               <div className="flex flex-wrap items-center justify-center gap-3">
                <button 
                  onClick={() => addBlock('h2')}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-primary/20"
                >
                  <Heading2 className="w-4 h-4" /> H2
                </button>
                <button 
                  onClick={() => addBlock('h3')}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-primary/20 opacity-80"
                >
                  <Heading2 className="w-3.5 h-3.5" /> H3
                </button>
                <button 
                  onClick={() => addBlock('p')}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-primary/20"
                >
                  <Type className="w-4 h-4" /> Paragraph
                </button>
                <button 
                  onClick={() => addBlock('ul')}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-primary/20"
                >
                  <ListIcon className="w-4 h-4" /> Bullets
                </button>
                <button 
                  onClick={() => addBlock('ol')}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-primary/20"
                >
                  <ListIcon className="w-4 h-4" /> Numbers
                </button>
                <button 
                  onClick={() => addBlock('image')}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/50 text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all text-[10px] font-black uppercase tracking-widest border border-transparent hover:border-primary/20"
                >
                  <ImageIcon className="w-4 h-4" /> Media
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


