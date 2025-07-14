const os = require("os");
const osu = require("os-utils");
const disk = require("diskusage");
const ApiError = require("../utils/ApiError");

exports.fetchSystemStatus = () => {
  return new Promise((resolve, reject) => {
    try {
      const totalMem = os.totalmem() / (1024 * 1024); // MB
      const freeMem = os.freemem() / (1024 * 1024); // MB
      const usedMem = totalMem - freeMem;

      const uptime = os.uptime(); // saniye
      const loadAvg = os.loadavg();

      disk.check("/", (err, info) => {
        if (err || !info) {
          return reject(new ApiError(503, "Disk bilgisi alınamadı"));
        }

        const diskTotal = info.total / (1024 * 1024 * 1024); // GB
        const diskFree = info.available / (1024 * 1024 * 1024); // GB
        const diskUsed = diskTotal - diskFree;

        osu.cpuUsage((cpuPercent) => {
          if (cpuPercent == null) {
            return reject(new ApiError(500, "CPU bilgisi alınamadı"));
          }

          resolve({
            time: new Date().toLocaleString(),
            memory: {
              total: totalMem.toFixed(2),
              used: usedMem.toFixed(2),
              free: freeMem.toFixed(2),
            },
            cpu: {
              usage: (cpuPercent * 100).toFixed(2),
              loadAverage: {
                "1min": loadAvg[0].toFixed(2),
                "5min": loadAvg[1].toFixed(2),
                "15min": loadAvg[2].toFixed(2),
              },
            },
            uptime: formatUptime(uptime),
            disk: {
              total: diskTotal.toFixed(2),
              used: diskUsed.toFixed(2),
              free: diskFree.toFixed(2),
            },
          });
        });
      });
    } catch (error) {
      reject(new ApiError(500, "Sistem durumu alınamadı"));
    }
  });
};

function formatUptime(seconds) {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}g ${h}s ${m}d ${s}s`;
}
