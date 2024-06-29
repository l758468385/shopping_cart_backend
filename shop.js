const express = require('express');
const app = express();
const port = 3323;
const fs = require('fs');
const cors = require('cors');

app.use(cors()); // 启用所有来源的 CORS
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});


app.use(express.json());



// 获取商品列表
app.get('/products', (req, res) => {

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (error) {
      console.error('Error parsing JSON data', error);
      res.status(500).json({ error: 'Error parsing JSON data' });
    }
  });
});

app.listen(port, () => {
  console.log(`服务器正在运行在 http://localhost:${port}`);
});


