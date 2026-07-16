module.exports = {
  apps: [
    {
      name: "trancongtien-web",
      script: "npm",
      args: "run start",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        PORT: process.env.WEB_PORT || process.env.PORT || "3000",
      },
    },
    {
      name: "trancongtien-mcp",
      script: "node_modules/tsx/dist/cli.mjs",
      args: "mcp/server.ts",
      cwd: __dirname,
      env: {
        NODE_ENV: "production",
        MCP_PORT: process.env.MCP_PORT || "3100",
      },
    },
  ],
};
