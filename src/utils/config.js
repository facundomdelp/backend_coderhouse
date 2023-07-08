import dotenv from 'dotenv';
import { Command } from 'commander';

const program = new Command();
program
  .version('2.0.1')
  .option('-p --port <port>', 'Execution port', 3000)
  .option('-m --mode <mode>', 'Execution mode (PRODUCTION / DEVELOPMENT)', 'DEVELOPMENT')
  .option('-d --debug', 'Activate / deactivate debug', false)
  .parse(process.argv);
const cl_options = program.opts();

// Por el momento, el entorno de development y de producción es el mismo
dotenv.config({ path: cl_options.mode == 'DEVEL' ? './.env.development' : './.env.production' });

const config = {
  PORT: process.env.PORT,
  WS_PORT: process.env.WS_PORT,
  MONGOOSE_URL: process.env.MONGOOSE_URL,
  SESSION_SECRET: process.env.SESSION_SECRET,
  PERSISTENCE: process.env.PERSISTENCE
};

export default config;
