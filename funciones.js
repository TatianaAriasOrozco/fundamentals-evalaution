//Función interactuarCadenas

//Función para verificar que las cadenas solamente contengan los caracterees "+" y "-"
function verificarCaracteres(cadena) {
  for (let char of cadena) {
    if (char !== "+" && char !== "-") {
      throw new Error(
        "Las cadenas solo deben contener los caracteres '+' y '-'"
      );
    }
  }
}

function interactuarCadenas(cadena1, cadena2) {
  //Verificar validez de las cadenas
  try {
    verificarCaracteres(cadena1);
    verificarCaracteres(cadena2);
  } catch (error) {
    throw error;
  }

  //Verificar la longitud de las cadenas
  if (cadena1.length !== cadena2.length)
    throw new Error("Las cadenas deben tener la misma longitud");

  //Variable para almacenar la neueva cadena
  let result = [];

  //Recorrer todas los caracteres de las cadenas para compararlos y agregar el resultado a la cadena final
  for (let i = 0; i < cadena1.length; i++) {
    let c1 = cadena1[i];
    let c2 = cadena2[i];

    if (c1 === "+" && c2 === "+") {
      result.push("+");
    } else if (c1 === "-" && c2 === "-") {
      result.push("-");
    } else {
      result.push("0");
    }
  }

  //Retornar el valor en una sola cadena
  return result.join("");
}

//Función generarApodo

//Función para verificar si la posición 3 es vocal
function esVocal(letra) {
  // Lista de vocales
  const vocales = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
  //retorna true o false
  return vocales.includes(letra);
}

function generarApodo(nombre) {
  if (nombre.length < 4) throw new Error("Nombre muy corto");

  if (/^[A-Za-z]+$/.test(nombre)) {
    //Validar si el tercer caracter del nombre es vocal y retornar el nombre con 4 letras si lo es, o con 3 si no lo es
    if (esVocal(nombre[2])) {
      return nombre.slice(0, 4);
    } else {
      return nombre.slice(0, 3);
    }
  } else {
    throw new Error("El nombre solo debe contener letras");
  }
}

//Función obtenerMarcador

function obtenerMarcador(texto) {
  //Asignar el valor numérico a su nombre en texto
  const numeros = {
    cero: 0,
    uno: 1,
    dos: 2,
    tres: 3,
    cuatro: 4,
    cinco: 5,
    seis: 6,
    siete: 7,
    ocho: 8,
    nueve: 9,
  };

  // Dividir el texto en palabras
  const palabras = texto.split(/\s+/);

  //Variable para almacenar los resultados
  let marcador = [];

  // Recorrer las palabras y buscar coincidencias en el objeto numeros
  for (const palabra of palabras) {
    // Comparar cada palabra con las propiedades del objeto numeros
    if (palabra in numeros) {
      marcador.push(numeros[palabra]);
      if (marcador.length === 2) {
        break; // Si ya tenemos dos números, podemos detenernos
      }
    }
  }

  // Si no se encuentran números, restornar [0, 0]
  return marcador.length === 2 ? marcador : [0, 0];
}

//Ejercicio de clases

class Barco {
  //Crear la función constructora
  constructor(calado, tripulacion) {
    this.calado = calado;
    this.tripulacion = tripulacion;
  }

  //Crear el métoco para saber si el barco vale la pena ser saqueado o no
  valeLaPena() {
    // Calcular el nuevo valor del calado, al restarle 1.5 unidades por cada miembro de la tripulación
    const nuevoCalado = this.calado - this.tripulacion * 1.5;
    // Si el calado ajustado es mayor a 20 unidades, el barco vale la pena ser saqueado
    return nuevoCalado > 20;
  }
}

//Ejercicio de diagramas número 4
class Persona {
  constructor(nombre) {
    this.nombre = nombre;
  }

  presentarse() {
    return `Hola, mi nombre es ${this.nombre}`;
  }
}

class Mago extends Persona {
  constructor(nombre, casa) {
    super(nombre);
    this.casa = casa;
  }

  invocarHechizo() {
    return `${this.nombre} invoca un hechizo`;
  }
}

const petunia = new Persona("Petunia");
const harry = new Mago("Harry", "Gryffindor");
