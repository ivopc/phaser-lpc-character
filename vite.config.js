export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
    // Adicione a opção 'tsc' para configurar o TypeScript
    tsc: 'tsc --skipLibCheck --noEmit',
  },
};