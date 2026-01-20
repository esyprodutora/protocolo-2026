import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

const CHECKOUT_LINKS: Record<number, string> = {
  30: 'https://pagamento.patriotaslivre.shop/checkout?product=198a26ca-779b-11f0-bb47-46da4690ad53',
  50: 'https://pagamento.patriotaslivre.shop/checkout?product=33c4a557-779b-11f0-bb47-46da4690ad53',
  100: 'https://pagamento.patriotaslivre.shop/checkout?product=5e0d91b1-779b-11f0-bb47-46da4690ad53',
  150: 'https://pagamento.patriotaslivre.shop/checkout?product=6ed9538b-779b-11f0-bb47-46da4690ad53',
  250: 'https://pagamento.patriotaslivre.shop/checkout?product=91ac41ca-779b-11f0-bb47-46da4690ad53',
  500: 'https://pagamento.patriotaslivre.shop/checkout?product=a6d804a1-779b-11f0-bb47-46da4690ad53',
  1000: 'https://pagamento.patriotaslivre.shop/checkout?product=a6d804a1-779b-11f0-bb47-46da4690ad53'
};

const App = () => {
  const [scrolled, setScrolled] = useState(false);
  const [processingAmount, setProcessingAmount] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [spotsLeft, setSpotsLeft] = useState(17);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Countdown Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fake decreasing stock logic
  useEffect(() => {
    const interval = setInterval(() => {
      setSpotsLeft((prev) => (prev > 3 ? prev - 1 : 3)); // Stops at 3
    }, 45000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleCheckout = (amount: number) => {
    setProcessingAmount(amount);
    const link = CHECKOUT_LINKS[amount];
    
    if (link) {
      // Small delay to show interaction then redirect
      setTimeout(() => {
        window.location.href = link;
      }, 500);
    } else {
      setProcessingAmount(null);
    }
  };

  return (
    <div className="app-container">
      <style>{`
        :root {
          /* Patriot Palette - No Red (except alert) */
          --gold-primary: #D4AF37;       
          --gold-light: #F3E5AB;
          --gold-dark: #8A7018;
          
          /* Technical Alert Red (Only for top bar) */
          --tech-red: #cc0000;

          /* Green / Blue / Black Mix */
          --green-military: #1a3c26;     /* Dark Army Green */
          --green-leaf: #2e6b46;         /* Brazil Flag Green (Darkened) */
          --green-bright: #4ade80;       /* Tech Green for success indicators */
          
          --blue-navy: #0a1226;          /* Deep Navy Blue */
          --blue-royal: #002776;         /* Brazil Flag Blue (Darkened) */
          
          --black-deep: #020202;
          
          --paper-manila: #dcb67f;       
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
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }

        /* --- UTILS --- */
        .container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 0 24px;
        }

        .gold-text {
          background: linear-gradient(135deg, #fff 0%, var(--gold-primary) 50%, #fff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0px 0px 20px rgba(212, 175, 55, 0.3);
        }
        
        .alert-text {
            color: var(--gold-primary); /* Changed from red to gold/yellow */
            font-weight: 800;
            text-shadow: 0 0 15px rgba(212, 175, 55, 0.4);
        }
        
        .green-highlight {
            color: #4cd137;
            font-weight: 700;
            text-shadow: 0 0 10px rgba(76, 209, 55, 0.3);
        }

        .section-padding {
          padding: 80px 0;
        }

        @media (max-width: 768px) {
          .section-padding { padding: 50px 0; }
          h1 { font-size: 2.5rem !important; }
        }

        /* --- STICKY ALERT BAR (The only red allowed) --- */
        .alert-bar {
          background: var(--tech-red);
          color: white;
          text-align: center;
          padding: 10px;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 2000;
          box-shadow: 0 5px 20px rgba(0,0,0,0.5);
          display: flex;
          justify-content: center;
          gap: 15px;
          align-items: center;
        }
        
        .timer-box {
          background: #500000;
          padding: 2px 8px;
          border-radius: 4px;
          font-family: monospace;
          color: white;
          border: 1px solid #ff4444;
        }

        /* --- HEADER --- */
        nav {
          position: fixed;
          top: 40px;
          left: 0;
          width: 100%;
          z-index: 1000;
          transition: all 0.4s ease;
        }

        nav.scrolled {
          background: rgba(6, 24, 14, 0.95); /* Dark Green tint */
          backdrop-filter: blur(10px);
          padding: 10px 0;
          border-bottom: 1px solid var(--green-leaf);
          top: 0; 
        }

        /* --- HERO --- */
        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          position: relative;
          padding-top: 100px;
          /* Green/Blue Patriot Gradient */
          background: radial-gradient(circle at 60% 40%, var(--green-military) 0%, var(--black-deep) 70%);
        }

        .hero h1 {
          font-family: var(--font-display);
          font-size: 4rem;
          line-height: 1.1;
          margin-bottom: 24px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .warning-box {
          border: 1px solid var(--gold-primary);
          background: rgba(212, 175, 55, 0.05);
          color: var(--gold-primary);
          display: inline-block;
          padding: 5px 15px;
          font-weight: 700;
          font-size: 0.8rem;
          margin-bottom: 20px;
          letter-spacing: 2px;
        }

        /* --- COPYWRITING ELEMENTS --- */
        .copy-text {
          font-size: 1.2rem;
          color: #ccc;
          margin-bottom: 20px;
          max-width: 800px;
        }
        
        .highlight {
          background: rgba(0, 39, 118, 0.4); /* Blue background */
          border: 1px solid var(--blue-royal);
          color: white;
          padding: 0 5px;
          font-weight: 600;
        }

        /* --- THREAT CARDS --- */
        .threat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 40px;
          margin-top: 60px;
        }

        .threat-card {
          background: linear-gradient(160deg, rgba(6, 24, 14, 0.4) 0%, rgba(0,0,0,0.8) 100%);
          border: 1px solid var(--green-leaf); /* Green Border */
          padding: 40px;
          transition: 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .threat-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 3px;
          background: linear-gradient(90deg, transparent, var(--gold-primary), transparent);
          opacity: 0.5;
        }

        .threat-card:hover {
          border-color: var(--gold-primary);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }

        .threat-card h3 {
          font-family: var(--font-display);
          font-size: 1.5rem;
          margin-bottom: 15px;
          color: #fff;
        }

        /* --- TIMELINE OF COLLAPSE --- */
        .timeline-section {
           border-left: 2px solid var(--green-leaf);
           margin-left: 20px;
           padding-left: 40px;
           position: relative;
        }
        
        .timeline-item {
          margin-bottom: 50px;
          position: relative;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          left: -49px;
          top: 0;
          width: 16px;
          height: 16px;
          background: var(--black-deep);
          border: 2px solid var(--gold-primary); /* Gold Dots */
          border-radius: 50%;
        }
        
        .timeline-year {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--gold-primary);
          opacity: 0.9;
          line-height: 1;
        }

        /* --- DOSSIER FOLDER --- */
        .folder-container {
           perspective: 1000px;
           display: flex;
           justify-content: center;
           margin: 60px 0;
        }

        .dossier {
          width: 320px;
          height: 440px;
          background-color: var(--paper-manila);
          border-radius: 2px 8px 8px 8px;
          position: relative;
          box-shadow: 20px 20px 60px rgba(0,0,0,0.8);
          transform: rotate(-3deg);
          transition: all 0.5s ease;
          border: 1px solid var(--paper-border);
        }
        
        .stamp-box {
          border: 3px solid #001a4d; /* Navy Blue Stamp, not red */
          color: #001a4d;
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

        /* --- CHECKOUT --- */
        .checkout-box {
          background: #080808;
          border: 1px solid var(--green-leaf);
          padding: 40px;
          position: relative;
          overflow: hidden;
        }
        
        .checkout-box::before {
          content: '';
          position: absolute;
          top:0; left:0; width: 100%; height: 5px;
          background: linear-gradient(90deg, var(--green-leaf), var(--gold-primary), var(--blue-royal));
        }

        .price-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }

        .price-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--green-leaf);
          color: #888;
          padding: 20px;
          font-weight: 600;
          font-size: 1.1rem;
          cursor: pointer;
          transition: all 0.2s;
          flex: 1 1 140px;
          position: relative;
        }

        .price-btn:hover {
          background: var(--green-military);
          color: white;
          border-color: var(--gold-primary);
        }

        .price-btn.neon-recommended {
          background: rgba(212, 175, 55, 0.08);
          color: white;
          border: 2px solid var(--gold-primary);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.2);
          z-index: 10;
          transform: scale(1.05);
        }

        .price-btn.neon-recommended:hover {
           transform: scale(1.08);
           box-shadow: 0 0 30px rgba(212, 175, 55, 0.4);
        }

        .btn-gold {
          background: var(--gold-primary);
          color: #000;
          padding: 20px 40px;
          font-weight: 900;
          font-family: var(--font-body);
          text-transform: uppercase;
          text-decoration: none;
          display: inline-block;
          border: 2px solid var(--gold-light);
          box-shadow: 0 0 20px rgba(212, 175, 55, 0.3);
          transition: all 0.3s ease;
        }
        
        .btn-gold:hover {
          background: white;
          color: var(--black-deep);
          box-shadow: 0 0 40px rgba(212, 175, 55, 0.6);
        }

        .btn-cta-pulse {
          animation: pulse-gold 2s infinite;
        }

        @keyframes pulse-gold {
          0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
          100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
        }

        /* Ultimatum Box */
        .ultimatum-box {
          margin-top: 40px; 
          padding: 20px; 
          border: 1px solid #333; 
          background: rgba(0,0,0,0.5);
          text-align: center;
        }

        .ultimatum-title {
          color: #ccc; 
          font-size: 0.9rem; 
          text-transform: uppercase; 
          letter-spacing: 2px;
          margin-bottom: 10px;
        }

        .ultimatum-text {
          font-family: var(--font-display); 
          font-size: 1.3rem; 
          color: #fff;
          font-style: italic;
        }

      `}</style>

      {/* ALERT BAR - SCARCITY TRIGGER */}
      <div className="alert-bar">
        <span>⚠ CONEXÃO SEGURA ESTABELECIDA. O LINK EXPIRA EM:</span>
        <div className="timer-box">{formatTime(timeLeft)}</div>
      </div>

      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '60px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: '1.2rem', textTransform: 'uppercase' }}>
             Protocolo <span style={{ color: 'var(--gold-primary)' }}>2026</span>
          </div>
          <div style={{ fontSize: '0.7rem', color: '#666', border: '1px solid #333', padding: '5px 10px' }}>
            DOC ID: #992-ALPHA
          </div>
        </div>
      </nav>

      {/* HERO: AGGRESSIVE REVOLT */}
      <header className="hero">
        <div className="container">
          <div className="warning-box">MENSAGEM NÃO INTERCEPTADA</div>
          <h1>
            Você está sendo <span className="alert-text">Roubado</span>, <span className="alert-text">Calado</span> e em breve... <span className="alert-text">Escravizado</span>.
          </h1>
          <div className="copy-text">
            <p>
              Olhe em volta. O preço do mercado. A censura nas redes. O medo de falar o que pensa. 
              Eles acham que você é fraco. Eles contam com sua passividade.
            </p>
            <p style={{ marginTop: '20px', fontWeight: 'bold', color: 'white' }}>
              2026 não é uma eleição. É um ultimato. Ou você se blinda AGORA, ou não sobrará nada para sua família.
            </p>
          </div>
          <br/>
          <a href="#checkout" className="btn-gold btn-cta-pulse" style={{ marginTop: '20px', textDecoration: 'none', textAlign: 'center' }}>
            EU NÃO ACEITO VIRAR UM ESCRAVO
          </a>
          <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '15px' }}>
            *Acesso a este documento será removido em breve por ordem judicial.
          </p>
        </div>
      </header>

      {/* THE PAIN: TIMELINE OF DOOM */}
      <section className="section-padding" style={{ background: '#050505' }}>
        <div className="container">
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', marginBottom: '50px' }}>
            O Cronograma da <span className="alert-text">Sua Ruína</span>
          </h2>
          <p style={{ marginBottom: '50px', color: '#999' }}>
            Tivemos acesso a documentos internos que detalham os próximos passos do "Mecanismo", do sistema. Se você não agir, este é o seu futuro:
          </p>

          <div className="timeline-section">
            <div className="timeline-item">
              <div className="timeline-year">HOJE</div>
              <h3 style={{ color: 'white', fontSize: '1.5rem' }}>A Vigilância Silenciosa</h3>
              <p style={{ color: '#888' }}>
                Suas transações bancárias já estão sendo monitoradas. Suas redes sociais têm "shadowban". Você sente que algo está errado, mas não consegue provar. <span className="highlight">Eles estão mapeando seus bens.</span>
              </p>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">2025</div>
              <h3 style={{ color: 'white', fontSize: '1.5rem' }}>O Cerco Digital</h3>
              <p style={{ color: '#888' }}>
                Implementação total do DREX (Real Digital). O dinheiro de papel acaba. Se você criticar o sistema, sua conta é bloqueada instantaneamente. <span className="highlight">Você não tem mais soberania sobre seu suor.</span>
              </p>
            </div>

            <div className="timeline-item">
              <div className="timeline-year">2026</div>
              <h3 style={{ color: 'white', fontSize: '1.5rem' }}>O Xeque-Mate</h3>
              <p style={{ color: '#888' }}>
                Com a oposição presa ou exilada, e a economia controlada digitalmente, a "eleição" será apenas uma formalidade. A doutrinação nas escolas será lei federal. <span className="highlight">Seus filhos pertencerão ao Estado.</span>
              </p>
            </div>
          </div>
          
          <div style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid var(--green-leaf)', padding: '30px', textAlign: 'center', marginTop: '40px' }}>
            <h3 style={{ color: 'var(--gold-primary)', textTransform: 'uppercase' }}>Isso te assusta? Deveria.</h3>
            <p style={{ color: 'white' }}>Mas existe uma brecha. Um caminho que a elite usa para se proteger e que nós vamos entregar na sua mão.</p>
          </div>
        </div>
      </section>

      {/* THE SOLUTION: THE PROTOCOL */}
      <section className="section-padding" style={{ background: 'radial-gradient(circle, var(--blue-navy) 0%, #000 100%)' }}>
        <div className="container">
           <div style={{ textAlign: 'center' }}>
             <h2 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)' }}>A Única Forma de <span className="gold-text">Sobreviver</span></h2>
             <p style={{ color: '#aaa', maxWidth: '600px', margin: '20px auto' }}>
               O Protocolo 2026 não é um "ebook". É um dossiê de inteligência militar e financeira. É o manual de instruções para você se tornar <strong>ingovernável</strong>.
             </p>
           </div>

           <div className="folder-container">
             <div className="dossier">
                <div style={{ position: 'absolute', top: '-15px', right: '20px', width: '20px', height: '60px', border: '4px solid #888', borderRadius: '10px', borderBottom: 'none', zIndex: 10 }}></div>
                <div className="stamp-box">CONFIDENCIAL</div>
                
                <div style={{ textAlign: 'center', marginTop: '160px' }}>
                  <h1 style={{ color: 'black', fontFamily: 'Courier New', fontWeight: 900, fontSize: '2.5rem', borderBottom: '3px solid black', display: 'inline-block' }}>PROTOCOLO</h1>
                  <h2 style={{ color: 'black', fontFamily: 'Courier New', fontWeight: 900, fontSize: '3rem', lineHeight: 0.8 }}>2026</h2>
                  <p style={{ color: '#444', fontFamily: 'Courier New', marginTop: '20px', fontSize: '0.9rem' }}>
                    CONTINGÊNCIA PATRIMONIAL<br/>
                    DEFESA CIBERNÉTICA<br/>
                    ROTAS DE FUGA
                  </p>
                </div>
             </div>
           </div>

           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '40px' }}>
             <div style={{ borderLeft: '3px solid var(--gold-primary)', paddingLeft: '15px' }}>
               <h4 style={{ color: 'var(--gold-primary)' }}>BLINDAGEM FINANCEIRA</h4>
               <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Como tirar seu dinheiro do raio de alcance do judiciário brasileiro legalmente em 24 horas.</p>
             </div>
             <div style={{ borderLeft: '3px solid var(--gold-primary)', paddingLeft: '15px' }}>
               <h4 style={{ color: 'var(--gold-primary)' }}>ANONIMATO DIGITAL</h4>
               <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Técnicas usadas por jornalistas investigativos para se comunicar sem serem rastreados pela "Abin paralela".</p>
             </div>
           </div>
        </div>
      </section>

      {/* CHECKOUT: SCARCITY & ACTION */}
      <section id="checkout" className="section-padding" style={{ position: 'relative', background: '#020202' }}>
        <div className="container">
          <div className="checkout-box">
             <div style={{ textAlign: 'center', marginBottom: '40px' }}>
               <div style={{ display: 'inline-block', background: 'var(--green-military)', color: '#fff', padding: '5px 10px', fontWeight: 'bold', fontSize: '0.8rem', borderRadius: '4px', marginBottom: '15px', border: '1px solid var(--green-leaf)' }}>
                 ⚠ RESTAM APENAS {spotsLeft} CÓPIAS DO DOSSIÊ
               </div>
               <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2.2rem' }}>
                 Quanto Vale a <span className="gold-text">Liberdade</span> da Sua Família?
               </h2>
               <p style={{ color: '#888', fontSize: '1rem', marginTop: '15px' }}>
                 O valor abaixo não é um preço. É uma doação para manter nossa infraestrutura operando nas sombras, longe dos olhos do governo. <br/><strong style={{color: 'white'}}>Você está financiando a Resistência.</strong>
               </p>
             </div>

             <div className="price-grid">
              {[30, 50, 100, 150, 250, 500, 1000].map((amount) => (
                <button 
                  key={amount}
                  className={`price-btn ${amount === 150 ? 'neon-recommended' : ''}`}
                  onClick={() => handleCheckout(amount)}
                  disabled={processingAmount !== null}
                >
                  {amount === 150 && (
                    <div className="rec-label" style={{ 
                      position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', 
                      background: 'var(--gold-primary)', color: 'black', padding: '2px 8px', 
                      fontSize: '0.7rem', fontWeight: 800, whiteSpace: 'nowrap' 
                    }}>
                      ESCOLHA DA MAIORIA
                    </div>
                  )}
                  <div style={{ fontSize: '0.8rem', color: '#555', marginBottom: '5px' }}>CONTRIBUIÇÃO</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>R$ {amount}</div>
                </button>
              ))}
            </div>

            {/* AGGRESSIVE ULTIMATUM SECTION */}
            <div className="ultimatum-box">
               <div className="ultimatum-title">⚠ Aviso Importante</div>
               <p className="ultimatum-text">
                  "Se você sair desta página agora, você está escolhendo entregar o futuro dos seus filhos na mão DELES. Não existe meio termo. Ou você age, ou você obedece."
               </p>
               <div style={{ marginTop: '15px', color: '#666', fontSize: '0.8rem' }}>
                 ↓ CLIQUE EM UM VALOR ACIMA PARA SE PROTEGER ↓
               </div>
            </div>

            <div style={{ marginTop: '30px', textAlign: 'center' }}>
               <div className="security-info-bar" style={{ background: 'transparent', border: 'none', flexDirection: 'column' }}>
                  <p style={{ color: '#666', fontSize: '0.9rem' }}>
                    Ao clicar em um valor, você será redirecionado para um servidor seguro offshore. <br/>
                    Seu nome não aparecerá em nenhuma lista pública.
                  </p>
                  <p style={{ color: 'var(--gold-primary)', marginTop: '10px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    GARANTIA DE SIGILO ABSOLUTO.
                  </p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <footer style={{ background: '#020202', padding: '40px 0', textAlign: 'center', borderTop: '1px solid #111' }}>
        <p style={{ color: '#444', fontSize: '0.8rem' }}>PROTOCOLO 2026 © - ALGUNS DIREITOS RESERVADOS.</p>
        <p style={{ color: '#222', fontSize: '0.7rem', marginTop: '10px' }}>ESTE SITE NÃO POSSUI VÍNCULO COM O GOVERNO FEDERAL.</p>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}