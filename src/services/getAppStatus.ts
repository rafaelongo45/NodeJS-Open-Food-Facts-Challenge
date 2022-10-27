function appStatus() {
  const uptime = Math.floor(process.uptime());
  const memoryUsage = process.memoryUsage();
  const appInfo = {
    uptime: `Application has been running for ${uptime} seconds.`,
    memoryUsage,
  };
  return appInfo;
}

export default appStatus;
