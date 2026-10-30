/**
 * Portfolio Data Layer & Dynamic Rendering
 * Manages Experience, Education, and Projects with localStorage persistence,
 * fallback defaults, and dynamic rendering for Web and CV PDF.
 */
(function (global) {
  const STORAGE_KEYS = {
    EXPERIENCES: "portfolio.experiences.v2",
    EDUCATION: "portfolio.education.v2",
    PROJECTS: "portfolio.projects.v3",
    LANDING: "portfolio.landing.v2"
  };

  const DEFAULT_EXPERIENCES = [
    {
      id: "exp-ena",
      company: "ENA - Escola de Negócios e Administração",
      companyShort: "ENA - Escola de Negócios e Administração",
      type: "job",
      role: {
        pt: "Full Stack Developer",
        en: "Full Stack Developer"
      },
      period: {
        pt: "Setembro de 2026 a presente",
        en: "September 2026 to Present"
      },
      periodCv: {
        pt: "Set 2026 a presente",
        en: "Sep 2026 to Present"
      },
      sub: {
        pt: "",
        en: ""
      },
      description: {
        pt: "Rebranding do website ena.pt e desenvolvimento da plataforma de gestão de formação e backoffice, com um CMS para estruturar as páginas públicas do site.",
        en: "Rebranding of the ena.pt website and development of the training-management platform and back office, with a CMS to structure the site's public pages."
      },
      tags: ["Full Stack Development", "Rebranding", "CMS", "Backoffice"],
      url: "https://ena.pt"
    },
    {
      id: "exp-espiraleducada",
      company: "Espiraleducada - Formação e Consultoria Unipessoal Lda.",
      companyShort: "Espiraleducada",
      type: "job",
      role: {
        pt: "Full Stack Web Developer",
        en: "Full Stack Web Developer"
      },
      period: {
        pt: "Abril de 2026 a presente",
        en: "April 2026 to Present"
      },
      periodCv: {
        pt: "Abr 2026 a presente",
        en: "Apr 2026 to Present"
      },
      sub: {
        pt: "Part-time, 25 horas",
        en: "Part-time, 25 hours"
      },
      description: {
        pt: "Multi-tenant SaaS B2B com módulo de faturação em conformidade com Autoridade Tributária, CRM Profissional e Gestão de Formação Profissional Auto-Financiada e Financiada.",
        en: "Multi-tenant B2B SaaS with invoicing module compliant with the Portuguese Tax Authority (AT), Professional CRM, and Management of Self-Funded and Funded Professional Training."
      },
      tags: ["Multi-tenant SaaS", "Autoridade Tributária (AT)", "CRM", "Formação Profissional", "Full Stack Development", "APIs"],
      url: ""
    },
    {
      id: "exp-formafuturo-redesign",
      company: "FormaFuturo",
      companyShort: "FormaFuturo",
      type: "job",
      role: {
        pt: "Desenvolvedor Full Stack & Web Designer",
        en: "Full Stack Developer & Web Designer"
      },
      period: {
        pt: "Setembro de 2025 - Novembro de 2025",
        en: "September 2025 - November 2025"
      },
      periodCv: {
        pt: "Set 2025 a Nov 2025",
        en: "Sep 2025 to Nov 2025"
      },
      sub: {
        pt: "",
        en: ""
      },
      description: {
        pt: "Redesign Completo do Website. Desenvolvimento Full Stack, UI/UX e APIs, criando interfaces responsivas, intuitivas, integrações e soluções robustas de ponta a ponta.",
        en: "Full Website Redesign. Full Stack development, UI/UX and APIs, creating responsive, intuitive interfaces, integrations, and robust end-to-end solutions."
      },
      tags: ["Desenvolvimento Full Stack", "Design de UI/UX", "Integração de APIs"],
      url: "https://www.formafuturoportugal.pt"
    },
    {
      id: "exp-formafuturo-1",
      company: "FormaFuturo",
      companyShort: "FormaFuturo",
      type: "job",
      role: {
        pt: "Desenvolvedor Full Stack & Web Designer",
        en: "Full Stack Developer & Web Designer"
      },
      period: {
        pt: "Janeiro de 2025 - Fevereiro de 2025",
        en: "January 2025 - February 2025"
      },
      periodCv: {
        pt: "Jan 2025 a Fev 2025",
        en: "Jan 2025 to Feb 2025"
      },
      sub: {
        pt: "",
        en: ""
      },
      description: {
        pt: "Desenvolvedor Full Stack e Web Designer, focado na criação de experiências digitais eficientes e centradas no utilizador.",
        en: "Full Stack Developer & Web Designer, focused on creating efficient, user-centered digital experiences."
      },
      tags: ["Desenvolvimento Full Stack", "Design de UI/UX", "Integração de APIs"],
      url: "https://www.formafuturoportugal.pt"
    },
    {
      id: "exp-normadidatica",
      company: "NormaDidática",
      companyShort: "NormaDidática",
      type: "job",
      role: {
        pt: "Frontend Developer Intern",
        en: "Frontend Developer Intern"
      },
      period: {
        pt: "Abril de 2023 - Dezembro de 2023",
        en: "April 2023 - December 2023"
      },
      periodCv: {
        pt: "Abr 2023 a Dez 2023",
        en: "Apr 2023 to Dec 2023"
      },
      sub: {
        pt: "Remote",
        en: "Remote"
      },
      description: {
        pt: "Desenvolvimento frontend de interfaces web, com foco em UI/UX, HTML, CSS e JavaScript, apoiando a implementação de websites e a melhoria da experiência do utilizador.",
        en: "Frontend development of web interfaces focused on UI/UX, HTML, CSS and JavaScript, supporting website implementation and improving user experience."
      },
      tags: ["Frontend Development", "UI/UX Design", "HTML / CSS / JS"],
      url: "https://www.normadidática.pt"
    },
    {
      id: "exp-devlop",
      company: "Devlop by Leviahub",
      companyShort: "Devlop by Leviahub",
      type: "internship",
      role: {
        pt: "Estagiário de Desenvolvimento",
        en: "Software Development Intern"
      },
      period: {
        pt: "Meados de fevereiro de 2026 a maio de 2026",
        en: "Mid-February 2026 to May 2026"
      },
      periodCv: {
        pt: "Meados fev. 2026 a Mai 2026",
        en: "Mid-Feb 2026 to May 2026"
      },
      sub: {
        pt: "www.devlop.systems",
        en: "www.devlop.systems"
      },
      description: {
        pt: "Estágio em desenvolvimento de software numa empresa de engenharia de sistemas de informação, com soluções cloud para supply chain, logística e transporte.",
        en: "Software development internship at an information systems engineering company, with cloud solutions for supply chain, logistics, and transportation."
      },
      tags: ["Desenvolvimento de Software", "Trabalho em Equipa", "Soluções Cloud"],
      url: "https://devlop.systems/"
    }
  ];

  const DEFAULT_EDUCATION = [
    {
      id: "edu-mestrado",
      degree: {
        pt: "Mestrado em Ciência de Computadores",
        en: "Master's in Computer Science"
      },
      institution: {
        pt: "Mestrado em Ciência de Computadores",
        en: "Master's in Computer Science"
      },
      level: {
        pt: "Mestrado",
        en: "Master's Degree"
      },
      area: {
        pt: "Ciência de Computadores",
        en: "Computer Science"
      },
      period: {
        pt: "Setembro de 2026 a presente",
        en: "September 2026 to Present"
      },
      periodCv: {
        pt: "Set 2026 a presente",
        en: "Sep 2026 to Present"
      },
      location: {
        pt: "Portugal",
        en: "Portugal"
      },
      description: {
        pt: "Frequência do Mestrado em Ciência de Computadores, com aprofundamento em sistemas computacionais avançados, engenharia de software e arquiteturas escaláveis.",
        en: "Master's degree in Computer Science, deepening advanced software engineering, distributed systems, and scalable computing architectures."
      },
      keyDetails: {
        pt: "Estado: A frequentar (desde setembro 2026)\nÁreas-chave: Ciência de Computadores, Engenharia de Software Avançada, Sistemas Distribuídos",
        en: "Status: In progress (since September 2026)\nKey Areas: Computer Science, Advanced Software Engineering, Distributed Systems"
      }
    },
    {
      id: "edu-licenciatura",
      degree: {
        pt: "Licenciatura em Tecnologias da Informação",
        en: "Bachelor's in Information Technology"
      },
      institution: {
        pt: "Universidade de Aveiro",
        en: "Universidade de Aveiro"
      },
      level: {
        pt: "Licenciatura",
        en: "Bachelor's Degree"
      },
      area: {
        pt: "Tecnologias da Informação",
        en: "Information Technology"
      },
      period: {
        pt: "Setembro 2023 a julho 2026",
        en: "September 2023 to July 2026"
      },
      periodCv: {
        pt: "2023 a Jul 2026",
        en: "2023 to Jul 2026"
      },
      location: {
        pt: "",
        en: ""
      },
      description: {
        pt: "Licenciatura em Tecnologias da Informação concluída em julho de 2026, com foco em desenvolvimento de software, tecnologias web, bases de dados e arquitetura de sistemas. Competências adquiridas em Web Services, Spring Boot, Desenvolvimento Web e Bases de Dados.",
        en: "Bachelor’s degree in Information Technology completed in July 2026, focused on software development, web technologies, databases, and systems architecture. Skills in Web Services, Spring Boot, Web Development, and Databases."
      },
      keyDetails: {
        pt: "Estado: Concluída (julho 2026)\nÁreas-chave: Desenvolvimento Web, Bases de Dados, Engenharia de Software, Análise de Sistemas, Redes\nOpções Livres: Introdução à Gestão, Gestão de Serviços Públicos",
        en: "Status: Completed (July 2026)\nKey Areas: Web Development, Databases, Software Engineering, Systems Analysis, Networking\nFree Options: Introduction to Management, Public Services Management"
      }
    },
    {
      id: "edu-ccp",
      degree: {
        pt: "Certificado de Competências Pedagógicas",
        en: "Certificate of Pedagogical Competences"
      },
      institution: {
        pt: "IEFP",
        en: "IEFP"
      },
      level: {
        pt: "Formação de formadores",
        en: "Trainer training"
      },
      area: {
        pt: "Formação pedagógica inicial de formadores",
        en: "Initial pedagogical training for trainers"
      },
      period: {
        pt: "90 horas",
        en: "90 hours"
      },
      periodCv: {
        pt: "90 horas",
        en: "90 hours"
      },
      location: {
        pt: "",
        en: ""
      },
      description: {
        pt: "Formação pedagógica inicial de formadores (CCP), que habilita a dar formação profissional certificada.",
        en: "Initial pedagogical training for trainers (CCP), which qualifies me to deliver certified vocational training."
      },
      keyDetails: {
        pt: "Duração: 90 horas",
        en: "Duration: 90 hours"
      }
    },
    {
      id: "edu-eformador",
      degree: {
        pt: "e-Formador",
        en: "e-Trainer"
      },
      institution: {
        pt: "",
        en: ""
      },
      level: {
        pt: "Formação de formadores",
        en: "Trainer training"
      },
      area: {
        pt: "Formação a distância",
        en: "Distance learning"
      },
      period: {
        pt: "45 horas",
        en: "45 hours"
      },
      periodCv: {
        pt: "45 horas",
        en: "45 hours"
      },
      location: {
        pt: "",
        en: ""
      },
      description: {
        pt: "Formação para conceber e dinamizar formação a distância, em e-learning e b-learning.",
        en: "Training to design and run distance learning, in e-learning and blended formats."
      },
      keyDetails: {
        pt: "Duração: 45 horas",
        en: "Duration: 45 hours"
      }
    },
    {
      id: "edu-12ano",
      degree: {
        pt: "Ensino Secundário - 12.º Ano",
        en: "High School - 12th Year"
      },
      institution: {
        pt: "Escola Secundária Almeida Garrett",
        en: "ES Almeida Garrett"
      },
      level: {
        pt: "Ensino Secundário - 12.º Ano",
        en: "High School - 12th Year"
      },
      area: {
        pt: "Ciências e Tecnologias",
        en: "Science and Technologies"
      },
      period: {
        pt: "Setembro 2022 - Junho 2023",
        en: "September 2022 - June 2023"
      },
      periodCv: {
        pt: "2022 a 2023",
        en: "2022 to 2023"
      },
      location: {
        pt: "",
        en: ""
      },
      description: {
        pt: "Concluí o ensino secundário na área de Ciências e Tecnologias, com especialização no 12.º ano em Química e Inglês. Desenvolvi uma base sólida em raciocínio científico, trabalho de laboratório, pensamento analítico e comunicação técnica em Inglês.",
        en: "Completed secondary education in the Science and Technology track, with final-year specialization in Chemistry and English. Developed a strong foundation in scientific reasoning, laboratory work, analytical thinking, and technical communication in English."
      },
      keyDetails: {
        pt: "Disciplinas-chave: Química, Matemática, Inglês",
        en: "Key Subjects: Chemistry, Mathematics, English"
      }
    },
    {
      id: "edu-10-11ano",
      degree: {
        pt: "Ensino Secundário - 10.º e 11.º Anos",
        en: "High School - 10th and 11th Years"
      },
      institution: {
        pt: "Escola Secundária de Castelo de Paiva",
        en: "Escola Secundária de Castelo de Paiva"
      },
      level: {
        pt: "Ensino Secundário - 10.º e 11.º Anos",
        en: "High School - 10th and 11th Years"
      },
      area: {
        pt: "Ciências e Tecnologias",
        en: "Science and Technologies"
      },
      period: {
        pt: "Setembro 2020 - Junho 2022",
        en: "September 2020 - June 2022"
      },
      periodCv: {
        pt: "2020 a 2022",
        en: "2020 to 2022"
      },
      location: {
        pt: "",
        en: ""
      },
      description: {
        pt: "Concluí o currículo geral de Ciências e Tecnologias, desenvolvendo uma base sólida em matemática, física, química e raciocínio científico, com ênfase em pensamento analítico e resolução de problemas.",
        en: "Completed the general Science and Technology curriculum, developing a solid foundation in mathematics, physics, chemistry, and scientific reasoning, with emphasis on analytical thinking and problem-solving."
      },
      keyDetails: {
        pt: "Disciplinas-chave: Matemática, Física, Química, Biologia",
        en: "Key Subjects: Mathematics, Physics, Chemistry, Biology"
      }
    }
  ];

  const DEFAULT_PROJECTS = [
    {
      id: "proj-nexiforma",
      title: "NexiForma",
      link: "https://nexiforma.pt",
      image: "assets/work/nexiforma-1.webp",
      gallery: [
        { src: "assets/work/nexiforma-1.webp", caption: { pt: "Landing pública: «Da inscrição à inspeção»", en: "Public landing page: “From enrolment to inspection”" } },
        { src: "assets/work/nexiforma-2.webp", caption: { pt: "Painel do gestor: sessões, assinaturas, dossiês e pipeline", en: "Manager dashboard: sessions, signatures, dossiers and pipeline" } },
        { src: "assets/work/nexiforma-6.webp", caption: { pt: "Fatura com ATCUD e QR da AT, com painel de cobrança", en: "Invoice with Tax Authority ATCUD and QR code, plus collection panel" } },
        { src: "assets/work/nexiforma-7.webp", caption: { pt: "CRM: painel comercial com funil de leads e de propostas", en: "CRM: sales dashboard with lead and proposal funnels" } },
        { src: "assets/work/nexiforma-16.webp", caption: { pt: "Marketing: Meta Ads e Google Ads num só painel, com CPA, ROAS e evolução diária", en: "Marketing: Meta Ads and Google Ads in one dashboard, with CPA, ROAS and daily trend" } },
        { src: "assets/work/nexiforma-17.webp", caption: { pt: "Campanhas de todas as contas, com investimento, conversões e anúncios rejeitados", en: "Campaigns across every account, with spend, conversions and rejected ads" } },
        { src: "assets/work/nexiforma-18.webp", caption: { pt: "Distribuição do orçamento por campanha, com projeção de conversões", en: "Budget allocation per campaign, with projected conversions" } },
        { src: "assets/work/nexiforma-3.webp", caption: { pt: "Dossiê da ação: checklist DGERT ordenada pelo impacto na inspeção", en: "Course dossier: DGERT checklist ranked by inspection impact" } },
        { src: "assets/work/nexiforma-8.webp", caption: { pt: "Presenças por QR projetado na sala, com código rotativo", en: "Attendance via a QR code projected in the room, with a rotating code" } },
        { src: "assets/work/nexiforma-11.webp", caption: { pt: "Assinaturas digitais com o progresso de cada signatário", en: "Digital signatures with each signer's progress" } },
        { src: "assets/work/nexiforma-9.webp", caption: { pt: "Editor de propostas com pré-visualização do documento", en: "Proposal editor with live document preview" } },
        { src: "assets/work/nexiforma-12.webp", caption: { pt: "Faturas, recibos e notas de crédito, com cobranças vencidas", en: "Invoices, receipts and credit notes, with overdue collections" } },
        { src: "assets/work/nexiforma-13.webp", caption: { pt: "Calendário com sessões, reuniões comerciais e lembretes", en: "Calendar with sessions, sales meetings and reminders" } },
        { src: "assets/work/nexiforma-4.webp", caption: { pt: "Qualidade: conformidade DGERT de todas as ações", en: "Quality: DGERT compliance across every course" } },
        { src: "assets/work/nexiforma-5.webp", caption: { pt: "LMS do formando: módulos, vídeo, quiz e SCORM", en: "Trainee LMS: modules, video, quiz and SCORM" } },
        { src: "assets/work/nexiforma-10.webp", caption: { pt: "Consola da plataforma: entidades, sessões e serviços externos", en: "Platform console: tenants, sessions and external services" } },
        { src: "assets/work/nexiforma-14.webp", caption: { pt: "Verificação pública de certificados", en: "Public certificate verification" } },
        { src: "assets/work/nexiforma-15.webp", caption: { pt: "Landing: faturação dentro da ação, com ATCUD e SAF-T", en: "Landing page: invoicing inside each course, with ATCUD and SAF-T" } }
      ],
      tags: ["SaaS B2B", "LMS", "NestJS + Next.js"],
      description: {
        pt: "Plataforma SaaS multi-tenant para entidades formadoras certificadas pela DGERT. Monta o dossiê técnico-pedagógico a partir do que a equipa já regista e junta gestão de ações e presenças, LMS com SCORM e testes, CRM e faturação.",
        en: "Multi-tenant SaaS for DGERT-certified training providers. It builds the technical-pedagogical dossier from the records the team already keeps, and brings course and attendance management, an LMS with SCORM and quizzes, a CRM and invoicing together."
      }
    },
    {
      id: "proj-atelier",
      title: "Atelier",
      link: "",
      image: "assets/work/atelier-1.webp",
      gallery: [
        { src: "assets/work/atelier-1.webp", caption: { pt: "Loja: entrada de inventário com ficha da peça", en: "Storefront: inventory entry with the piece's record" } },
        { src: "assets/work/atelier-2.webp", caption: { pt: "Página de produto com oficina, origem e variantes", en: "Product page with workshop, origin and variants" } },
        { src: "assets/work/atelier-5.webp", caption: { pt: "Produto com galeria e variantes de cor e tamanho", en: "Product with gallery and colour and size variants" } },
        { src: "assets/work/atelier-6.webp", caption: { pt: "«A nossa história»: página editorial da marca", en: "“Our story”: the brand's editorial page" } },
        { src: "assets/work/atelier-3.webp", caption: { pt: "Back office: métricas e funil de conversão", en: "Back office: metrics and conversion funnel" } },
        { src: "assets/work/atelier-7.webp", caption: { pt: "Detalhe de encomenda com envio, guia e reembolso", en: "Order detail with shipping, label and refund" } },
        { src: "assets/work/atelier-8.webp", caption: { pt: "Checkout, passo 2: entrega com envio CTT", en: "Checkout step 2: delivery with CTT shipping" } },
        { src: "assets/work/atelier-12.webp", caption: { pt: "Checkout, passo 3: revisão e pagamento seguro", en: "Checkout step 3: review and secure payment" } },
        { src: "assets/work/atelier-10.webp", caption: { pt: "Categoria com filtros, pesquisa e ordenação", en: "Category with filters, search and sorting" } },
        { src: "assets/work/atelier-11.webp", caption: { pt: "Favoritos guardados sem conta", en: "Favourites saved without an account" } },
        { src: "assets/work/atelier-4.webp", caption: { pt: "Back office: encomendas com estado de pagamento e envio", en: "Back office: orders with payment and shipping status" } },
        { src: "assets/work/atelier-13.webp", caption: { pt: "Editor de produto: SKU, preço, stock e peso por variante", en: "Product editor: SKU, price, stock and weight per variant" } },
        { src: "assets/work/atelier-14.webp", caption: { pt: "Equipa e funções com sessões ativas", en: "Team and roles with active sessions" } },
        { src: "assets/work/atelier-9.webp", caption: { pt: "Loja no telemóvel", en: "Storefront on mobile" } }
      ],
      tags: ["E-commerce", "Next.js + Prisma", "Back office"],
      description: {
        pt: "Loja online de objetos artesanais portugueses. Cada peça tem ficha de oficina, origem e lote; o back office junta métricas e funil de conversão, encomendas, envios CTT, stock, promoções e automações.",
        en: "Online shop for Portuguese handmade goods. Each piece has its workshop, origin and batch; the back office brings together metrics and a conversion funnel, orders, CTT shipping, stock, promotions and automations."
      }
    },
    {
      id: "proj-pratten",
      title: "Pratten",
      link: "",
      image: "assets/work/pratten-1.webp",
      gallery: [
        { src: "assets/work/pratten-1.webp", caption: { pt: "Dashboard: faturação, vendas da semana e stock baixo", en: "Dashboard: revenue, weekly sales and low stock" } },
        { src: "assets/work/pratten-7.webp", caption: { pt: "Dashboard em tema escuro", en: "Dashboard in dark mode" } },
        { src: "assets/work/pratten-2.webp", caption: { pt: "Estado das mesas em tempo real", en: "Live table status" } },
        { src: "assets/work/pratten-8.webp", caption: { pt: "Detalhe da mesa com pedido aberto e saldo por pagar", en: "Table detail with an open order and balance due" } },
        { src: "assets/work/pratten-6.webp", caption: { pt: "Estatísticas: faturação, pagamentos e reservas", en: "Statistics: revenue, payments and bookings" } },
        { src: "assets/work/pratten-9.webp", caption: { pt: "Gestão de stock com alertas por categoria", en: "Stock management with category alerts" } },
        { src: "assets/work/pratten-3.webp", caption: { pt: "Cardápio com preço e margem de cada prato", en: "Menu with each dish's price and margin" } },
        { src: "assets/work/pratten-10.webp", caption: { pt: "Editor de prato: custo, margem e alergénios", en: "Dish editor: cost, margin and allergens" } },
        { src: "assets/work/pratten-4.webp", caption: { pt: "Menu online com código QR", en: "Online menu with QR code" } },
        { src: "assets/work/pratten-5.webp", caption: { pt: "Equipa: desempenho por colaborador", en: "Staff: performance per team member" } },
        { src: "assets/work/pratten-11.webp", caption: { pt: "Ficha do colaborador com desempenho do mês", en: "Team member profile with monthly performance" } },
        { src: "assets/work/pratten-12.webp", caption: { pt: "Edição de produto no stock", en: "Editing a stock item" } },
        { src: "assets/work/pratten-13.webp", caption: { pt: "Definições: tema, dados do restaurante e impressora", en: "Settings: theme, restaurant details and printer" } },
        { src: "assets/work/pratten-15.webp", caption: { pt: "Importação de dados por CSV", en: "CSV data import" } }
      ],
      tags: ["SaaS restauração", "Spring Boot", "Flutter"],
      description: {
        pt: "SaaS multi-tenant para restaurantes: cada casa gere equipa, mesas, pedidos, stock, cardápio e menu online com QR. Uma única API em Spring Boot serve a gestão em Flutter Web, a app dos empregados e o POS.",
        en: "Multi-tenant SaaS for restaurants: each venue manages staff, tables, orders, stock, menu and a QR online menu. A single Spring Boot API serves the Flutter Web management app, the staff app and the POS."
      }
    },
    {
      id: "proj-lume",
      title: "Lume Commerce",
      link: "",
      image: "assets/work/lume-1.webp",
      gallery: [
        { src: "assets/work/lume-1.webp", caption: { pt: "Loja: «Objetos que dão luz à casa»", en: "Storefront: “Objects that bring light into the home”" } },
        { src: "assets/work/lume-2.webp", caption: { pt: "Página de produto com variantes e avaliações", en: "Product page with variants and reviews" } },
        { src: "assets/work/lume-4.webp", caption: { pt: "Back office: KPIs, gráfico e eventos em tempo real", en: "Back office: KPIs, chart and live events" } },
        { src: "assets/work/lume-5.webp", caption: { pt: "Globo de visitantes em tempo real", en: "Real-time visitor globe" } },
        { src: "assets/work/lume-7.webp", caption: { pt: "Analytics: receita, sessões e funil de conversão", en: "Analytics: revenue, sessions and conversion funnel" } },
        { src: "assets/work/lume-3.webp", caption: { pt: "Checkout com MB WAY, Multibanco, PayPal e cartão", en: "Checkout with MB WAY, Multibanco, PayPal and card" } },
        { src: "assets/work/lume-14.webp", caption: { pt: "Autenticação 3-D Secure em sandbox", en: "3-D Secure authentication in the sandbox" } },
        { src: "assets/work/lume-13.webp", caption: { pt: "Checkout, passo 3: revisão da encomenda", en: "Checkout step 3: order review" } },
        { src: "assets/work/lume-8.webp", caption: { pt: "Encomenda no back office com margem e comissões", en: "Back-office order with margin and fees" } },
        { src: "assets/work/lume-9.webp", caption: { pt: "Editor de produto: geração de variantes", en: "Product editor: variant generation" } },
        { src: "assets/work/lume-10.webp", caption: { pt: "Automação de email para carrinho abandonado", en: "Abandoned-cart email automation" } },
        { src: "assets/work/lume-11.webp", caption: { pt: "Perfil de cliente com valor de vida e histórico", en: "Customer profile with lifetime value and history" } },
        { src: "assets/work/lume-12.webp", caption: { pt: "Catálogo com filtros de coleção e preço", en: "Catalogue with collection and price filters" } },
        { src: "assets/work/lume-6.webp", caption: { pt: "Área de cliente com nível de fidelização", en: "Customer area with loyalty tier" } },
        { src: "assets/work/lume-15.webp", caption: { pt: "Detalhe da encomenda com seguimento CTT", en: "Order detail with CTT tracking" } },
        { src: "assets/work/lume-16.webp", caption: { pt: "Loja no telemóvel", en: "Storefront on mobile" } }
      ],
      tags: ["E-commerce", "Pagamentos", "Analytics em tempo real"],
      description: {
        pt: "Plataforma de e-commerce com loja, checkout em três passos (MB WAY, Multibanco, PayPal, Apple Pay, Google Pay e cartão) e área de cliente. O back office tem KPIs, analytics e um globo de visitantes em tempo real.",
        en: "E-commerce platform with a storefront, a three-step checkout (MB WAY, Multibanco, PayPal, Apple Pay, Google Pay and card) and a customer area. The back office has KPIs, analytics and a real-time visitor globe."
      }
    },
    {
      id: "proj-adpilot",
      title: "AdPilot",
      link: "",
      image: "assets/work/adpilot-1.webp",
      gallery: [
        { src: "assets/work/adpilot-1.webp", caption: { pt: "Visão geral do cliente: KPIs, investimento e receita", en: "Client overview: KPIs, spend and revenue" } },
        { src: "assets/work/adpilot-5.webp", caption: { pt: "Painel global com todos os clientes", en: "Global dashboard across all clients" } },
        { src: "assets/work/adpilot-2.webp", caption: { pt: "Mapa hora × dia da semana para programar anúncios", en: "Hour × weekday heatmap for ad scheduling" } },
        { src: "assets/work/adpilot-10.webp", caption: { pt: "Campanhas multiplataforma em tema escuro", en: "Cross-platform campaigns in dark mode" } },
        { src: "assets/work/adpilot-6.webp", caption: { pt: "Meta Ads: distribuição, tráfego e conversão", en: "Meta Ads: delivery, traffic and conversion" } },
        { src: "assets/work/adpilot-8.webp", caption: { pt: "Ritmo do orçamento com projeção do mês", en: "Budget pacing with month-end projection" } },
        { src: "assets/work/adpilot-13.webp", caption: { pt: "Distribuição de budget proposta por ROAS", en: "Budget allocation proposed by ROAS" } },
        { src: "assets/work/adpilot-9.webp", caption: { pt: "SEO: Search Console com consultas e posição", en: "SEO: Search Console queries and position" } },
        { src: "assets/work/adpilot-3.webp", caption: { pt: "Auditoria das landing pages da concorrência", en: "Competitor landing-page audit" } },
        { src: "assets/work/adpilot-11.webp", caption: { pt: "Lacunas de palavras-chave face à concorrência", en: "Keyword gaps against competitors" } },
        { src: "assets/work/adpilot-12.webp", caption: { pt: "Biblioteca de anúncios dos concorrentes", en: "Competitor ad library" } },
        { src: "assets/work/adpilot-14.webp", caption: { pt: "Recomendações priorizadas com impacto estimado", en: "Prioritised recommendations with estimated impact" } },
        { src: "assets/work/adpilot-15.webp", caption: { pt: "Conteúdo orgânico de Facebook e Instagram", en: "Organic Facebook and Instagram content" } },
        { src: "assets/work/adpilot-4.webp", caption: { pt: "Relatório mensal com exportação e envio", en: "Monthly report with export and sharing" } },
        { src: "assets/work/adpilot-7.webp", caption: { pt: "Visão geral de um segundo cliente", en: "Overview of a second client" } }
      ],
      tags: ["Marketing analytics", "Next.js", "Agente IA"],
      description: {
        pt: "Plataforma para agências acompanharem o marketing de vários clientes: Google, Meta, TikTok e Microsoft Ads, SEO e GA4. Tem mapa hora × dia, auditoria de landing pages da concorrência, recomendações e relatórios em PDF.",
        en: "A platform for agencies to track marketing across many clients: Google, Meta, TikTok and Microsoft Ads, SEO and GA4. It has an hour × weekday heatmap, competitor landing-page audits, recommendations and PDF reports."
      }
    },
    {
      id: "proj-gesforma",
      title: "GesForma",
      link: "",
      image: "assets/work/gesforma-1.webp",
      gallery: [
        { src: "assets/work/gesforma-1.webp", caption: { pt: "Site público com catálogo de cursos", en: "Public website with course catalogue" } },
        { src: "assets/work/gesforma-2.webp", caption: { pt: "Cockpit da turma: tarefas, KPIs e programa", en: "Class cockpit: to-dos, KPIs and syllabus" } },
        { src: "assets/work/gesforma-7.webp", caption: { pt: "CRM de pré-inscrições em funil", en: "Pre-registration CRM as a pipeline" } },
        { src: "assets/work/gesforma-8.webp", caption: { pt: "Ficha da pré-inscrição com histórico e ações rápidas", en: "Lead record with history and quick actions" } },
        { src: "assets/work/gesforma-6.webp", caption: { pt: "Cronograma da turma com grelha de sessões", en: "Class timetable with a session grid" } },
        { src: "assets/work/gesforma-3.webp", caption: { pt: "Dossiê técnico-pedagógico com completude por turma", en: "Training dossier with completeness per class" } },
        { src: "assets/work/gesforma-4.webp", caption: { pt: "CMS do site: blocos com pré-visualização", en: "Website CMS: blocks with live preview" } },
        { src: "assets/work/gesforma-10.webp", caption: { pt: "Campanhas: conversão, receita e ROI", en: "Campaigns: conversion, revenue and ROI" } },
        { src: "assets/work/gesforma-9.webp", caption: { pt: "Emails automáticos por fase", en: "Automatic emails by stage" } },
        { src: "assets/work/gesforma-11.webp", caption: { pt: "Formação financiada: turmas UFCD e alertas", en: "Funded training: UFCD classes and alerts" } },
        { src: "assets/work/gesforma-12.webp", caption: { pt: "Pagamentos e métodos de pagamento", en: "Payments and payment methods" } },
        { src: "assets/work/gesforma-5.webp", caption: { pt: "Catálogo de cursos no back office", en: "Course catalogue in the back office" } },
        { src: "assets/work/gesforma-13.webp", caption: { pt: "Área do formando: agenda de sessões", en: "Trainee area: session schedule" } },
        { src: "assets/work/gesforma-14.webp", caption: { pt: "Página pública do curso com inscrição", en: "Public course page with enrolment" } },
        { src: "assets/work/gesforma-15.webp", caption: { pt: "Site público no telemóvel", en: "Public website on mobile" } }
      ],
      tags: ["Back office", "React + Fastify", "Formação"],
      description: {
        pt: "Backoffice de gestão de formação feito para a ENA, com o site público incluído. CRM de pré-inscrições, cockpit por turma, dossiê técnico-pedagógico com completude calculada e um editor visual do site.",
        en: "Training-management back office built for ENA, public website included. Pre-registration CRM, a per-class cockpit, a technical-pedagogical dossier with calculated completeness and a visual site editor."
      }
    },
    {
      id: "proj-formafuturo",
      title: "Forma Futuro",
      link: "https://www.formafuturoportugal.pt",
      image: "assets/work/formafuturo.webp",
      tags: ["Full Stack", "DGERT", "REST API"],
      description: {
        pt: "Site e plataforma de formação para uma entidade formadora certificada pela DGERT. Os cursos são carregados de uma API própria, as inscrições entram por formulário e a equipa gere tudo num back office.",
        en: "Website and training platform for a DGERT-certified training provider. Courses load from its own API, enrolments arrive through a form, and the team manages everything from a back office."
      }
    },
    {
      id: "proj-printandgo",
      title: "Print and Go",
      link: "",
      image: "assets/work/printandgo.webp",
      tags: ["E-commerce", "REST API", "SQL"],
      description: {
        pt: "Loja online de produtos personalizáveis. Construí a REST API de raiz: autenticação, catálogo, carrinho e encomendas ligados à base de dados.",
        en: "Online shop for customisable products. I built the REST API from scratch: authentication, catalogue, cart and orders connected to the database."
      }
    },
    {
      id: "proj-autosyspt",
      title: "Auto Sys PT",
      link: "",
      image: "assets/work/autosyspt.webp",
      tags: ["Gestão", "Back office", "UX"],
      description: {
        pt: "Sistema para oficinas acompanharem o histórico de cada viatura: manutenções, reparações, sinistros e serviços. Inclui back office de utilizadores, viaturas e diagnósticos, e feedback de clientes.",
        en: "A system for workshops to track each vehicle's history: maintenance, repairs, claims and services. Includes a back office for users, vehicles and diagnostics, plus client feedback."
      }
    }
  ];

  const DEFAULT_LANDING = {
    hero: {
      badge: {
        pt: "Sites · Lojas online · Sistemas à medida · Manutenção",
        en: "Websites · Online shops · Custom systems · Maintenance"
      },
      kicker: {
        pt: "Desenho e programo sites, lojas online e sistemas à medida para negócios. Fala sempre comigo, do orçamento ao lançamento.",
        en: "I design and build websites, online shops and custom systems for businesses. You talk to me directly, from the quote to the launch."
      },
      title: {
        pt: "Sites que trazem clientes, <em>não só visitas.</em>",
        en: "Websites that bring in clients, <em>not just visits.</em>"
      },
      location: {
        pt: "Trabalho remoto · por videochamada",
        en: "Remote work · over video call"
      }
    },
    stats: [
      {
        id: "stat-1",
        title: { pt: "Do design ao servidor", en: "From design to server" },
        subtitle: { pt: "Uma só pessoa responsável pelo projeto inteiro.", en: "One person responsible for the whole project." }
      },
      {
        id: "stat-2",
        title: { pt: "Projetos em produção", en: "Projects in production" },
        subtitle: { pt: "SaaS com faturação AT, e-commerce e formação DGERT.", en: "SaaS with tax-compliant invoicing, e-commerce and certified training." }
      },
      {
        id: "stat-3",
        title: { pt: "Orçamento sem compromisso", en: "No-strings quote" },
        subtitle: { pt: "Conte a ideia por WhatsApp e recebe uma proposta clara.", en: "Share your idea on WhatsApp and get a clear proposal." }
      }
    ],
    about: {
      title: {
        pt: "Quem faz o seu site",
        en: "Who builds your website"
      },
      p1: {
        pt: "Sou o Diogo Pinto, programador full stack. Trabalha comigo do primeiro esboço até ao site no ar, sem intermediários, esteja onde estiver.",
        en: "I'm Diogo Pinto, a full stack developer. You work with me from the first sketch to the live site, with no middlemen, wherever you are."
      },
      p2: {
        pt: "Hoje desenvolvo um SaaS B2B com faturação em conformidade com a AT, e redesenhei o site da FormaFuturo. Levo essa exigência para cada projeto: páginas rápidas, fáceis de gerir e pensadas para quem as visita.",
        en: "Today I build a B2B SaaS with invoicing compliant with the Portuguese Tax Authority, and I redesigned FormaFuturo's website. I bring that standard to every project: fast pages, easy to manage and designed for the people who visit them."
      }
    },
    skills: [
      {
        num: "01",
        title: { pt: "Rápido no telemóvel", en: "Fast on mobile" },
        desc: { pt: "Páginas leves, testadas em ecrãs pequenos e redes lentas.", en: "Lightweight pages, tested on small screens and slow networks." }
      },
      {
        num: "02",
        title: { pt: "Fácil de gerir", en: "Easy to manage" },
        desc: { pt: "Um painel para mudar textos, projetos e imagens sem depender de ninguém.", en: "A panel to change text, projects and images without depending on anyone." }
      },
      {
        num: "03",
        title: { pt: "Contacto direto", en: "Direct contact" },
        desc: { pt: "Fala sempre com quem programa, do orçamento à manutenção.", en: "You always talk to the person writing the code, from quote to maintenance." }
      }
    ],
    cta: {
      title: {
        pt: "Tem um projeto em mente? Vamos falar.",
        en: "Got a project in mind? Let's talk."
      },
      button: {
        pt: "Pedir orçamento no WhatsApp",
        en: "Get a quote on WhatsApp"
      }
    }
  };

  function getStorage(key, fallback) {
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  function setStorage(key, data) {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return true;
    } catch (e) {
      console.error("Storage error:", e);
      return false;
    }
  }

  const PortfolioData = {
    DEFAULT_EXPERIENCES,
    DEFAULT_EDUCATION,
    DEFAULT_PROJECTS,
    DEFAULT_LANDING,

    getExperiences() {
      return getStorage(STORAGE_KEYS.EXPERIENCES, DEFAULT_EXPERIENCES);
    },
    saveExperiences(items) {
      return setStorage(STORAGE_KEYS.EXPERIENCES, items);
    },

    getEducation() {
      return getStorage(STORAGE_KEYS.EDUCATION, DEFAULT_EDUCATION);
    },
    saveEducation(items) {
      return setStorage(STORAGE_KEYS.EDUCATION, items);
    },

    getProjects() {
      return getStorage(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    },
    saveProjects(items) {
      return setStorage(STORAGE_KEYS.PROJECTS, items);
    },

    getLanding() {
      const stored = getStorage(STORAGE_KEYS.LANDING, null);
      if (!stored) return JSON.parse(JSON.stringify(DEFAULT_LANDING));
      return {
        hero: Object.assign({}, DEFAULT_LANDING.hero, stored.hero || {}),
        stats: (stored.stats && stored.stats.length) ? stored.stats : DEFAULT_LANDING.stats,
        about: Object.assign({}, DEFAULT_LANDING.about, stored.about || {}),
        skills: (stored.skills && stored.skills.length) ? stored.skills : DEFAULT_LANDING.skills,
        cta: Object.assign({}, DEFAULT_LANDING.cta, stored.cta || {})
      };
    },
    saveLanding(data) {
      return setStorage(STORAGE_KEYS.LANDING, data);
    },

    resetAll() {
      try {
        localStorage.removeItem(STORAGE_KEYS.EXPERIENCES);
        localStorage.removeItem(STORAGE_KEYS.EDUCATION);
        localStorage.removeItem(STORAGE_KEYS.PROJECTS);
        localStorage.removeItem(STORAGE_KEYS.LANDING);
        return true;
      } catch {
        return false;
      }
    },

    exportAll() {
      return JSON.stringify({
        version: 2,
        exportedAt: new Date().toISOString(),
        experiences: this.getExperiences(),
        education: this.getEducation(),
        projects: this.getProjects(),
        landing: this.getLanding()
      }, null, 2);
    },

    importAll(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (parsed.experiences && Array.isArray(parsed.experiences)) {
          this.saveExperiences(parsed.experiences);
        }
        if (parsed.education && Array.isArray(parsed.education)) {
          this.saveEducation(parsed.education);
        }
        if (parsed.projects && Array.isArray(parsed.projects)) {
          this.saveProjects(parsed.projects);
        }
        if (parsed.landing && typeof parsed.landing === "object") {
          this.saveLanding(parsed.landing);
        }
        return true;
      } catch (e) {
        console.error("Import error:", e);
        return false;
      }
    },

    escapeHtml(str) {
      return String(str || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    },

    getText(obj, lang) {
      if (!obj) return "";
      if (typeof obj === "string") return obj;
      return obj[lang] || obj["pt"] || obj["en"] || "";
    },

    renderResume(lang) {
      const experiences = this.getExperiences();
      const education = this.getEducation();
      const esc = (s) => this.escapeHtml(s);
      const tagsHtml = (tags) => (tags && tags.length)
        ? `<div class="tag-row">${tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div>`
        : "";
      const expItem = (item) => {
        const role = this.getText(item.role, lang);
        const period = this.getText(item.period, lang);
        const sub = this.getText(item.sub, lang);
        const desc = this.getText(item.description, lang);
        const url = (item.url || "").trim();
        const link = /^https?:\/\//i.test(url)
          ? ` · <a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${esc(url.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a>`
          : "";
        return `
          <li class="tl-item" data-id="${esc(item.id)}">
            <p class="tl-when mono">${esc(period)}</p>
            <div class="tl-body">
              <h3>${esc(role)}</h3>
              <p class="tl-org">${esc(item.company)}${sub ? ` · ${esc(sub)}` : ""}${link}</p>
              ${desc ? `<p>${esc(desc).replace(/\n/g, "<br>")}</p>` : ""}
              ${tagsHtml(item.tags)}
            </div>
          </li>
        `;
      };

      const expContainer = document.getElementById("resumeExperienceContainer");
      if (expContainer) {
        expContainer.innerHTML = experiences.filter((e) => e.type !== "internship").map(expItem).join("");
      }

      const internContainer = document.getElementById("resumeInternshipContainer");
      if (internContainer) {
        const internships = experiences.filter((e) => e.type === "internship");
        internContainer.innerHTML = internships.map(expItem).join("");
        const section = internContainer.closest(".resume__section");
        if (section) section.hidden = internships.length === 0;
      }

      const eduContainer = document.getElementById("resumeEducationContainer");
      if (eduContainer) {
        eduContainer.innerHTML = education.map((item) => {
          const degree = this.getText(item.degree, lang);
          const institution = this.getText(item.institution, lang);
          const period = this.getText(item.period, lang);
          const loc = this.getText(item.location, lang);
          const desc = this.getText(item.description, lang);
          const details = this.getText(item.keyDetails, lang);
          const org = [institution && institution !== degree ? institution : "", loc].filter(Boolean).map(esc).join(" · ");
          return `
            <li class="tl-item" data-id="${esc(item.id)}">
              <p class="tl-when mono">${esc(period)}</p>
              <div class="tl-body">
                <h3>${esc(degree || institution)}</h3>
                ${org ? `<p class="tl-org">${org}</p>` : ""}
                ${desc ? `<p>${esc(desc).replace(/\n/g, "<br>")}</p>` : ""}
                ${details ? `<p class="tl-detail">${esc(details).replace(/\n/g, "<br>")}</p>` : ""}
              </div>
            </li>
          `;
        }).join("");
      }

      // CV em PDF: uma linha temporal (empregos e estágios), projetos e educação
      const cvTimeline = document.getElementById("cvPdfTimeline");
      if (cvTimeline) {
        const internLabel = lang === "pt" ? "Estágio" : "Internship";
        const ordered = experiences.filter((e) => e.type !== "internship").concat(experiences.filter((e) => e.type === "internship"));
        // Consecutive spells in the same role at the same company share one entry on the page.
        const merged = [];
        ordered.forEach((item) => {
          const prev = merged[merged.length - 1];
          const same = prev && prev.item.type === item.type
            && (prev.item.companyShort || prev.item.company) === (item.companyShort || item.company)
            && this.getText(prev.item.role, lang) === this.getText(item.role, lang);
          const period = this.getText(item.periodCv || item.period, lang);
          if (same) prev.periods.push(period);
          else merged.push({ item, periods: [period] });
        });
        cvTimeline.innerHTML = merged.map(({ item, periods }) => {
          const role = this.getText(item.role, lang);
          const period = periods.join(" · ");
          const desc = this.getText(item.description, lang);
          const tags = (item.tags || []).slice(0, 2).map((t) => `<span>${esc(t)}</span>`).join("");
          return `
            <div class="cv-item">
              <div class="cv-when">${esc(period)}${item.type === "internship" ? `<em>${internLabel}</em>` : ""}</div>
              <div class="cv-what">
                <div class="cv-title">${esc(role)}</div>
                <div class="cv-org">${esc(item.companyShort || item.company)}</div>
                ${desc ? `<p>${esc(desc)}</p>` : ""}
                ${tags ? `<div class="cv-tags">${tags}</div>` : ""}
              </div>
            </div>
          `;
        }).join("");
      }

      const cvProjects = document.getElementById("cvPdfProjects");
      if (cvProjects) {
        cvProjects.innerHTML = this.getProjects().slice(0, 3).map((proj) => {
          const desc = this.getText(proj.description, lang).split(/(?<=\.)\s/)[0];
          const link = /^https?:\/\//i.test(proj.link || "") ? proj.link.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "") : "";
          return `
            <div class="cv-project">
              <div class="cv-title">${esc(proj.title)}${link ? ` <span class="cv-link">${esc(link)}</span>` : ""}</div>
              <p>${esc(desc)}</p>
              <div class="cv-tags">${(proj.tags || []).slice(0, 2).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
            </div>
          `;
        }).join("");
      }

      const cvEducation = document.getElementById("cvPdfEducation");
      if (cvEducation) {
        cvEducation.innerHTML = education.map((item) => {
          const degree = this.getText(item.degree, lang);
          const inst = this.getText(item.institution, lang);
          const period = this.getText(item.periodCv || item.period, lang);
          return `
            <div class="cv-edu">
              <div class="cv-title">${esc(degree)}</div>
              <div class="cv-edu__meta">${inst && inst !== degree ? `<span class="cv-org">${esc(inst)}</span>` : ""}<span class="cv-when">${esc(period)}</span></div>
            </div>
          `;
        }).join("");
      }

      const cvUpdated = document.getElementById("cvPdfUpdated");
      if (cvUpdated) {
        cvUpdated.textContent = new Date().toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", { month: "long", year: "numeric" });
      }

      this.injectAdminControls();
    },

    renderProjects(lang) {
      const projects = this.getProjects();
      const container = document.querySelector(".project-grid");
      if (!container) return;

      const basePath = /\/pt(?:\/|$)/.test(window.location.pathname) ? "../" : "";
      const limit = parseInt(container.getAttribute("data-limit") || "0", 10);
      const list = limit > 0 ? projects.slice(0, limit) : projects;
      const visitLabel = lang === "pt" ? "Ver projeto" : "View project";

      if (!list.length) {
        container.innerHTML = `<p class="project-empty">${lang === "pt" ? "Novos projetos em breve." : "New projects coming soon."}</p>`;
        this.injectAdminControls();
        return;
      }

      const resolve = (src) => {
        src = (src || "").trim();
        if (!src || /^(https?:|data:)/i.test(src)) return src;
        return basePath + src.replace(/^\.?\//, "").replace(/^\.\.\//, "");
      };
      const screensLabel = (n) => lang === "pt" ? `${n} ecrãs` : `${n} screens`;

      container.innerHTML = list.map((proj) => {
        const desc = this.getText(proj.description, lang);
        const tags = (proj.tags || []).map((t) => `<span class="tag">${this.escapeHtml(t)}</span>`).join("");
        const gallery = (proj.gallery || []).filter(Boolean);
        const first = typeof gallery[0] === "string" ? gallery[0] : (gallery[0] && gallery[0].src);
        const imgSrc = resolve(proj.image || first);

        let href = (proj.link || "").trim();
        let isExternal = false;
        if (/^https?:\/\//i.test(href)) {
          isExternal = true;
        } else if (href && !href.startsWith("#")) {
          href = resolve(href);
        } else {
          href = "";
        }
        const hrefAttr = href ? ` href="${this.escapeHtml(href)}"${isExternal ? ' target="_blank" rel="noopener noreferrer"' : ""}` : "";
        const visitInner = `${visitLabel} <svg class="icon" aria-hidden="true"><use href="${basePath}assets/brand/icons.svg#out"></use></svg>`;
        const shot = imgSrc
          ? `<div class="project-card__shot"><img src="${this.escapeHtml(imgSrc)}" alt="${lang === "pt" ? "Ecrã de" : "Screenshot of"} ${this.escapeHtml(proj.title)}" loading="lazy" decoding="async" />${gallery.length > 1 ? `<span class="project-card__count mono">${screensLabel(gallery.length)}</span>` : ""}</div>`
          : "";

        if (gallery.length) {
          return `
            <article class="project-card has-gallery" data-id="${this.escapeHtml(proj.id)}">
              <button type="button" class="project-card__open" data-gallery="${this.escapeHtml(proj.id)}" aria-label="${lang === "pt" ? "Ver ecrãs de" : "View screens of"} ${this.escapeHtml(proj.title)}"></button>
              <div class="project-card__body">
                <h3 class="project-card__title">${this.escapeHtml(proj.title)}</h3>
                <p>${this.escapeHtml(desc)}</p>
                <div class="tag-row">${tags}</div>
                ${href ? `<a class="project-card__visit"${hrefAttr}>${visitInner}</a>` : ""}
              </div>
              ${shot}
            </article>
          `;
        }

        const tag = href ? "a" : "article";
        return `
          <${tag}${hrefAttr} class="project-card" data-id="${this.escapeHtml(proj.id)}">
            <div class="project-card__body">
              <h3 class="project-card__title">${this.escapeHtml(proj.title)}</h3>
              <p>${this.escapeHtml(desc)}</p>
              <div class="tag-row">${tags}</div>
              ${href ? `<span class="project-card__visit">${visitInner}</span>` : ""}
            </div>
            ${shot}
          </${tag}>
        `;
      }).join("");

      this.injectAdminControls();
    },

    renderLanding(lang) {
      const data = this.getLanding();

      // 1. Hero
      const badgeEl = document.getElementById("heroBadge");
      if (badgeEl && data.hero?.badge) badgeEl.textContent = this.getText(data.hero.badge, lang);

      const kickerEl = document.getElementById("heroKicker");
      if (kickerEl && data.hero?.kicker) kickerEl.textContent = this.getText(data.hero.kicker, lang);

      const titleEl = document.getElementById("heroTitle");
      if (titleEl && data.hero?.title) titleEl.innerHTML = this.getText(data.hero.title, lang);

      const locEl = document.getElementById("heroLocation");
      if (locEl && data.hero?.location) locEl.textContent = this.getText(data.hero.location, lang);

      // 2. Stats Row under Hero (Full Stack, DGERT, PT + remoto)
      const statsRowEl = document.getElementById("heroStatsRow");
      if (statsRowEl && data.stats && Array.isArray(data.stats)) {
        statsRowEl.innerHTML = data.stats.map((st) => {
          const title = this.getText(st.title, lang);
          const sub = this.getText(st.subtitle, lang);
          return `<div class="stat"><strong>${this.escapeHtml(title)}</strong><span>${this.escapeHtml(sub)}</span></div>`;
        }).join("");
      }

      // 3. About
      const aboutTitleEl = document.getElementById("aboutTitle");
      if (aboutTitleEl && data.about?.title) aboutTitleEl.textContent = this.getText(data.about.title, lang);

      const aboutLeadsEl = document.getElementById("aboutLeadTexts");
      if (aboutLeadsEl && data.about) {
        const p1 = this.getText(data.about.p1, lang);
        const p2 = this.getText(data.about.p2, lang);
        aboutLeadsEl.innerHTML = `
          ${p1 ? `<p class="lead">${this.escapeHtml(p1)}</p>` : ""}
          ${p2 ? `<p class="lead">${this.escapeHtml(p2)}</p>` : ""}
        `;
      }

      // 4. Skills
      const skillsEl = document.getElementById("landingSkillsGrid");
      if (skillsEl && data.skills && Array.isArray(data.skills)) {
        skillsEl.innerHTML = data.skills.map((sk) => {
          const num = sk.num || "";
          const title = this.getText(sk.title, lang);
          const desc = this.getText(sk.desc, lang);
          return `
            <article class="skill-card">
              ${num ? `<em>${this.escapeHtml(num)}</em>` : ""}
              <strong>${this.escapeHtml(title)}</strong>
              <p>${this.escapeHtml(desc)}</p>
            </article>
          `;
        }).join("");
      }

      // 5. CTA
      const ctaTitleEl = document.getElementById("ctaTitle");
      if (ctaTitleEl && data.cta?.title) ctaTitleEl.textContent = this.getText(data.cta.title, lang);

      const ctaBtnEl = document.getElementById("ctaBtn");
      if (ctaBtnEl && data.cta?.button) ctaBtnEl.textContent = this.getText(data.cta.button, lang);

      this.injectAdminControls();
    },

    injectAdminControls() {
      const isAuthed = sessionStorage.getItem("portfolio.admin") === "1";
      if (!isAuthed) return;

      const isPt = /\/pt(?:\/|$)/.test(window.location.pathname) || (localStorage.getItem("site.lang") !== "en");
      const adminPath = /\/pt(?:\/|$)/.test(window.location.pathname) ? "../admin.html" : "admin.html";

      // Floating admin badge
      let badge = document.getElementById("adminBarBadge");
      if (!badge) {
        badge = document.createElement("div");
        badge.id = "adminBarBadge";
        badge.className = "admin-floating-badge";
        badge.innerHTML = `
          <a href="${adminPath}" class="admin-badge-btn" title="${isPt ? 'Ir para o Painel de Administração' : 'Go to Admin Dashboard'}">
            
            <span>${isPt ? 'Modo Admin' : 'Admin Mode'}</span>
          </a>
        `;
        document.body.appendChild(badge);
      }

      // Add direct edit links in section headers if on resume or projects page
      document.querySelectorAll("[data-admin-edit-section]").forEach((el) => el.remove());

      const heroActions = document.querySelector(".hero .hero-actions");
      if (heroActions && (/index\.html$/i.test(window.location.pathname) || /\/pt\/?$/i.test(window.location.pathname) || window.location.pathname.endsWith("/"))) {
        const btn = document.createElement("a");
        btn.setAttribute("data-admin-edit-section", "true");
        btn.className = "btn-ghost btn-admin-quick";
        btn.href = `${adminPath}#landing`;
        btn.innerHTML = `${isPt ? 'Editar Página Inicial' : 'Edit Landing Page'}`;
        heroActions.appendChild(btn);
      }

      const expHeader = document.querySelector("#resumeExperienceHeader");
      if (expHeader) {
        const btn = document.createElement("a");
        btn.setAttribute("data-admin-edit-section", "true");
        btn.className = "btn-ghost btn-admin-quick";
        btn.href = `${adminPath}#experience`;
        btn.innerHTML = `${isPt ? 'Editar Experiência' : 'Edit Experience'}`;
        expHeader.appendChild(btn);
      }

      const eduHeader = document.querySelector("#resumeEducationHeader");
      if (eduHeader) {
        const btn = document.createElement("a");
        btn.setAttribute("data-admin-edit-section", "true");
        btn.className = "btn-ghost btn-admin-quick";
        btn.href = `${adminPath}#education`;
        btn.innerHTML = `${isPt ? 'Editar Educação' : 'Edit Education'}`;
        eduHeader.appendChild(btn);
      }

      const projHeader = document.querySelector(".page-hero .site-wrap");
      if (projHeader && /projects\.html/i.test(window.location.pathname)) {
        const btn = document.createElement("a");
        btn.setAttribute("data-admin-edit-section", "true");
        btn.className = "btn-ghost btn-admin-quick mt-2";
        btn.style.display = "inline-flex";
        btn.href = `${adminPath}#projects`;
        btn.innerHTML = `${isPt ? 'Gerir / Adicionar Projetos' : 'Manage / Add Projects'}`;
        projHeader.appendChild(btn);
      }
    }
  };

  global.PortfolioData = PortfolioData;
})(typeof window !== "undefined" ? window : this);
