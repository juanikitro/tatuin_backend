import { MariaDb } from '../configs/mariadb'

MariaDb.initialize()
    .then(() => { })
    .catch((err) => {
        console.error('Error during Data Source initialization:', err)
    })

export default MariaDb
