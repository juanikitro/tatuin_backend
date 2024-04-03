import { MariaDb } from '../database/mariadb';

MariaDb
    .initialize()
    .then(() => {

    })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })

export default MariaDb;
