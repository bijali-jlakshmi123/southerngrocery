const { Client } = require('ssh2');

const conn = new Client();
const log = (msg) => console.log(`[DEPLOY] ${msg}`);

conn.on('ready', () => {
  log('Client :: ready');
  
  const commands = [
    'cd /var/www/southernspices',
    'git pull origin main',
    'npm install',
    'npm run build',
    'pm2 restart southernspices'
  ];
  
  const executeCommand = (cmd) => {
    return new Promise((resolve, reject) => {
      log(`Executing: ${cmd}`);
      conn.exec(cmd, (err, stream) => {
        if (err) return reject(err);
        
        let output = '';
        let errorOutput = '';
        
        stream.on('close', (code, signal) => {
          log(`Command finished with code ${code}`);
          if (code !== 0) {
            log(`Error Output: ${errorOutput}`);
            reject(new Error(`Command failed with code ${code}`));
          } else {
            resolve(output);
          }
        }).on('data', (data) => {
          process.stdout.write(data);
          output += data;
        }).stderr.on('data', (data) => {
          process.stderr.write(data);
          errorOutput += data;
        });
      });
    });
  };

  const runAll = async () => {
    try {
      for (const cmd of commands) {
        await executeCommand(cmd);
      }
      log('Deployment successful!');
      conn.end();
    } catch (e) {
      log(`Deployment failed: ${e.message}`);
      conn.end();
    }
  };

  runAll();

}).on('error', (err) => {
  console.error('[SSH ERROR]:', err.message);
}).connect({
  host: '46.202.195.60',
  port: 22,
  username: 'root',
  password: 'Um&d/7YDBBk5k3(a',
  readyTimeout: 20000
});
