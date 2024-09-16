//Formulario

const form = document.forms.prueba;
const btn = document.querySelector("#submitBtn");
const response = document.querySelector("#response");

//toma cada input del formulario
let nombre = document.querySelector("#name");
let apodo = document.querySelector("#apodo");
let biografia = document.querySelector("#biografia");
let password = document.querySelector("#password");

//toma los campos de error
const nombreError = document.querySelector("#nameError");
const apodoError = document.querySelector("#apodoError");
const biografiaError = document.querySelector("#biografiaError");
const passwordError = document.querySelector("#contrasenaError");

let nombreValidado = false;
let apodoValido = false;
let biografiaValido = false;
let passwordValido = false;

//cuando le da click a cada input, se activa el mensaje, excepto en biografía que solo se activa si empieza a escribir
nombre.addEventListener("click", () => {
  validarNombre();
});
apodo.addEventListener("click", () => {
  validarApodo();
});

validarBiografia();

password.addEventListener("click", () => {
  validarPassword();
});

//Validar que el nombre tenga contenido diferente a espacios
function validarNombre() {
  if (nombre.value.trim() === "") {
    //muestra el mensaje
    nombreValidado = false;
    nombreError.style.display = "block";
    //si solo tiene espacios en blanco o está vacío, retorna que el nombre no es valido
    return false;
  } else {
    //oculta el error
    nombreError.style.display = "none";
    //si tiene contenido, retorna que el nombre es válido
    nombreValidado = true;
    return true;
  }
}

//Validar que el apodo tenga de entre 3 y 10 caracteres alfanuméricos
function validarApodo() {
  const apodoValue = apodo.value.trim();
  if (
    !/^[a-zA-Z0-9]+$/.test(apodoValue) ||
    apodoValue.length < 3 ||
    apodoValue.length > 10
  ) {
    // Muestra el mensaje
    apodoError.style.display = "block";
    apodoValido = false;
    // Retorna que el nombre no es válido
    return false;
  } else {
    // Oculta el error
    apodoError.style.display = "none";
    // Retorna que el nombre es válido
    apodoValido = true;
    return true;
  }
}

function validarBiografia() {
  const bio = biografia.value.trim();
  //Si se activa la biografía y el mensaje es menor a 100
  if (bio && bio.length < 100) {
    //muestra el mensaje de error
    biografiaError.style.display = "block";
    biografiaValido = false;
    //y retorna que la biografía no es válida
    return false;
  } else {
    //ocuta el mensaje y retorna que la biografía es válida
    biografiaError.style.display = "none";
    biografiaValido = true;
    return true;
  }
}

function validarPassword() {
  const pass = password.value;
  //condiciones de la contraseña, una letra mayúscula, un número y 8 caracteres
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  // revisa si la contraseña cumple con los requisitos
  if (!regex.test(pass)) {
    //si no cumple, muestra el mensaje y retorna que la contraseña no es válida
    passwordError.style.display = "block";
    passwordValido = false;
    return false;
  } else {
    //si cumple, oculta el mensaje y retorna que la contraseña es válida
    passwordError.style.display = "none";
    passwordValido = true;
    return true;
  }
}

//Validar el formulario en general y habilitar o no el botón
function validarFormulario() {
  if (nombreValidado && apodoValido && biografiaValido && passwordValido) {
    btn.disabled = false;
  } else {
    btn.disabled = true;
  }
}

//Validar en tiempo real el estado de los input y del formulario (cada que el usuario escribe)
nombre.addEventListener("input", () => {
  validarNombre();
  validarFormulario();
});

apodo.addEventListener("input", () => {
  validarApodo();
  validarFormulario();
});

biografia.addEventListener("input", () => {
  validarBiografia();
  validarFormulario();
});

password.addEventListener("input", () => {
  validarPassword();
  validarFormulario();
});

// Función para guardar el estado del formulario en el localStorage
function saveForm(form) {
  const formData = new FormData(form);
  const formDataObject = {};
  //Recorrer cada entrada del formulario y almacenarla
  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }
  //Almacenaer los datos en el formato JSON
  localStorage.setItem("formData", JSON.stringify(formDataObject));
}

//Función para cargar el formulario
function loadForm(form) {
  const savedData = localStorage.getItem("formData");

  // verificar que 'formData' aún no exista en localStorage
  if (savedData) {
    // Parseamos el JSON para convertirlo en un objeto
    const formDataObject = JSON.parse(savedData);

    // Recorrer cada pareja llave-valor del objeto
    for (const [key, value] of Object.entries(formDataObject)) {
      // Buscar el campo por su nombre
      const formField = form.querySelector(`[name="${key}"]`);

      // Si el campo existe, ae asigna su valor
      if (formField) {
        formField.value = value;
      }
    }
  }
}

// Cargar el formulario
loadForm(form);

//Eventos cuando se acciona el submit
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const url = "https://mocktarget.apigee.net/echo";
  const options = {
    method: "POST", // método HTTP a utilizar
    body: formData,
  };

  // Realizar petición
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      form.reset();
      btn.disabled = true;
      localStorage.removeItem("formData");
      const formattedJson = JSON.stringify(data, null, 2);
      console.log(formattedJson);
      response.innerHTML = "<pre>" + formattedJson + "</pre>"; // Mostrar la respuesta del servidor en el pre
    })
    .catch(console.error);
});
