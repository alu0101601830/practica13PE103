import express from 'express';
import { exec } from 'child_process';
const app = express();
const port = 3000;
app.get('/execmd', (req, res) => {
    const cmd = req.query.cmd;
    const args = req.query.args;
    if (!cmd) {
        res.status(400).json({ error: 'El parámetro "cmd" es obligatorio.' });
        return;
    }
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
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no válida.' });
});
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
