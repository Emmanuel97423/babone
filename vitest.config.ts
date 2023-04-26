import { defineConfig } from 'vitest/config';
// import path from 'path';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['__tests__/setupTests.ts'],
    coverage:{
        provider: 'istanbul',
        all: true,
    },
    env:{
      IS_REACT_ACT_ENVIRONMENTS: 'true',
    },
  
  },
  // test: {
  //   globals:true,
  //   environment:"jsdom",
  //   setupFiles: [
  //       path.resolve(__dirname, '__tests__/setupTests.ts'),
  //   ],
  //   include: ['__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
  //   coverage:{
  //       provider: 'c8',
  //       all: true,
  //   }
    
  // },
})