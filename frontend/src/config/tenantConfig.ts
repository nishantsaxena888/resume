export const tenantConfigs: Record<string, { availableTemplates: { id: string, name: string }[], defaultTemplate: string }> = {
  default: {
    availableTemplates: [
      { id: 'classic', name: 'Classic Corporate' },
      { id: 'modern', name: 'Modern Minimalist' }
    ],
    defaultTemplate: 'classic'
  },
  vighneshwaraya: {
    // Vighneshwaraya ONLY allows the strict classic A4 resume format
    availableTemplates: [
      { id: 'classic', name: 'Vighneshwaraya Approved format (Classic)' }
    ],
    defaultTemplate: 'classic'
  }
};
