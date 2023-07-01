import { MariaDb } from '../database/data-source';

MariaDb
    .initialize()
    .then(() => {

    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })

export default MariaDb;
