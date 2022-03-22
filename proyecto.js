let fs = require('fs');
let nombreLectura = 'in 3';
let nombreEscritura = 'out 3'

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
    let timeA;
    let linesA;
    let timeB;
    let linesB;
    let lastline;
    let aaOpt;
    let abOpt;
    let bbOpt;
    let baOpt;
   




    /**
     * Algoritmo
     */


    timeA = 0;
    linesA = [];
    timeB = 0;
    linesB = [];
    

   

    //calculando si se empieza por a:

    for (let i = 0; i < n; i++){

        if(i==0){            
                linesA.push('a');
                timeA += a[i];
                lastline = 'a';                        
        }else{
            //Demás casos:

        if(lastline=='a'){
            //Cuando la ultima linea de ensamblaje fue la a:
            //console.log(lastline=='a');
            aaOpt=a[i-1] + a[i];
            abOpt=a[i-1] + b[i]+ ab[i-1]; 
            if(aaOpt<abOpt){
                linesA.push('a');
                timeA += a[i];
                lastline = 'a';
                //i+=1;
            }else{
                linesA.push('b');
                timeA += b[i] + ab[i-1];
                lastline = 'b';
                //i+=1;
            }
            //console.log(timeA);

        }else{
            //Cuando la ultima linea de ensamblaje fue la b:
            bbOpt=b[i-1] + b[i];
            baOpt=b[i-1] + a[i]+ ba[i-1];  
            if(bbOpt<baOpt){
                linesA.push('b');
                timeA += b[i];
                lastline = 'b';
                //i+=1;
            }else{
                linesA.push('a');
                timeA += a[i] + ba[i-1];
                lastline = 'a';
                //i+=1;
            }
            //console.log(timeA);
        }
        }

        

        
    } 
    //calculando si se empieza por b:
    for (let i = 0; i < n; i++){
        
        if(i==0){            
                linesB.push('b');
                timeB += b[i];
                lastline = 'b';                        
        }else{
            //Demás casos:

        if(lastline=='a'){
            //Cuando la ultima linea de ensamblaje fue la a:
            //console.log(lastline=='a');
            aaOpt=a[i-1] + a[i];
            abOpt=a[i-1] + b[i]+ ab[i-1]; 
            if(aaOpt<abOpt){
                linesB.push('a');
                timeB += a[i];
                lastline = 'a';
                //i+=1;
            }else{
                linesB.push('b');
                timeB += b[i] + ab[i-1];
                lastline = 'b';
                //i+=1;
            }

        }else{
            //Cuando la ultima linea de ensamblaje fue la b:
            bbOpt=b[i-1] + b[i];
            baOpt=b[i-1] + a[i]+ ba[i-1];  
            if(bbOpt<baOpt){
                linesB.push('b');
                timeB += b[i];
                lastline = 'b';
                //i+=1;
            }else{
                linesB.push('a');
                timeB += a[i] + ba[i-1];
                lastline = 'a';
                //i+=1;
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
    

    if(timeA<timeB){
        return createAnswerObject(n, timeA, linesA);
    }else{
        return createAnswerObject(n, timeB, linesB);
    }
    
}
async function main() {
    let { n, a, b, ab, ba } = await input();
    let res = await solve(n, a, b, ab, ba);
    console.log(res);
    await output(res);
}

main();