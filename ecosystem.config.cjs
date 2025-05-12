module.exports = {
  apps: [
    {
      name: "tourism-reginald-fe",
      script: "npm",
      args: "start",
      exec_mode: "fork",
      instances: 1,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
