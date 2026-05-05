const { Client } = require('ssh2');

const conn = new Client();
const log = (msg) => console.log(`[DEPLOY] ${msg}`);

conn.on('ready', () => {
  log('Client :: ready');
  
  // The commands are joined by '&&' so that it fails fast if something fails.
  const cmd = "cd /var/www/southernspices && git pull origin main && npm run build && pm2 restart southernspices";
  
  log(`Executing: ${cmd}`);
  conn.exec(cmd, { pty: true }, (err, stream) => {
    if (err) {
      console.error(err);
      conn.end();
      return;
    }
    
    stream.on('close', (code, signal) => {
      log(`Command finished with code ${code}`);
      conn.end();
    }).on('data', (data) => {
      process.stdout.write(data.toString());
    }).stderr.on('data', (data) => {
      process.stderr.write(data.toString());
    });
  });

}).on('error', (err) => {
  console.error('[SSH ERROR]:', err.message);
}).on('keyboard-interactive', (name, instructions, instructionsLang, prompts, finish) => {
  console.log('[SSH] Keyboard-interactive auth prompt');
  finish(['Um&d/7YDBBk5k3(a']);
}).connect({
  host: '46.202.195.60',
  port: 22,
  username: 'root',
  password: 'Um&d/7YDBBk5k3(a',
  tryKeyboard: true,
  readyTimeout: 30000,
  debug: console.log
});
