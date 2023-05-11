import * as fs from 'fs';
import chalk from 'chalk';
/**
 * Clase para todas las operaciones que se pueden realizar con los funkos
 * @class
 */
export class FunkoOperations {
    funkos = [];
    userDirectory;
    /**
     * Constructor de la clase FunkoOperations
     * @param username - nombre del usuario que está utilizando las acciones
     */
    constructor(username) {
        this.userDirectory = `./users/${username}`;
        this.loadFunkos();
    }
    /**
     * Función para añadir un Funko al usuario
     * @param funko - Funko a añadir
     * @param username - Nombre del usuario
     */
    addFunko(funko, username) {
        const existingFunko = this.findFunko(funko.id);
        if (existingFunko) {
            return false;
        }
        else {
            this.funkos.push(funko);
            this.saveFunko(funko);
            return true;
        }
    }
    /**
     * Actualiza la información de un Funko introducido
     * @param updatedFunko - Funko con la información actualizada
     * @param username - nombre del usuario
     */
    updateFunko(updatedFunko, username) {
        const index = this.funkos.findIndex(funko => funko.id === updatedFunko.id);
        if (index !== -1) {
            this.funkos[index] = updatedFunko;
            this.saveFunko(updatedFunko);
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Elimina un Funko introducido por el usuario
     * @param id - id del Funko que se quiere eliminar
     * @param username - nombre del usuario
     */
    deleteFunko(id, username) {
        const index = this.funkos.findIndex(funko => funko.id === id);
        if (index !== -1) {
            this.funkos.splice(index, 1);
            this.deleteFunkoFile(id);
            return true;
        }
        else {
            return false;
        }
    }
    /**
     * Función que comprueba si existe un Funko
     * @param funkoId - id del Funko para comprobar su existencia
     * @returns Devuelve el Funko en caso de encontrarlo u undefined en caso de que no exista
     */
    findFunko(funkoId) {
        return this.funkos.find((funko) => funko.id === funkoId);
    }
    /**
     * Función para listar todos los Funkos de un usuario
     * @param username - nombre del usuario
     * @returns Devuelve la información de todos los Funkos del usuario
     */
    listFunkos(username) {
        if (this.funkos.length === 0) {
            console.log(chalk.red(`No Funkos in the list of ${username}`));
            return "Error";
        }
        let result = `----------------------------------\n` +
            `${username} Funko Pop Collection\n`;
        for (const funko of this.funkos) {
            result += this.toString(funko);
        }
        return result;
    }
    /**
     * Imprime la información de un Funko con su id
     * @param id - id del Funko a mostrar
     * @param username - nombre del usuario
     * @returns returnea para hacer un break en caso de que no encuentre el Funko
     */
    getFunkoById(id, username) {
        const funko = this.funkos.find(f => f.id === id);
        if (!funko) {
            return "Error";
        }
        return this.toString(funko);
    }
    toString(funko) {
        return '-----------------------\n' +
            `ID: ${funko.id}\n` +
            `Name: ${funko.nombre}\n` +
            `Description: ${funko.descripcion}\n` +
            `Type: ${funko.tipo}\n` +
            `Genre: ${funko.genero}\n` +
            `Franchise: ${funko.franquicia}\n` +
            `Number: ${funko.numero}\n` +
            `Exclusive: ${funko.exclusivo}\n` +
            `Special Features: ${funko.caracteristicasEspeciales}\n` +
            `Merch value: ` + this.getMarketValueColor(funko.valorDeMercado)(`${funko.valorDeMercado}\n`);
    }
    /**
     * Función que imprime la información con detalles de un Funko
     * @param funko - Funko que hay que imprimir la información
     */
    printFunkoInfo(funko) {
        console.log(chalk.blue(`----------------------------------`));
        console.log(chalk.green(`ID: ${funko.id}`));
        console.log(chalk.green(`Name: ${funko.nombre}`));
        console.log(chalk.green(`Description: ${funko.descripcion}`));
        console.log(chalk.green(`Type: ${funko.tipo}`));
        console.log(chalk.green(`Genre: ${funko.genero}`));
        console.log(chalk.green(`Franchise: ${funko.franquicia}`));
        console.log(chalk.green(`Number: ${funko.numero}`));
        console.log(chalk.green(`Exclusive: ${funko.exclusivo}`));
        console.log(chalk.green(`Special Features: ${funko.caracteristicasEspeciales}`));
        console.log(chalk.green(`Merch value: `) + this.getMarketValueColor(funko.valorDeMercado)(`${funko.valorDeMercado}`));
    }
    /**
     * Función para devolver el color del chalk en función del precio de un Funko
     * @param value - Valor del Funko
     * @returns El color correspondiente dependiendo de su valor
     */
    getMarketValueColor(value) {
        if (value < 20) {
            return chalk.red;
        }
        else if (value >= 20 && value < 30) {
            return chalk.blue;
        }
        else if (value >= 30 && value < 50) {
            return chalk.yellow;
        }
        else {
            return chalk.green;
        }
    }
    /**
     * Función que carga todos los archivos JSON de los Funkos del directorio de usuario en
     * this.userDirectory, los lee y los analiza en objetos Funko
     */
    loadFunkos() {
        if (!fs.existsSync(this.userDirectory)) {
            fs.mkdirSync(this.userDirectory);
        }
        const files = fs.readdirSync(this.userDirectory);
        files.forEach((file) => {
            const content = fs.readFileSync(`${this.userDirectory}/${file}`, 'utf-8');
            const funko = JSON.parse(content);
            this.funkos.push(funko);
        });
    }
    /**
     * Función que recibe un objeto Funko y lo guarda como un archivo JSON en el
     * directorio de usuario en this.userDirectory. El archivo se nombra con el id del Funko
     * @param funko
     */
    saveFunko(funko) {
        const filePath = `${this.userDirectory}/${funko.id}.json`;
        const content = JSON.stringify(funko);
        fs.writeFileSync(filePath, content);
    }
    /**
     * Función que elimina el archivo JSON asociado al Funko con el id dado en el
     * directorio de usuario en this.userDirectory. Si no existe un archivo con ese id, la función no hace nada
     * @param funkoId
     */
    deleteFunkoFile(funkoId) {
        const filePath = `${this.userDirectory}/${funkoId}.json`;
        fs.unlinkSync(filePath);
    }
}
