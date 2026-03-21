import type { ResumeModel } from '../../types/resumeBuilder/resume';

export const mockResumeEs: ResumeModel = {
  metadata: {
    template: 'modern',
    theme: {
      primaryColor: '#2563eb',
      secondaryColor: '#1e40af',
      fontFamily: 'Inter, sans-serif'
    }
  },
  personalInfo: {
    fullName: "Juan Pérez",
    title: "Ingeniero de Software Senior",
    email: "juan.perez@ejemplo.com",
    phone: "+34 912 345 678",
    linkedin: "https://www.linkedin.com/in/juanperez/",
    location: "Madrid, España"
  },
  summary: [
    "Más de 10 años de experiencia técnica transformando datos en sistemas distribuidos.",
    "Bilingüe y altamente motivado para escalar arquitecturas críticas."
  ],
  skills: [
    {
      category: "Frontend",
      items: "React, Vue, TypeScript, Tailwind"
    },
    {
      category: "Backend",
      items: "Node.js, Python, PostgreSQL, AWS"
    }
  ],
  experience: [
    {
      company: "Tech Corp Internacional",
      role: "Líder Técnico",
      dates: "2020 - Presente",
      points: [
        "Lideró la migración del monolito a microservicios reduciendo costos en un 40%.",
        "Implementó arquitecturas de alta disponibilidad."
      ]
    }
  ],
  education: [
    {
      degree: "Máster en Ciencias de la Computación",
      institution: "Universidad Politécnica de Madrid",
      dates: "2015 - 2017"
    }
  ]
};
