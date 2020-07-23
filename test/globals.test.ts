if (process.env.NODE_ENV !== 'test') {
  console.log('WARNING !!! - NODE_ENV is not test environment');
  process.exit();
}
if (process.env.POSTGRES_HOST && process.env.POSTGRES_HOST.indexOf('.') > -1) {
  console.log('WARNING !!! - POSTGRES_HOST must not be an ip address');
  process.exit();
}

const { spawn } = require('child_process');

const dbUp = async () => {
  await new Promise((resolve) => {
    const createDbs = spawn('npm', ['run', 'db-utils', 'create']);
    createDbs.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    createDbs.stderr.on('data', (data) => {
      console.error(`Create DB Error: ${data}`);
    });
    createDbs.on('close', (code, signal) => {
      resolve();
    });
  });
  await new Promise((resolve, reject) => {
    let err = false;
    const migrateUp = spawn('npm', ['run', 'db-utils', 'migrate']);
    migrateUp.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    migrateUp.stderr.on('data', (data) => {
      console.error(`${data}`);
      err = true;
    });
    migrateUp.on('close', (code, signal) => {
      if (err) {
        return reject('There was an error in migration up');
      }
      resolve();
    });
  });
};

const dbDown = async () => {
  await new Promise((resolve) => {
    const cleanDb = spawn('npm', ['run', 'db-utils', 'clean']);
    cleanDb.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    cleanDb.on('close', (code, signal) => {
      resolve();
    });
  });
};

const seedUp = async () => {
  await new Promise((resolve, reject) => {
    let err = false;
    const seed = spawn('npm', ['run', 'db-utils', 'seed']);
    seed.stdout.on('data', (data) => {
      console.log(data.toString());
    });
    seed.stderr.on('data', (data) => {
      console.error(`${data}`);
      err = true;
    });
    seed.on('close', (code, signal) => {
      if (err) {
        return reject('There was an error in migration up');
      }
      resolve();
    });
  });
};

before(async () => {
  console.log('Before All - Creating Db .....');
  console.log('Please wait while the test databases are created .....');
  await dbDown();
  await dbUp();
  await seedUp();
  console.log('Before All - Finished');
});

after(async () => {
  console.log('After All - Clean up .....');
  console.log('Please wait until everything in cleaned up .....');
  await new Promise((resolve) => setTimeout(resolve, 10000));
  await dbDown();
  console.log('After All - Finished');
});
