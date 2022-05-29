const app = require('./app')
const port = process.env.PORT || 5000
const chalk = require('chalk');

app.listen(port, () => console.log(chalk.green(`Server has been started on ${chalk.magenta(port)}`)))

