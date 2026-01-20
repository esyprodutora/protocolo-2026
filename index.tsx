import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [processingAmount, setProcessingAmount] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCheckout = (amount: number) => {
    setProcessingAmount(amount);
    // Simulation of aggressive loading/security check
    setTimeout(() => {
      alert(`REDIRECIONANDO PARA AMBIENTE CRIPTOGRAFADO.\nDoação: R$ ${amount},00\n\nProtocolo de segurança iniciado.`);
      setProcessingAmount(null);
    }, 1500);
  };

  return (
    <div className="app-container">
      <style>{`
        :root {
          /* Dark Patriotic Palette */
          --gold-primary: #D4AF37;       /* Metallic Gold */
          --gold-light: #F3E5AB;
          --gold-dark: #8A7018;
          
          --green-deep: #06180e;         /* Deep Jungle Green (Backgrounds) */
          --green-accent: #134d2e;       /* Emerald (Accents) */
          
          --blue-deep: #050a14;          /* Midnight Blue */
          --blue-accent: #0f2b4d;        /* Navy (Accents) */

          --black-deep: #020202;
          
          --paper-manila: #dcb67f;       /* Folder Color */
          --paper-border: #b59056;
          
          --text-gray: #a3a3a3;
          --font-display: 'Playfair Display', serif;
          --font-body: 'Inter', sans-serif;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          background-color: var(--black-deep);
          color: white;
          font-family: var(--font-body);
          line-height: 1.6;
          /* Subtle noise texture over everything for grit */
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }

        /* --- UTILS --- */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .gold-text {
          background: linear-gradient(135deg, #fff 0%, var(--gold-primary) 50%, #fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 0px 20px rgba(212, 175, 55, 0.3);
        }
        
        .red-text {
            color: #ff4444;
            text-shadow: 0 0 15px rgba(255, 0, 0, 0.3);
        }

        .highlight-green {
          color: #4ade80;
          text-shadow: 0 0 10px rgba(74, 222, 128, 0.2);
        }

        .section-padding {
          padding: 100px 0;
        }

        @media (max-width: 768px) {
          .section-padding { padding: 60px 0; }
        }

        /* --- HEADER --- */
        nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.4s ease;
          border-bottom: 1px solid transparent;
        }

        nav.scrolled {
          background: rgba(2, 2, 2, 0.9);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(212, 175, 55, 0.2);
          padding: 15px 0;
        }

        nav .logo {
          font-family: var(--font-display);
          font-weight: 900;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: white;
          font-size: 1.2rem;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* --- HERO --- */
        .hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          /* Dark Patriotic Gradient Background */
          background: radial-gradient(circle at 70% 20%, var(--green-accent) 0%, var(--black-deep) 60%),
                      radial-gradient(circle at 10% 80%, var(--blue-accent) 0%, var(--black-deep) 60%);
        }

        .hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          /* Overlaying an architectural image with heavy darkening */
          background: 
            linear-gradient(to bottom, rgba(2,2,2,0.6) 0%, rgba(2,2,2,1) 100%),
            url('https://images.unsplash.com/photo-1590059371913-644781744186?q=80&w=2000') center/cover no-repeat;
          z-index: -1;
          opacity: 0.4;
          mix-blend-mode: luminosity;
        }

        .hero-content {
          max-width: 800px;
          z-index: 1;
        }

        .warning-badge {
          display: inline-block;
          border: 1px solid var(--gold-primary);
          color: var(--gold-primary);
          padding: 8px 16px;
          font-size: 0.75rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          margin-bottom: 24px;
          background: rgba(212, 175, 55, 0.1);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.1);
        }

        h1 {
          font-family: var(--font-display);
          font-size: clamp(2.8rem, 8vw, 5rem);
          line-height: 1.1;
          margin-bottom: 24px;
          font-weight: 700;
        }

        .hero-sub {
          font-size: clamp(1.1rem, 4vw, 1.4rem);
          color: var(--text-gray);
          max-width: 600px;
          margin-bottom: 40px;
          border-left: 2px solid var(--gold-primary);
          padding-left: 20px;
          background: linear-gradient(to right, rgba(212,175,55,0.05), transparent);
        }

        /* --- CTA BUTTONS --- */
        .btn-gold {
          display: inline-block;
          background: var(--gold-primary);
          color: black;
          padding: 20px 40px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 2px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: 1px solid var(--gold-primary);
          cursor: pointer;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0,0,0,0.5);
        }

        .btn-gold:hover {
          background: transparent;
          color: var(--gold-primary);
          box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
        }

        /* --- THE THREAT (DARK SECTION) --- */
        .threat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }

        .threat-card {
          background: linear-gradient(160deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 40px;
          transition: 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .threat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 3px;
          background: linear-gradient(90deg, transparent, #ff3333, transparent);
          opacity: 0.5;
        }

        .threat-card:hover {
          border-color: #ff3333;
          background: rgba(255, 0, 0, 0.05);
          transform: translateY(-5px);
        }

        .threat-card h3 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #fff;
        }

        /* --- DOSSIER FOLDER (CSS ART) --- */
        .folder-container {
           perspective: 1000px;
           display: flex;
           justify-content: center;
        }

        .dossier {
          width: 320px;
          height: 440px;
          background-color: var(--paper-manila);
          border-radius: 2px 8px 8px 8px;
          position: relative;
          box-shadow: 
            5px 5px 15px rgba(0,0,0,0.5),
            inset 0 0 40px rgba(0,0,0,0.1);
          transform: rotate(-5deg) rotateY(10deg);
          transition: all 0.5s ease;
          border: 1px solid var(--paper-border);
        }
        
        .dossier:hover {
          transform: rotate(0deg) scale(1.02);
          box-shadow: 10px 10px 30px rgba(0,0,0,0.6);
        }

        /* Folder Tab */
        .dossier::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 0;
          width: 120px;
          height: 20px;
          background-color: var(--paper-manila);
          border-radius: 8px 8px 0 0;
          border: 1px solid var(--paper-border);
          border-bottom: none;
        }

        /* Paper texture overlay */
        .dossier::after {
          content: '';
          position: absolute;
          top:0; left:0; right:0; bottom:0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: multiply;
        }

        .stamp-box {
          border: 3px solid #b30000;
          color: #b30000;
          width: fit-content;
          padding: 5px 15px;
          font-weight: 900;
          font-family: 'Courier New', monospace;
          text-transform: uppercase;
          font-size: 1.5rem;
          opacity: 0.8;
          transform: rotate(-15deg);
          position: absolute;
          top: 60px;
          right: 30px;
          mix-blend-mode: multiply;
          mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E");
        }

        .dossier-label {
          position: absolute;
          top: 150px;
          left: 50%;
          transform: translateX(-50%);
          width: 80%;
          text-align: center;
        }

        .dossier-title {
          font-family: 'Courier New', monospace;
          color: #1a1a1a;
          font-size: 1.8rem;
          font-weight: 900;
          letter-spacing: -1px;
          margin-bottom: 5px;
          border-bottom: 2px solid #1a1a1a;
          padding-bottom: 10px;
        }
        
        .dossier-sub {
          font-family: 'Courier New', monospace;
          color: #444;
          font-size: 0.8rem;
          text-transform: uppercase;
          margin-top: 10px;
        }

        .paper-clip {
          position: absolute;
          top: -10px;
          right: 40px;
          width: 20px;
          height: 60px;
          border: 3px solid #888;
          border-radius: 10px;
          z-index: 10;
          border-bottom: none;
        }

        /* --- PROTOCOL REVEAL --- */
        .protocol-section {
          background: radial-gradient(circle at 50% 50%, var(--green-deep) 0%, var(--black-deep) 100%);
          border-top: 1px solid rgba(255,255,255,0.05);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .feature-list li {
          list-style: none;
          padding: 20px 0;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          font-size: 1.2rem;
          display: flex;
          align-items: center;
        }

        .feature-list li span {
          color: var(--gold-primary);
          margin-right: 15px;
          font-size: 1.5rem;
        }

        /* --- CHECKOUT --- */
        .checkout-box {
          background: linear-gradient(145deg, #0a0a0a, #000);
          border: 1px solid var(--gold-dark);
          padding: 60px;
          text-align: center;
          position: relative;
          box-shadow: 0 0 50px rgba(0,0,0,0.8);
        }

        .price-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 15px;
          margin: 60px 0 40px 0;
        }

        .price-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.1);
          color: var(--text-gray);
          padding: 20px 30px;
          font-family: var(--font-body);
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          flex: 1 1 120px;
          max-width: 200px;
          position: relative;
        }

        .price-btn:hover {
          border-color: var(--gold-primary);
          color: white;
          background: rgba(212, 175, 55, 0.05);
          transform: translateY(-2px);
        }

        .price-btn.neon-recommended {
          background: rgba(212, 175, 55, 0.05);
          color: #fff;
          border: 2px solid var(--gold-primary);
          box-shadow: 0 0 15px rgba(212, 175, 55, 0.4), inset 0 0 10px rgba(212, 175, 55, 0.1);
          transform: scale(1.1);
          z-index: 10;
        }
        
        .price-btn.neon-recommended:hover {
          box-shadow: 0 0 25px rgba(212, 175, 55, 0.6), inset 0 0 20px rgba(212, 175, 55, 0.2);
          transform: scale(1.15);
        }

        .rec-label {
          position: absolute;
          top: -14px;
          left: 50%;
          transform: translateX(-50%);
          background: var(--gold-primary);
          color: black;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 1px;
          padding: 2px 10px;
          border-radius: 2px;
          white-space: nowrap;
          box-shadow: 0 2px 10px rgba(0,0,0,0.5);
        }

        .security-info-bar {
          background: rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 4px;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 0.8rem;
          color: #666;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        
        .status-dot {
          width: 8px;
          height: 8px;
          background-color: #2ecc71;
          border-radius: 50%;
          box-shadow: 0 0 10px #2ecc71;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }

        /* --- FOOTER --- */
        footer {
          text-align: center;
          padding: 60px 0;
          color: #444;
          font-size: 0.8rem;
          letter-spacing: 2px;
          text-transform: uppercase;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
      `}</style>

      {/* Navigation */}
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
          <div className="logo">
             <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--gold-primary)', boxShadow: '0 0 10px var(--gold-primary)'}}></div>
             Protocolo <span style={{ color: 'var(--gold-primary)' }}>2026</span>
          </div>
          <div style={{ fontSize: '0.7rem', letterSpacing: '2px', color: 'var(--text-gray)', border: '1px solid rgba(255,255,255,0.2)', padding: '5px 10px' }}>
            ACESSO RESTRITO
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            <div className="warning-badge">Leitura Obrigatória</div>
            <h1>
              O Jogo Está Viciado.<br />
              <span className="gold-text">2026 Já Tem Dono.</span>
            </h1>
            <p className="hero-sub">
              Eles acham que você não percebeu. Enquanto você trabalha, o sistema aparelha as instituições para o <strong>golpe final</strong>. O Protocolo 2026 não é um livro: é o manual de defesa que eles tentaram banir.
            </p>
            <a href="#protocolo" className="btn-gold">
              Quero Me Preparar Para o Pior
            </a>
          </div>
        </div>
      </header>

      {/* The Threat Section (Pain Agitation) */}
      <section className="section-padding" style={{ background: 'linear-gradient(to bottom, #020202, #050a14)' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', textAlign: 'center', marginBottom: '20px' }}>
            O Brasil Que Você Conhece <span className="red-text">Vai Acabar</span>
          </h2>
          <p style={{ textAlign: 'center', color: '#888', maxWidth: '750px', margin: '0 auto 60px', fontSize: '1.1rem' }}>
            Não é teoria da conspiração. É matemática. A censura avança, o judiciário legisla e a economia é sabotada. Você está pronto para ver seu patrimônio derreter enquanto eles riem em Brasília?
          </p>

          <div className="threat-grid">
            <div className="threat-card active-threat">
              <h3>Sua Voz Será Criminalizada</h3>
              <p style={{ color: '#888' }}>
                Críticas serão tratadas como "ataques à democracia". O Protocolo ensina como operar nas sombras e manter sua comunicação indetectável pelo STF.
              </p>
            </div>
            <div className="threat-card active-threat">
              <h3>O Confisco Está Chegando</h3>
              <p style={{ color: '#888' }}>
                Reforma tributária, moedas digitais (Drex) e bloqueios judiciais. Aprenda a blindar seu dinheiro fora do alcance do Estado antes que seja tarde.
              </p>
            </div>
            <div className="threat-card active-threat">
              <h3>Seus Filhos São o Alvo</h3>
              <p style={{ color: '#888' }}>
                A agenda woke não vai parar na porta da escola. Eles querem desconstruir a moral da sua família. Saiba como criar uma fortaleza mental contra a doutrinação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution (The Protocol) */}
      <section id="protocolo" className="section-padding protocol-section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'center' }}>
            <div>
              <div className="warning-badge" style={{ borderColor: 'rgba(255,255,255,0.2)', color: 'white', background: 'transparent' }}>
                 Documento Estratégico
              </div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '3rem', marginBottom: '30px' }}>
                Sua Única Chance é <span className="gold-text">Saber o Que Eles Escondem</span>
              </h2>
              <p style={{ marginBottom: '30px', color: '#ccc' }}>
                Compilamos relatórios de insiders, táticas de contra-espionagem digital e brechas jurídicas que a elite usa para se proteger.
              </p>
              <ul className="feature-list">
                <li><span>⦿</span> Blindagem Patrimonial Anti-Bloqueio</li>
                <li><span>⦿</span> Rotas de Fuga e Anonimato Digital</li>
                <li><span>⦿</span> Lista Negra: Quem Realmente Manda no País</li>
                <li><span>⦿</span> Dossiê 2026: O Plano da Oposição Real</li>
              </ul>
            </div>
            
            <div className="folder-container">
               {/* Realistic CSS Manila Folder */}
               <div className="dossier">
                  <div className="paper-clip"></div>
                  <div className="stamp-box">SIGILOSO</div>
                  
                  <div className="dossier-label">
                    <div style={{ fontFamily: 'Courier New', fontSize: '0.7rem', color: '#666', marginBottom: '20px', letterSpacing: '2px' }}>
                      MINISTÉRIO DA VERDADE
                    </div>
                    <div className="dossier-title">PROTOCOLO<br/>2026</div>
                    <div className="dossier-sub">
                      CLASSIFICAÇÃO: MÁXIMA<br/>
                      CÓPIA Nº: 14.592
                    </div>
                  </div>

                  <div style={{ position: 'absolute', bottom: '30px', left: '0', width: '100%', textAlign: 'center', fontFamily: 'Courier New', color: '#555', fontSize: '0.7rem' }}>
                    BRASÍLIA - DF - BRASIL
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Filter / Social Proof */}
      <section className="section-padding" style={{ background: '#020202', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--gold-light)' }}>
            "Tempos difíceis criam homens fortes. A omissão cria escravos."
          </p>
          <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
            {['+15.000 Patriotas', 'Conteúdo Sem Censura', 'Acesso Vitalício'].map((item, i) => (
              <div key={i} style={{ border: '1px solid #333', padding: '10px 20px', fontSize: '0.8rem', color: '#888', borderRadius: '50px', background: 'rgba(255,255,255,0.02)' }}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checkout Section (Aggressive Close) */}
      <section id="checkout" className="section-padding" style={{ 
        background: 'url(https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop) center/cover',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', top:0, left:0, width:'100%', height:'100%', background:'linear-gradient(to bottom, rgba(5,5,5,0.9), rgba(5,15,5,0.95))' }}></div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="checkout-box">
            <div className="warning-badge">Última Chamada</div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '10px' }}>
              Financie a Verdade. <br/>Receba a Proteção.
            </h2>
            <p style={{ color: '#aaa', maxWidth: '700px', margin: '0 auto 40px auto', lineHeight: '1.6' }}>
              Eles contam com o seu silêncio e sua passividade. Prove que estão errados. Sua doação mantém nossa infraestrutura de pé contra a censura e te dá acesso às armas intelectuais necessárias para sobreviver ao expurgo que virá.
            </p>

            <div className="price-grid">
              {[30, 50, 100, 150, 250, 500, 1000].map((amount) => (
                <button 
                  key={amount}
                  className={`price-btn ${amount === 150 ? 'neon-recommended' : ''}`}
                  onClick={() => handleCheckout(amount)}
                  disabled={processingAmount !== null}
                >
                  {amount === 150 && <span className="rec-label">RECOMENDADO</span>}
                  {processingAmount === amount ? '...' : `R$ ${amount}`}
                </button>
              ))}
            </div>

            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '20px', marginBottom: '30px', borderRadius: '4px' }}>
              <h4 style={{ color: 'var(--gold-primary)', marginBottom: '10px' }}>RECOMPENSA DE APOIO:</h4>
              <p style={{ fontSize: '0.9rem', color: '#ccc' }}>
                Liberação imediata do arquivo digital <strong>Protocolo 2026</strong> + Dossiê Político + Guia de Blindagem Patrimonial.
              </p>
            </div>

            <div className="security-info-bar">
               <div className="status-dot"></div>
               <span>AMBIENTE SEGURO. CLIQUE NO VALOR PARA ACESSAR.</span>
            </div>
            
            <p style={{ marginTop: '20px', fontSize: '0.75rem', color: '#555' }}>
              <span style={{ color: '#2ecc71' }}>🔒 256-bit SSL Encrypted.</span> Seus dados não ficam registrados em servidores nacionais.
            </p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p style={{color: '#888'}}>ORDEM • LIBERDADE • BRASIL</p>
          <p style={{ marginTop: '10px', opacity: 0.5 }}>© 2024-2026 PROTOCOLO. TODOS OS DIREITOS RESERVADOS.</p>
        </div>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
