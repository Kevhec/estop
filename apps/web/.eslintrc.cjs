module.exports = {
  extends: ['@estop/eslint-config/react'],
  parserOptions: {
    project: ['./tsconfig.app.json'],     // ✅ Local to apps/web
    tsconfigRootDir: __dirname,       // ✅ Ensures proper path resolution
  },
};
