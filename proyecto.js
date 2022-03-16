let fs = require('fs');
let nombreLectura = 'in';
let nombreEscritura = 'out'

/**
 * Función para leer el archivo bajo el formato establecido en el proyecto. El nombre se cambia en la variable "nombreLectura"
 */
async function input() {
    let line = 0;
    let readData = "";
    const readLine = () => {
        let inputLine = readData[line];
        line++;
        return inputLine;
    }
    return new Promise((resolve, reject) => {
        fs.readFile((nombreLectura + '.txt'), 'utf-8', async (err, data) => {
            if (err) {
                reject(err);
            } else {
                readData = data.split("\n").map(e => e.replace('\r', ''));
                let n = parseInt(readLine());
                let a = readLine().split(" ").map(e => parseInt(e));
                let b = readLine().split(" ").map(e => parseInt(e));
                let ab = readLine().split(" ").map(e => parseInt(e));
                let ba = readLine().split(" ").map(e => parseInt(e));
                obj = { n, a, b, ab, ba };
                resolve(obj);
            }
        });
    });
}
/**
 * Función para escribir sobre el archivo según lo solicitado en el proyecto. El nombre se cambia en la variable "nombreEscritura"
 */
async function output(obj) {
    let out = obj.n + "\n";
    out += obj.time;
    obj.lines.forEach(element => {
        out += "\n" + element;
    });
    return new Promise((resolve, reject) => {
        fs.writeFile(nombreEscritura + '.txt', out, (err, list) => {
            if (err) reject(err);
            resolve(true);
        });
    });
}
const createAnswerObject = (n, time, lines) => {
    let res = { n, time, lines };
    return res;
}
/**
 * Función donde deben introducir la lógica de su algoritmo. Pueden declarar variables globales si
 * lo consideran conveniente. Se adjunta la forma en la que deben retornar la respuesta en el método "createAnswerObject"
 */
async function solve(n, a, b, ab, ba) {
    /**
     * Declaración de variables para la salida del algoritmo (No modificar)
     */
    let time;
    let lines;
    let lastline;
    let aaOpt;
    let abOpt;
    let bbOpt;
    let baOpt;




    /**
     * Algoritmo
     */


    time = 0;
    lines = [];
    
    for (let step = 0; step < n; step++){
        //Caso base, para empezar por a o por b:
        if(step==0){
            if (a[step]>b[step]) {
                lines.push('b');
                time += b[step];
                lastline = 'b';
                //step+=1;
            }else{
                lines.push('a');
                time += a[step];
                lastline = 'a';
                //step+=1;            
            } 
        }else{
            //Demás casos:

        if(lastline=='a'){
            //Cuando la ultima linea de ensamblaje fue la a:
            //console.log(lastline=='a');
            aaOpt=a[step-1] + a[step];
            abOpt=a[step-1] + b[step]+ ab[step-1]; 
            if(aaOpt<abOpt){
                lines.push('a');
                time += a[step];
                lastline = 'a';
                //step+=1;
            }else{
                lines.push('b');
                time += b[step] + ab[step-1];
                lastline = 'b';
                //step+=1;
            }

        }else{
            //Cuando la ultima linea de ensamblaje fue la b:
            bbOpt=b[step-1] + b[step];
            baOpt=b[step-1] + a[step]+ ba[step-1];  
            if(bbOpt<baOpt){
                lines.push('b');
                time += b[step];
                lastline = 'b';
                //step+=1;
            }else{
                lines.push('a');
                time += a[step] + ba[step-1];
                lastline = 'a';
                //step+=1;
            }
        }
        }

        

        
    }  


    /**
     * Fin del algoritmo
     */




    /**
     * Salida del algoritmo (No modificar)
     */
    return createAnswerObject(n, time, lines);
}
async function main() {
    let { n, a, b, ab, ba } = await input();
    let res = await solve(n, a, b, ab, ba);
    console.log(res);
    await output(res);
}

main();