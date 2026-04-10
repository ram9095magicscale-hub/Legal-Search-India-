'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    otp: ''
  });
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP');
      
      setMsg('OTP sent to your email! (Check console for mock)');
      setStep(2);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Registration failed');
      
      if (data.user.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-4">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-card/50 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl relative z-10 overflow-hidden">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
          <p className="text-muted-foreground text-sm">Join Legal Search India today.</p>
        </div>

        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}
        {msg && (
          <div className="bg-primary/10 border border-primary/20 text-primary text-sm p-3 rounded-lg mb-6 text-center">
            {msg}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.form 
              key="step1"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleSendOtp} 
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="name">Full Name</label>
                <input 
                  id="name"
                  type="text" 
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="email">Email</label>
                <input 
                  id="email"
                  type="email" 
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="password">Password</label>
                <input 
                  id="password"
                  type="password" 
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="Create a password"
                />
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_15px_hsl(var(--primary)/0.3)] disabled:opacity-50"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </motion.form>
          ) : (
            <motion.form 
              key="step2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onSubmit={handleRegister} 
              className="space-y-5"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5" htmlFor="otp">Enter OTP</label>
                <input 
                  id="otp"
                  type="text" 
                  required
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 text-center tracking-[0.5em] text-xl font-bold text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  placeholder="000000"
                  maxLength={6}
                />
                <p className="text-xs text-muted-foreground mt-2 text-center">We've sent a 6-digit code to {formData.email}</p>
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-all shadow-[0_0_15px_hsl(var(--primary)/0.3)] disabled:opacity-50"
              >
                {loading ? 'Verifying...' : 'Verify & Register'}
              </button>
              
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="w-full bg-transparent text-foreground border border-border font-semibold py-3 rounded-xl hover:bg-muted transition-all"
              >
                Back
              </button>
            </motion.form>
          )}
        </AnimatePresence>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Already have an account? <Link href="/login" className="text-primary font-semibold hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
}
