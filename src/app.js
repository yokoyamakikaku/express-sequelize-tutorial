const express = require('express');
const port = 3000
const errorHandler = require('./middlewares/errorHandler');
const sequelize = require('./services/sequelize');

const app = express()

app.use(express.json());
app.use('/', require('./routers/root'));
app.use('/users', require('./routers/users'));

app.use(errorHandler);

sequelize.sync({ force: true }).then(() => {
  console.log('データベースの同期が完了しました');
});

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
