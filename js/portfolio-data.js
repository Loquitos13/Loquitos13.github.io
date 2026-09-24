/**
 * Portfolio Data Layer & Dynamic Rendering
 * Manages Experience, Education, and Projects with localStorage persistence,
 * fallback defaults, and dynamic rendering for Web and CV PDF.
 */
(function (global) {
  const STORAGE_KEYS = {
    EXPERIENCES: "portfolio.experiences.v2",
    EDUCATION: "portfolio.education.v2",
    PROJECTS: "portfolio.projects.v2"
  };

  const DEFAULT_EXPERIENCES = [
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
        pt: "Santa Maria da Feira, Aveiro",
        en: "Santa Maria da Feira, Aveiro"
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
        pt: "Santa Maria da Feira, Aveiro",
        en: "Santa Maria da Feira, Aveiro"
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
        en: "Master's Degree in Computer Science"
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
        pt: "Águeda, Aveiro",
        en: "Águeda, Aveiro"
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
        pt: "Vila Nova de Gaia, Porto",
        en: "Vila Nova de Gaia, Porto"
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
        pt: "Castelo de Paiva, Aveiro",
        en: "Castelo de Paiva, Aveiro"
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
      id: "proj-formafuturo",
      title: "Forma Futuro",
      link: "projects/formafuturoportugal/",
      image: "assets/project1.png",
      tags: ["Full Stack", "DGERT", "REST API"],
      description: {
        pt: "A Forma Futuro Portugal é uma entidade formadora acreditada pela DGERT. O website carrega cursos, recebe inscrições e gere formação certificada. O back-end expõe rotas como /api/courses e /api/enrollments. O front-end consome a API e mostra cartões, filtros e formulários.",
        en: "Forma Futuro Portugal is a DGERT accredited training provider. The website loads courses, accepts enrollments, and manages certified training. The back end exposes routes such as /api/courses and /api/enrollments. The front end consumes the API and renders cards, filters, and forms."
      }
    },
    {
      id: "proj-printandgo",
      title: "Print and Go",
      link: "projects/printandgo/",
      image: "assets/project2.png",
      tags: ["E-commerce", "REST API", "SQL"],
      description: {
        pt: "A Print and Go é uma loja online para produtos personalizáveis. Implementei uma REST API de raiz para ligar o back-end à base de dados. A API cobre autenticação, catálogo, carrinho e encomendas.",
        en: "Print and Go is an online store for customizable products. I built a REST API from scratch to connect the back end to the database. The API covers authentication, catalog, cart, and orders."
      }
    },
    {
      id: "proj-autosyspt",
      title: "Auto Sys PT",
      link: "projects/autosyspt/",
      image: "assets/project3.png",
      tags: ["Gestão", "Back office", "UX"],
      description: {
        pt: "A Auto Sys PT ajuda oficinas a acompanhar o histórico de cada veículo: manutenções, reparações, sinistros e serviços regulares. Inclui um back office para utilizadores, viaturas e diagnósticos. Os clientes podem deixar feedback.",
        en: "Auto Sys PT helps workshops track each vehicle history: maintenance, repairs, accidents, and routine services. It includes a back office for users, vehicles, and diagnostics. Clients can leave feedback."
      }
    }
  ];

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

    resetAll() {
      try {
        localStorage.removeItem(STORAGE_KEYS.EXPERIENCES);
        localStorage.removeItem(STORAGE_KEYS.EDUCATION);
        localStorage.removeItem(STORAGE_KEYS.PROJECTS);
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
        projects: this.getProjects()
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
      const isPt = lang === "pt";
      const experiences = this.getExperiences();
      const education = this.getEducation();

      // Render Visible Experience Cards
      const expContainer = document.getElementById("resumeExperienceContainer");
      if (expContainer) {
        const jobs = experiences.filter((e) => e.type !== "internship");
        expContainer.innerHTML = jobs.map((item) => {
          const role = this.getText(item.role, lang);
          const period = this.getText(item.period, lang);
          const sub = this.getText(item.sub, lang);
          const desc = this.getText(item.description, lang);
          const tags = (item.tags || []).map((t) => `<div class="col mb-3 mb-md-0"><div class="d-flex align-items-center bg-light rounded-3 p-3 h-100">${t}</div></div>`).join("");
          const linkHtml = item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">${item.url.replace(/^https?:\/\//, '')}</a>` : "";

          return `
            <div class="card shadow border-0 rounded-4 mb-5 resume-item-card" data-id="${item.id}">
              <div class="card-body p-5">
                <div class="row align-items-center gx-5">
                  <div class="col text-center text-lg-start mb-4 mb-lg-0">
                    <div class="bg-light p-4 rounded-4">
                      <div class="text-primary fw-bolder mb-2">${period}</div>
                      <div class="small fw-bolder">${role}</div>
                      <div class="medium text-muted text-break">${item.company}</div>
                      ${sub ? `<div class="small text-muted">${sub}</div>` : ""}
                      ${linkHtml ? `<div class="small text-muted mt-1">${linkHtml}</div>` : ""}
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div class="resume-desc">${desc.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
                ${tags ? `<br><div class="row row-cols-1 row-cols-md-3 mb-2">${tags}</div>` : ""}
              </div>
            </div>
          `;
        }).join("");
      }

      // Render Visible Internship Cards
      const internContainer = document.getElementById("resumeInternshipContainer");
      if (internContainer) {
        const internships = experiences.filter((e) => e.type === "internship");
        internContainer.innerHTML = internships.map((item) => {
          const role = this.getText(item.role, lang);
          const period = this.getText(item.period, lang);
          const sub = this.getText(item.sub, lang);
          const desc = this.getText(item.description, lang);
          const tags = (item.tags || []).map((t) => `<div class="col mb-3 mb-md-0"><div class="d-flex align-items-center bg-light rounded-3 p-3 h-100">${t}</div></div>`).join("");
          const linkHtml = item.url ? `<a href="${item.url}" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">${item.url.replace(/^https?:\/\//, '')}</a>` : "";

          return `
            <div class="card shadow border-0 rounded-4 mb-5 resume-item-card" data-id="${item.id}">
              <div class="card-body p-5">
                <div class="row align-items-center gx-5">
                  <div class="col text-center text-lg-start mb-4 mb-lg-0">
                    <div class="bg-light p-4 rounded-4">
                      <div class="text-primary fw-bolder mb-2">${period}</div>
                      <div class="small fw-bolder">${role}</div>
                      <div class="medium text-muted text-break">${item.company}</div>
                      ${sub ? `<div class="small text-muted">${sub}</div>` : ""}
                      ${linkHtml ? `<div class="small text-muted mt-1">${linkHtml}</div>` : ""}
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div class="resume-desc">${desc.replace(/\n/g, '<br>')}</div>
                  </div>
                </div>
                ${tags ? `<br><div class="row row-cols-1 row-cols-md-3 mb-2">${tags}</div>` : ""}
              </div>
            </div>
          `;
        }).join("");
      }

      // Render Visible Education Cards
      const eduContainer = document.getElementById("resumeEducationContainer");
      if (eduContainer) {
        eduContainer.innerHTML = education.map((item) => {
          const degree = this.getText(item.degree, lang);
          const institution = this.getText(item.institution, lang);
          const level = this.getText(item.level, lang);
          const area = this.getText(item.area, lang);
          const period = this.getText(item.period, lang);
          const loc = this.getText(item.location, lang);
          const desc = this.getText(item.description, lang);
          const details = this.getText(item.keyDetails, lang);

          return `
            <div class="card shadow border-0 rounded-4 mb-5 resume-item-card" data-id="${item.id}">
              <div class="card-body p-5">
                <div class="row align-items-center gx-5">
                  <div class="col text-center text-lg-start mb-4 mb-lg-0">
                    <div class="bg-light p-4 rounded-4">
                      <div class="text-secondary fw-bolder mb-2">${period}</div>
                      <div class="mb-2">
                        <div class="small fw-bolder">${institution || degree}</div>
                        ${loc ? `<div class="small text-muted">${loc}</div>` : ""}
                      </div>
                      <div class="fst-italic">
                        <div class="small text-muted">${level || degree}</div>
                        ${area ? `<div class="small text-muted">${area}</div>` : ""}
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <div>
                      ${desc ? `<div>${desc.replace(/\n/g, '<br>')}</div>` : ""}
                      ${details ? `<div class="mt-3 text-muted small" style="line-height:1.6">${details.replace(/\n/g, '<br>')}</div>` : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          `;
        }).join("");
      }

      // Render CV PDF Template (Experiences)
      const cvExpCards = document.getElementById("cvPdfExperienceCards");
      if (cvExpCards) {
        const jobs = experiences.filter((e) => e.type !== "internship");
        cvExpCards.innerHTML = jobs.map((item) => {
          const role = this.getText(item.role, lang);
          const period = this.getText(item.periodCv || item.period, lang);
          const desc = this.getText(item.description, lang);
          const title = `${role}, ${item.companyShort || item.company}`;
          return `
            <div class="cv-card">
              <div class="cv-card-title">${title}</div>
              <div class="cv-card-sub">${period}</div>
              <div class="cv-card-body">${desc}</div>
            </div>
          `;
        }).join("");
      }

      // Render CV PDF Template (Internship)
      const cvInternCards = document.getElementById("cvPdfInternshipCards");
      if (cvInternCards) {
        const internships = experiences.filter((e) => e.type === "internship");
        cvInternCards.innerHTML = internships.map((item) => {
          const role = this.getText(item.role, lang);
          const period = this.getText(item.periodCv || item.period, lang);
          const desc = this.getText(item.description, lang);
          const title = `${role}, ${item.companyShort || item.company}`;
          return `
            <div class="cv-card">
              <div class="cv-card-title">${title}</div>
              <div class="cv-card-sub">${period}${item.url ? ` · ${item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}` : ''}</div>
              <div class="cv-card-body">${desc}</div>
            </div>
          `;
        }).join("");
      }

      // Render CV PDF Template (Education)
      // Note: for compact 1-page A4, we render the degree cards cleanly.
      const cvEduCards = document.getElementById("cvPdfEducationCards");
      if (cvEduCards) {
        cvEduCards.innerHTML = education.map((item) => {
          const degree = this.getText(item.degree, lang);
          const inst = this.getText(item.institution, lang);
          const period = this.getText(item.periodCv || item.period, lang);
          const title = inst && inst !== degree ? `${degree}, ${inst}` : degree;
          return `
            <div class="cv-card">
              <div class="cv-card-title">${title}</div>
              <div class="cv-card-sub">${period}</div>
            </div>
          `;
        }).join("");
      }

      this.injectAdminControls();
    },

    renderProjects(lang) {
      const projects = this.getProjects();
      const container = document.querySelector(".project-grid");
      if (!container) return;

      const basePath = /\/pt(?:\/|$)/.test(window.location.pathname) ? "../" : "";

      container.innerHTML = projects.map((proj) => {
        const desc = this.getText(proj.description, lang);
        const tags = (proj.tags || []).map((t) => `<span class="tag">${this.escapeHtml(t)}</span>`).join("");

        let imgSrc = (proj.image || "").trim();
        if (imgSrc && !imgSrc.startsWith("http") && !imgSrc.startsWith("data:")) {
          const cleanPath = imgSrc.replace(/^\.?\//, "").replace(/^\.\.\//, "");
          imgSrc = basePath ? (basePath + cleanPath) : cleanPath;
        }

        let href = (proj.link || "").trim();
        let isExternal = false;
        if (href) {
          if (/^https?:\/\//i.test(href)) {
            isExternal = true;
          } else if (basePath && !href.startsWith("../") && !href.startsWith("#")) {
            href = basePath + href.replace(/^\.?\//, "");
          }
        } else {
          href = "#";
        }

        const hasLink = href && href !== "#";
        const tag = hasLink ? "a" : "article";
        const targetAttr = isExternal ? ' target="_blank" rel="noopener noreferrer"' : "";
        const hrefAttr = hasLink ? ` href="${href}"${targetAttr}` : "";

        return `
          <${tag}${hrefAttr} class="project-card" data-id="${proj.id}">
            <div class="project-card__body">
              <h2 class="project-card__title">${this.escapeHtml(proj.title)}</h2>
              <p>${this.escapeHtml(desc)}</p>
              <div class="tag-row">${tags}</div>
            </div>
            ${imgSrc ? `<img src="${imgSrc}" alt="${this.escapeHtml(proj.title)}" />` : ""}
          </${tag}>
        `;
      }).join("");

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
            <i class="bi bi-shield-lock-fill"></i>
            <span>${isPt ? 'Modo Admin' : 'Admin Mode'}</span>
          </a>
        `;
        document.body.appendChild(badge);
      }

      // Add direct edit links in section headers if on resume or projects page
      document.querySelectorAll("[data-admin-edit-section]").forEach((el) => el.remove());

      const expHeader = document.querySelector("#resumeExperienceHeader");
      if (expHeader) {
        const btn = document.createElement("a");
        btn.setAttribute("data-admin-edit-section", "true");
        btn.className = "btn-ghost btn-admin-quick";
        btn.href = `${adminPath}#experience`;
        btn.innerHTML = `<i class="bi bi-pencil-square"></i> ${isPt ? 'Editar Experiência' : 'Edit Experience'}`;
        expHeader.appendChild(btn);
      }

      const eduHeader = document.querySelector("#resumeEducationHeader");
      if (eduHeader) {
        const btn = document.createElement("a");
        btn.setAttribute("data-admin-edit-section", "true");
        btn.className = "btn-ghost btn-admin-quick";
        btn.href = `${adminPath}#education`;
        btn.innerHTML = `<i class="bi bi-pencil-square"></i> ${isPt ? 'Editar Educação' : 'Edit Education'}`;
        eduHeader.appendChild(btn);
      }

      const projHeader = document.querySelector(".page-hero .site-wrap");
      if (projHeader && /projects\.html/i.test(window.location.pathname)) {
        const btn = document.createElement("a");
        btn.setAttribute("data-admin-edit-section", "true");
        btn.className = "btn-ghost btn-admin-quick mt-2";
        btn.style.display = "inline-flex";
        btn.href = `${adminPath}#projects`;
        btn.innerHTML = `<i class="bi bi-pencil-square"></i> ${isPt ? 'Gerir / Adicionar Projetos' : 'Manage / Add Projects'}`;
        projHeader.appendChild(btn);
      }
    }
  };

  global.PortfolioData = PortfolioData;
})(typeof window !== "undefined" ? window : this);
