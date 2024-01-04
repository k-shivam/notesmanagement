const cluster = require('cluster');
const os = require('os');

function setupCluster(appCallback) {
    if (cluster.isMaster) {
        console.log(`Master ${process.pid} is running`);

        const numCPUs = os.cpus().length;

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`Worker ${worker.process.pid} died. Restarting...`);
            cluster.fork();
        });
    } else {
        appCallback();
    }
}

module.exports = setupCluster;
