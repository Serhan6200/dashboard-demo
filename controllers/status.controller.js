const { statusService } = require("../services");

exports.getStatus = async (req, res) => {
  const data = await statusService.fetchSystemStatus();
  res.json(data);
};
