//Ejercicio 1

const myfun = (ms) => {
    return new promise((resolves, rejects) => {
        setTimeout(() => {
            if (ms % 2 == 0) { resolves(); }
            else { rejects(); }
        }, ms);
    })
}

//Ejercicio 2
class persona {
    constructor(nombre, edad) {
        this.nombre = nombre;
        this.edad = edad;
    }

    setSister(sister) {
        this.sister = sister;
    }

    printSisterName() {
        console.log(this.sister.nombre);

    }
}

const gonza = new persona('gonza', 25)

const fabiana = new persona('fabiana', 20)

gonza.setSister(fabiana);
gonza.printSisterName();



//ejercicio 3
// largo del string
const carBrands = ['Audi', 'Nisan', 'Volvo']
const autos = carBrands.map(largo => largo.length)
console.log(autos);

// nombres con comas
const comas = carBrands.reduce((str, brand) => {
    if (str !== '') { return str + ', ' + brand }
    else { brand }
});
console.log(comas);

// la marca de menor tamaño
// const corta = carBrands.reduce((str, brand) => {
//     if (str.length > brand.length) {
//         return brand;
//     }
//     else { str; }
// }, 'la marca mas larga')
// console.log(corta);

//deberia contar la cantidad de a o A de cada palabra
const ases = carBrands.map((brand) => {
    let f = 0;
    for (i = 0; i <= brand.length; i++) {
        if (brand[i] == 'a' || brand[i] == 'A') { f++ };
        return f
    }
});
console.log(ases);

//nose :V
const ej2 = carBrands.reduce((obj, brand, i) => {
    return {
        ...obj,
        [brand]: i,
    }
});
console.log(ej2);

// ejercicio 4
const valores = [4, 5, 28, 1, 0];

//estas dos suman todos los numeros de la array
const sumatoria = valores.reduce((acumulador, valorActual) => {
    return acumulador + valorActual
}, 0);
console.log(sumatoria);

var suma = 0
for (var i = 0; i < valores.length; i++) {
    suma += valores[i]
}
console.log(suma);

//ejercicio 5
const frutas = [
    { name: 'Uva', color: 'Violeta' },
    { name: 'Pera', color: 'Amarillo' },
    { name: 'Manzana', color: 'Rojo' },
    { name: 'Banana', color: 'Amarillo' },
];

//separa las frutas por color
const colores = frutas.reduce((a, v) => {
    if (!a[v.color]) {
        a[v.color] = [v.name];
        return a;
    }
    a[v.color].push(v.name);
    return a;
});
console.log(colores);



