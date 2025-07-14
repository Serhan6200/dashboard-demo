const express = require('express');
const cors = require('cors');
const config = require('./config/config');

const app = express();

app.use(cors());
app.get('/api/status', (req,res)=>{
    res.send("Hello World...")
});


app.listen(config.port, () => {
  console.log(`✅ Server running on http://localhost:${config.port} [${config.nodeEnv}]`);
});