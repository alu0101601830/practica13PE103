# Práctica 11: Creación de una aplicación Express para gestionar el registro de Funko Pops
##### Diego Wiederkehr Bruno, alu0101601830  

[![Coverage Status](https://coveralls.io/repos/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101601830/badge.svg?branch=main)](https://coveralls.io/github/ULL-ESIT-INF-DSI-2223/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101601830?branch=main)

### El GitHub Pages se encuentra en el siguiente [link](https://ull-esit-inf-dsi-2223.github.io/ull-esit-inf-dsi-22-23-prct11-http-express-funko-app-alu0101601830/).

## Introducción
En esta práctica debíamos modificar nuestra aplicación de funkos realizada anteriormente para implementarla a través de un servidor Express. Debíamos también utilizar ThunderClient como cliente para realizar peticiones HTTP y ver si realizaba correctamente su funcionamiento.

## Ejercicio I
Para esta práctica he desarrollado todo el código en un mismo fichero, en este caso, servidor.ts.
Primero de todo he creado el servidor y a partir de ahi he ido implementado las funcionalidades de la aplicación.

**Delete**
Para eliminar un funko, he creado que en la url debe ser introducido el user y el id y a partir de eso he llamado al método `deleteFunko` en un objeto `funkoOperation`. Después he hecho un control para ver si la operación se ha podido realizar o no. En caso de que sea exitosa la operación, devuelvo en la respuesta un status de 200 y en caso de que no, envío el código 500 y un error en forma de JSON, esto lo he ido realizando con cada una de las operaciones:
```ts
app.delete('/funkos', (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string;
  const funkoOperation = new FunkoOperations(user);

  const respuesta = funkoOperation.deleteFunko(id, user);
    if ( respuesta === false){
      res.status(500).json({error: 'Error al ejecutar la operación, funko no existe'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
})
```
<p align="center">

*Ejemplo de ejecución con éxito*
</p>

<p align="center">
<img width="803" alt="delete éxito" src="https://user-images.githubusercontent.com/117380181/233631682-7a070b38-3174-4f3c-8b74-f678448852b2.png">
</p>

<p align="center">

*Ejemplo de ejecución sin éxito*
</p>

<p align="center">
<img width="850" alt="delete no éxito" src="https://user-images.githubusercontent.com/117380181/233631714-cbdf4382-13d5-4d61-8f3a-c82aefa22479.png">
</p>

**Patch**
He utilizado `app.patch` para actualizar un funko y lo que hago es que en la url debe introducir el usuario y todos los datos del funko. Introduce todos los datos del funko y para la variable **exclusive** he hecho un if para ver que dato debía introducir y a partir de ahi, crear un nuevo funko y llamar a la operación **funkoOperation.updateFunko** para actualizar el funko correspondiente. A partir de eso manejo la respuesta dependiendo del output y le introduzco el código 500 o 200 según sea correspondiente:
```ts
app.patch('/funkos', (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string;
  const name = req.query.name as string;
  const desc = req.query.desc as string;
  const type = req.query.type as Tipo;
  const genre = req.query.genre as Genero;
  const franchise = req.query.franchise as string;
  const number = parseInt(req.query.number as string);
  const exclusive = parseInt(req.query.exclusive as string);
  const specialCharacter = req.query.specialCharacter as string;
  const value = parseInt(req.query.value as string);

  const funkoOperation = new FunkoOperations(user);

  if (exclusive === 0){
    const newFunko: Funko = {
      id: id,
      nombre: name,
      descripcion: desc,
      tipo: type,
      genero: genre,
      franquicia: franchise,
      numero: number,
      exclusivo: false,
      caracteristicasEspeciales: specialCharacter,
      valorDeMercado: value
    };
    const respuesta = funkoOperation.updateFunko(newFunko, user);
    if ( !respuesta ){
      res.status(500).json({error: 'Error al ejecutar la operación, funko no existente'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }else{
    const newFunko: Funko = {
      id: id,
      nombre: name,
      descripcion: desc,
      tipo: type,
      genero: genre,
      franquicia: franchise,
      numero: number,
      exclusivo: true,
      caracteristicasEspeciales: specialCharacter,
      valorDeMercado: value
    };
    const respuesta = funkoOperation.updateFunko(newFunko, user);
    if ( !respuesta ){
      res.status(500).json({error: 'Error al ejecutar la operación, funko no existente'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }  
});
```
<p align="center">

*Ejemplo de ejecución con éxito*
</p>

<p align="center">
<img width="766" alt="update éxito" src="https://user-images.githubusercontent.com/117380181/233631759-6864da48-707c-4644-b644-f9029c1dca15.png">

</p>

<p align="center">

*Ejemplo de ejecución sin éxito*
</p>

<p align="center">
<img width="871" alt="update no éxito" src="https://user-images.githubusercontent.com/117380181/233631815-4af485e2-f699-4696-a319-047894f1296a.png">
</p>

**Post**
He utilizado post para añadir un funko nuevo, he seguido el mismo procedimiento que en el anterior pero lo único es que llamo al método **funkoOperation.addFunko**:
```ts
app.post('/funkos', (req, res) => {
  const user = req.query.user as string;
  const id = req.query.id as string;
  const name = req.query.name as string;
  const desc = req.query.desc as string;
  const type = req.query.type as Tipo;
  const genre = req.query.genre as Genero;
  const franchise = req.query.franchise as string;
  const number = parseInt(req.query.number as string);
  const exclusive = parseInt(req.query.exclusive as string);
  const specialCharacter = req.query.specialCharacter as string;
  const value = parseInt(req.query.value as string);

  const funkoOperation = new FunkoOperations(user);

  if (exclusive === 0){
    const newFunko: Funko = {
      id: id,
      nombre: name,
      descripcion: desc,
      tipo: type,
      genero: genre,
      franquicia: franchise,
      numero: number,
      exclusivo: false,
      caracteristicasEspeciales: specialCharacter,
      valorDeMercado: value
    };
    const respuesta = funkoOperation.addFunko(newFunko, user);
    if ( !respuesta ){
      res.status(500).json({error: 'Error al ejecutar la operación, funko ya añadido'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }else{
    const newFunko: Funko = {
      id: id,
      nombre: name,
      descripcion: desc,
      tipo: type,
      genero: genre,
      franquicia: franchise,
      numero: number,
      exclusivo: true,
      caracteristicasEspeciales: specialCharacter,
      valorDeMercado: value
    };
    const respuesta = funkoOperation.addFunko(newFunko, user);
    if ( !respuesta ){
      res.status(500).json({error: 'Error al ejecutar la operación, funko ya añadido'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }  
});
```
<p align="center">

*Ejemplo de ejecución con éxito*
</p>

<p align="center">
<img width="758" alt="añadir éxito" src="https://user-images.githubusercontent.com/117380181/233631891-e449b32c-fbfa-41ab-b69c-96cb5d41fdab.png">

</p>

<p align="center">

*Ejemplo de ejecución sin éxito*
</p>

<p align="center">
<img width="862" alt="añadir no éxito" src="https://user-images.githubusercontent.com/117380181/233631920-49f09f09-403f-45c6-aea2-dc501d1f7f3b.png">

</p>

**Get**
Con el método get he adaptado dos funciones, la de enseñar la lista entera de funkos de un usuario o enseñar un funko en concreto. Para eso, he creado dos variables en la url que son user e id. Si el usuario no mete la variable user, le devuelve un error 400 y después me fijo en el id. Si el id no es introducido, devuelvo todos los funkos del usuario, si el id es introducido, devuelvo solo el funko indicado. Después manejo los códigos de respuesta (500 o 200):
```ts
app.get('/funkos', (req, res) =>{
  const user = req.query.user as string;
  const id = req.query.id as string;

  const funkoOperation = new FunkoOperations(user);

  if (!user){
    res.status(400).json({error: 'El parámetro user es obligatorio'});
    return;
  }

  if (!id){
    //Mostrar todos los funkos
    const respuesta = funkoOperation.listFunkos(user);
    if ( respuesta === "Error"){
      res.status(500).json({error: 'Error al ejecutar la operación, funko no encontrado'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }else{
    //Mostrar la info del funko indicado
    const respuesta = funkoOperation.getFunkoById(id, user);
    if ( respuesta === "Error"){
      res.status(500).json({error: 'Error al ejecutar la operación, lista vacía'});
      return;
    }else{
      res.status(200).json({output: respuesta});
    }
  }
});
``` 
<p align="center">

*Ejemplos de ejecución con éxito*
</p>

<p align="center">
<img width="899" alt="list éxito" src="https://user-images.githubusercontent.com/117380181/233631977-2f4079f2-b7f8-4edb-822d-99f256645ffd.png">

</p>

<p align="center">
<img width="917" alt="list funko éxito" src="https://user-images.githubusercontent.com/117380181/233631993-b8738692-7d4a-4738-baf4-e9fab9867d04.png">

</p>

## Tests
Los tests se han realizado con Mocha Chai y sus resultados son los siguientes:
<p align="center">
<img width="647" alt="tests" src="https://user-images.githubusercontent.com/117380181/233632132-bc2d303c-9bab-4aeb-a531-ac6ee01d92fb.png">

</p>

## Conclusión
En esta práctica he expandido mis conocimientos sobre servidores y clientes y como funcionan las peticiones, a parte de saber como manejar las distintas respuestas o los métodos HTTP.
