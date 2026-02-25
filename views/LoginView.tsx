
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Eye, EyeOff, UserPlus, ShieldCheck } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: { name: string; role: string }) => void;
}

const LoginView: React.FC<LoginViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      onLogin({ name: 'Vaio', role: 'Administrador' });
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row font-sans bg-white">
      {/* Left Side: Login Form */}
      <div className="w-full lg:w-[480px] flex flex-col p-8 md:p-12 lg:p-20 justify-between bg-white z-10">
        <div className="flex flex-col items-center">
          {/* Logo Section */}
          <div className="mb-20 flex flex-col items-center">
            <div className="flex items-center gap-3">
              <div className="flex items-baseline">
                <span className="text-6xl font-[1000] tracking-tighter text-black leading-none">V</span>
                <span className="text-6xl font-[1000] tracking-tighter text-black leading-none -ml-1">A</span>
                <span className="text-6xl font-[1000] tracking-tighter text-black leading-none -ml-1">I</span>
                <span className="text-6xl font-[1000] tracking-tighter text-black leading-none -ml-1">O</span>
              </div>
              <div className="w-14 h-14 rounded-full border-[5px] border-black flex items-center justify-center relative overflow-hidden">
                 <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(12)].map((_, i) => (
                      <div 
                        key={i} 
                        className="absolute w-full h-[3px] bg-black" 
                        style={{ transform: `rotate(${i * 15}deg)` }}
                      ></div>
                    ))}
                 </div>
                 <div className="w-8 h-8 bg-white rounded-full z-10 border-[3px] border-black flex items-center justify-center">
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                 </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="w-full space-y-5">
            <div className="space-y-1">
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-mail"
                className="w-full bg-[#ebf2ff] border-none rounded-md py-5 px-6 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-lg"
              />
            </div>

            <div className="relative group">
              <input 
                type={showPassword ? 'text' : 'password'} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                className="w-full bg-[#ebf2ff] border-none rounded-md py-5 px-6 text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500/20 transition-all outline-none text-lg"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
              </button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#4a1d96] hover:bg-[#3b167a] text-white font-bold py-5 rounded-md transition-all flex items-center justify-center shadow-lg active:scale-[0.99] disabled:opacity-70 text-xl mt-4"
            >
              {isLoading ? (
                <div className="w-7 h-7 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Entrar"
              )}
            </button>

            <div className="text-center pt-6">
              <a href="#" className="text-[#4a1d96] text-base font-semibold hover:underline">
                Esqueci minha senha
              </a>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="mt-16 flex flex-col items-center gap-6">
          <div className="h-[1px] w-full bg-slate-100"></div>
          <p className="text-slate-400 text-xs font-medium tracking-widest">
            © 2026 VAIO CRM
          </p>
          <div className="flex gap-6 text-slate-400">
            <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:text-slate-600 transition-colors">
              <UserPlus size={14} />
              Setup Usuário
            </button>
            <button className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:text-slate-600 transition-colors">
              <ShieldCheck size={14} />
              Testar Auth
            </button>
          </div>
        </div>
      </div>

      {/* Right Side: Image & Branding */}
      <div className="hidden lg:block flex-1 relative overflow-hidden bg-slate-900">
        <img 
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2000&auto=format&fit=crop" 
          alt="City Night" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        <div className="absolute bottom-24 left-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <h2 className="text-6xl font-black text-white mb-8 tracking-tight">
              LIVE+ CRM
            </h2>
            <p className="text-2xl text-white/90 leading-relaxed font-light max-w-lg">
              Gerencie imóveis, leads e contatos em um só lugar com eficiência e elegância.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginView;
