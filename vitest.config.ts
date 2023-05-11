import { defineConfig } from 'vitest/config';
import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~': path.resolve(__dirname, 'public'),
    },
  },
    test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['__tests__/setupTests.ts',"whatwg-fetch"],
    coverage:{
        provider: 'istanbul',
        all: true,
    },
    env:{
      IS_REACT_ACT_ENVIRONMENTS: 'true',
    },
   
   
  
  },
})