import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
const app = express();
const __dirname = join(dirname(fileURLToPath(import.meta.url)), '../public');
app.use(express.static(__dirname));
app.get('/execmd', (req, res) => {
    const cmd = req.query.cmd;
    if (!cmd) {
        res.status(400).json({ error: 'El parámetro cmd es obligatorio' });
        return;
    }
    const args = req.query.args;
    const command = args ? `${cmd} ${args}` : cmd;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            res.status(500).json({ error: `Error al ejecutar el comando: ${error.message}` });
            return;
        }
        if (stderr) {
            res.status(500).json({ error: `Error al ejecutar el comando: ${stderr}` });
            return;
        }
        res.status(200).json({ output: stdout });
    });
});
// Ruta por defecto que devuelve un error 404
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});
app.listen(3000, () => {
    console.log('Server is up on port 3000');
    console.log('http://localhost:3000');
});
export default app;
/**
 * Para probar:
 * http://localhost:3000/execmd?cmd=ls&args=-l
 * http://localhost:3000/execmd?cmd=ls
 * http://localhost:3000/index
 * http://localhost:3000/execmd
 */ 
