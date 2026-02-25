
import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Instagram, Facebook, Linkedin, Play } from 'lucide-react';

const WebsiteView: React.FC = () => {
  return (
    <div className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-blue-500 selection:text-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6 flex justify-between items-center bg-gradient-to-b from-black/50 to-transparent backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="font-display font-bold text-2xl tracking-tighter uppercase">VAIO</span>
          <span className="font-serif italic text-blue-500 text-lg">Atelier</span>
        </div>
        <div className="hidden md:flex items-center gap-12 text-[10px] font-display font-bold uppercase tracking-[0.2em]">
          <a href="#" className="hover:text-blue-500 transition-colors">Coleções</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Filosofia</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Projetos</a>
          <a href="#" className="hover:text-blue-500 transition-colors">Contato</a>
        </div>
        <button className="px-6 py-2 border border-white/20 rounded-full text-[10px] font-display font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
          Agendar Consultoria
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://picsum.photos/seed/luxury-kitchen/1920/1080?grayscale" 
            alt="Luxury Kitchen" 
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        </motion.div>

        <div className="relative z-10 text-center max-w-5xl px-6">
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="font-serif italic text-xl md:text-2xl text-blue-500 mb-4"
          >
            A arte de viver bem.
          </motion.p>
          <motion.h1 
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="font-display font-black text-6xl md:text-9xl uppercase tracking-tighter leading-[0.85] mb-8"
          >
            Design <br /> <span className="text-transparent border-t border-b border-white/20 px-4">Atemporal</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8"
          >
            <button className="group flex items-center gap-4 text-[11px] font-display font-bold uppercase tracking-widest">
              Descubra a Coleção 2026
              <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-blue-500 group-hover:border-blue-500 transition-all">
                <ArrowRight size={16} />
              </div>
            </button>
            <button className="flex items-center gap-3 text-[11px] font-display font-bold uppercase tracking-widest opacity-50 hover:opacity-100 transition-opacity">
              <Play size={14} fill="currentColor" />
              Ver Filme
            </button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[9px] font-display font-bold uppercase tracking-[0.3em] opacity-30">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-blue-500 to-transparent"></div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <span className="text-blue-500 font-display font-bold text-xs uppercase tracking-[0.3em] mb-6 block">Nossa Essência</span>
          <h2 className="font-serif text-5xl md:text-7xl leading-tight mb-8">
            Onde a precisão encontra a <span className="italic">alma</span> do artesão.
          </h2>
          <p className="text-slate-400 font-light leading-relaxed text-lg mb-12 max-w-md">
            Cada peça é uma sinfonia de texturas e proporções, desenhada para elevar o cotidiano ao extraordinário. Não criamos apenas móveis; moldamos o cenário das suas melhores memórias.
          </p>
          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="font-display font-bold text-3xl mb-2">15+</h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Anos de Excelência</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-3xl mb-2">1.2k</h4>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Projetos Entregues</p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl"
        >
          <img 
            src="https://picsum.photos/seed/craft/800/1000" 
            alt="Craftsmanship" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-8 right-8 bg-white text-black p-8 rounded-xl max-w-xs">
            <p className="font-serif italic text-lg mb-4">"O luxo está nos detalhes que ninguém vê, mas todos sentem."</p>
            <p className="font-display font-bold text-[10px] uppercase tracking-widest">— Guber Oliveira, Diretor Criativo</p>
          </div>
        </motion.div>
      </section>

      {/* Collections Grid */}
      <section className="py-32 px-8 bg-[#050505]">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-blue-500 font-display font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Portfólio</span>
            <h2 className="font-display font-black text-5xl md:text-7xl uppercase tracking-tighter">Coleções</h2>
          </div>
          <button className="hidden md:block text-[10px] font-display font-bold uppercase tracking-widest border-b border-white/20 pb-2 hover:border-blue-500 transition-colors">
            Ver Todos os Projetos
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Minimalist Loft', cat: 'Living', img: 'https://picsum.photos/seed/loft/800/1200' },
            { title: 'Oak Sanctuary', cat: 'Bedroom', img: 'https://picsum.photos/seed/oak/800/1200' },
            { title: 'Urban Gourmet', cat: 'Kitchen', img: 'https://picsum.photos/seed/urban/800/1200' }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.8 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-xl mb-6 relative">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-6 py-3 border border-white rounded-full text-[10px] font-display font-bold uppercase tracking-widest">Explorar</span>
                </div>
              </div>
              <p className="text-[10px] text-blue-500 font-display font-bold uppercase tracking-widest mb-2">{item.cat}</p>
              <h3 className="font-serif text-3xl">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-24 px-8 md:px-24 border-t border-white/5">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <span className="font-display font-bold text-3xl tracking-tighter uppercase">VAIO</span>
              <span className="font-serif italic text-blue-500 text-xl">Atelier</span>
            </div>
            <p className="text-slate-500 max-w-sm leading-relaxed">
              Transformando espaços em experiências sensoriais através do design de alta marcenaria. Sediada em São Paulo, atendendo o mundo.
            </p>
          </div>
          <div>
            <h5 className="font-display font-bold text-[10px] uppercase tracking-[0.3em] text-blue-500 mb-8">Menu</h5>
            <ul className="space-y-4 text-sm font-light text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Início</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Coleções</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Processo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Showroom</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-display font-bold text-[10px] uppercase tracking-[0.3em] text-blue-500 mb-8">Social</h5>
            <div className="flex gap-6">
              <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-3 rounded-full border border-white/10 hover:bg-white hover:text-black transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 text-[10px] font-display font-bold uppercase tracking-widest text-slate-600">
          <p>© 2026 VAIO MARCENARIA. Todos os direitos reservados.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WebsiteView;
