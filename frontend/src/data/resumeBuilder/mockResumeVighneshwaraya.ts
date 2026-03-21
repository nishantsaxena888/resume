import type { ResumeModel } from '../../types/resumeBuilder/resume';

export const mockResumeVighneshwaraya: ResumeModel = {
  metadata: {
    template: 'classic', // Vighneshwaraya ONLY allows Classic format
    theme: {
      primaryColor: '#0f172a',
      fontFamily: 'Roboto, sans-serif'
    }
  },
  personalInfo: {
    fullName: "Nishant Saxena (Vighneshwaraya Format)",
    title: "L5 Software Engineer Candidate",
    email: "nishant.saxena@example.com",
    phone: "(848)-345-0433",
    linkedin: "https://www.linkedin.com/in/nishant-saxena-74aa04a2/",
    location: "Mountain View, CA"
  },
  summary: [
    "Experienced software engineer with a strong background in distributed systems.",
    "Proven track record of delivering scalable enterprise solutions."
  ],
  skills: [
    {
      category: "Languages & Frameworks",
      items: "TypeScript, Python, React, Go"
    },
    {
      category: "Infrastructure",
      items: "Kubernetes, GCP, Cloud Spanner"
    }
  ],
  experience: [
    {
      company: "Previous Tech Giant",
      role: "Senior Engineer",
      dates: "2021 - Present",
      points: [
        "Architected a globally distributed caching layer.",
        "Mentored 5 junior engineers and led key technical design documents."
      ]
    }
  ],
  education: [
    {
      degree: "B.S. Computer Science",
      institution: "Top University",
      dates: "2010 - 2014"
    }
  ]
};
