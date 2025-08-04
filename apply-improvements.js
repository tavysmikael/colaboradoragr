// Script para aplicar melhorias a todas as páginas
const fs = require('fs');
const path = require('path');

// Lista de páginas para aplicar melhorias
const pages = [
  'agenda.html',
  'documentos.html', 
  'ferias.html',
  'recadastramento.html',
  'servidor-efetivo-e-comissionado.html',
  'precedimentos-para-solicitar-as-ferias.html',
  'ocupante-de-cargo-de-chefia.html',
  'recesso-de-estagiario.html',
  'empregado-publico.html',
  '404.html'
];

// Melhorias de SEO e meta tags
const seoImprovements = {
  'agenda.html': {
    title: 'Agenda | AGR - Espaço do Colaborador',
    description: 'Acesse a agenda da AGR com eventos, feriados e compromissos importantes. Sistema de calendário interativo para colaboradores.',
    keywords: 'agenda, AGR, calendário, eventos, feriados, compromissos, colaborador'
  },
  'documentos.html': {
    title: 'Documentos | AGR - Espaço do Colaborador',
    description: 'Acesse documentos importantes da AGR. Formulários, regulamentos, manuais e procedimentos para colaboradores.',
    keywords: 'documentos, AGR, formulários, regulamentos, manuais, procedimentos'
  },
  'ferias.html': {
    title: 'Férias | AGR - Espaço do Colaborador',
    description: 'Solicite e gerencie suas férias na AGR. Sistema de solicitação online com acompanhamento de status.',
    keywords: 'férias, AGR, solicitação, colaborador, RH, recursos humanos'
  },
  'recadastramento.html': {
    title: 'Recadastramento | AGR - Espaço do Colaborador',
    description: 'Atualize seus dados cadastrais na AGR. Sistema de recadastramento online para colaboradores.',
    keywords: 'recadastramento, AGR, dados cadastrais, atualização, colaborador'
  }
};

// Função para aplicar melhorias em uma página
function applyImprovements(pageName) {
  const filePath = path.join(__dirname, pageName);
  
  if (!fs.existsSync(filePath)) {
    console.log(`Arquivo ${pageName} não encontrado`);
    return;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  
  // Aplicar melhorias de SEO
  if (seoImprovements[pageName]) {
    const seo = seoImprovements[pageName];
    
    // Substituir title
    content = content.replace(
      /<title>.*?<\/title>/,
      `<title>${seo.title}</title>`
    );
    
    // Adicionar meta tags SEO
    const metaTags = `
  <meta name="description" content="${seo.description}">
  <meta name="keywords" content="${seo.keywords}">
  <meta name="author" content="Agência Goiana de Regulação">
  <meta name="robots" content="index, follow">
  <meta name="theme-color" content="#4299e1">
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.agr.go.gov.br/${pageName}">
  <meta property="og:title" content="${seo.title}">
  <meta property="og:description" content="${seo.description}">
  <meta property="og:image" content="https://github.com/tavysmikael/colaboradoragr/blob/35dd20706c02d12cf7c279e4f4f27f98cfa9a11c/logo-azul.png?raw=true">
  
  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://www.agr.go.gov.br/${pageName}">
  <meta property="twitter:title" content="${seo.title}">
  <meta property="twitter:description" content="${seo.description}">
  <meta property="twitter:image" content="https://github.com/tavysmikael/colaboradoragr/blob/35dd20706c02d12cf7c279e4f4f27f98cfa9a11c/logo-azul.png?raw=true">

  <!-- PWA Manifest -->
  <link rel="manifest" href="manifest.json">
  <link rel="apple-touch-icon" href="Banners/logo-azul.png">
  <link rel="icon" type="image/png" sizes="32x32" href="Banners/logo-azul.png">
  <link rel="icon" type="image/png" sizes="16x16" href="Banners/logo-azul.png">
  
  <!-- Preload critical resources -->
  <link rel="preload" href="styles.css" as="style">
  <link rel="preload" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" as="style">
  
  <!-- Analytics -->
  <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_MEASUREMENT_ID');
  </script>`;
    
    // Inserir após o charset
    content = content.replace(
      /<meta charset="UTF-8">/,
      `<meta charset="UTF-8">${metaTags}`
    );
  }
  
  // Adicionar skip link e loading overlay
  content = content.replace(
    /<body>/,
    `<body>
  <!-- Skip to main content for accessibility -->
  <a href="#main-content" class="skip-link">Pular para o conteúdo principal</a>
  
  <!-- Loading indicator -->
  <div id="loading-overlay" class="loading-overlay">
    <div class="loading-spinner"></div>
    <p>Carregando...</p>
  </div>`
  );
  
  // Adicionar role="banner" ao header
  content = content.replace(
    /<header class="banner">/,
    `<header class="banner" role="banner">`
  );
  
  // Adicionar id="main-content" e role="main" ao main
  content = content.replace(
    /<main>/,
    `<main id="main-content" role="main">`
  );
  
  // Melhorar footer
  content = content.replace(
    /<footer class="footer-banner">\s*<div class="footer-content">\s*<span>Informações e Contato<\/span>/,
    `<footer class="footer-banner" aria-label="Rodapé" role="contentinfo">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Informações e Contato</h3>
        <p>Agência Goiana de Regulação</p>
        <p>Telefone: (62) 3201-0000</p>
        <p>Email: contato@agr.go.gov.br</p>
      </div>
      <div class="footer-section">
        <h3>Links Úteis</h3>
        <ul>
          <li><a href="https://www.goias.gov.br" target="_blank" rel="noopener">Portal do Governo</a></li>
          <li><a href="https://www.goias.gov.br/agr/" target="_blank" rel="noopener">Site Oficial AGR</a></li>
          <li><a href="https://www.transparencia.go.gov.br" target="_blank" rel="noopener">Transparência</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>Redes Sociais</h3>`
  );
  
  // Adicionar botões flutuantes e notificações
  content = content.replace(
    /<div class="floating-buttons">\s*<button id="dark-mode-btn"[^>]*>[\s\S]*?<\/button>\s*<\/div>/,
    `<div class="floating-buttons">
    <button id="dark-mode-btn" title="Alternar Modo Escuro" aria-label="Alternar Modo Escuro" tabindex="0">
      <span id="dark-mode-icon">&#9789;</span>
    </button>
    <button id="back-to-top-btn" title="Voltar ao topo" aria-label="Voltar ao topo" tabindex="0" style="display: none;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 15l-6-6-6 6"/>
      </svg>
    </button>
  </div>

  <!-- Notification Toast -->
  <div id="notification-toast" class="notification-toast" role="alert" aria-live="polite"></div>`
  );
  
  // Adicionar melhorias ao JavaScript
  const jsImprovements = `
    // Performance: Hide loading overlay when page is ready
    window.addEventListener('load', function() {
      const loadingOverlay = document.getElementById('loading-overlay');
      if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
          loadingOverlay.style.display = 'none';
        }, 300);
      }
    });

    // Back to top button
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
          backToTopBtn.style.display = 'block';
        } else {
          backToTopBtn.style.display = 'none';
        }
      });

      backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    }

    // Notification system
    function showNotification(message, type = 'info') {
      const toast = document.getElementById('notification-toast');
      if (toast) {
        toast.textContent = message;
        toast.className = \`notification-toast \${type}\`;
        toast.style.display = 'block';
        
        setTimeout(() => {
          toast.style.display = 'none';
        }, 3000);
      }
    }

    // Gamification: Progress tracking
    function updateProgress() {
      const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');
      const totalPages = 15;
      const progress = Math.round((visitedPages.length / totalPages) * 100);
      
      // Track page visit
      const currentPage = '${pageName.replace('.html', '')}';
      if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
      }
    }
    updateProgress();

    // Analytics: Track page views
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        'page_title': '${pageName.replace('.html', '')}',
        'page_location': window.location.href
      });
    }

    // Service Worker Registration for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
          .then(function(registration) {
            console.log('SW registered: ', registration);
          })
          .catch(function(registrationError) {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }`;
  
  // Adicionar melhorias ao final do script existente
  content = content.replace(
    /(\s*<\/script>\s*<\/body>\s*<\/html>\s*)$/,
    `${jsImprovements}
    $1`
  );
  
  // Salvar arquivo atualizado
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`Melhorias aplicadas em ${pageName}`);
}

// Aplicar melhorias em todas as páginas
pages.forEach(applyImprovements);

console.log('Todas as melhorias foram aplicadas com sucesso!'); 