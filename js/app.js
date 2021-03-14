//* Events //

document.querySelector("#botonCrearNota").addEventListener("click", () => {
  borrarCampos();
  $("#mostrarModal").modal("show");
});

document.querySelector("#guardarCambios").addEventListener("click", createNote);

const lista = document.querySelector("#listaNotas");
lista.addEventListener("click", borrado);
lista.addEventListener("click", editar);

document.addEventListener("DOMContentLoaded", loadNotes);

// * variables globales //
var editar = false;
var id ="";
// * functions //
function borrado(e) {
  const item = e.target;
  if (item.id == "botonBorrado") {
    const padre = item.parentNode;
    const id = item.parentNode.parentNode.id;
    $.ajax({
      type: "post",
      url: "php/deleteNote.php",
      data: "id=" + id,
      dataType: "json",
      success: function (oDatos, sStatus, oXHR) {
        if (oDatos.error) alert(oDatos.mensaje);
        else alert(oDatos.mensaje);
      },
    });
    padre.parentNode.remove();
  }
}

function editar(e) {
  editar = true;
  const item = e.target;
  if (item.id == "botonEdit") {
    let titulo = item.parentNode.parentNode.querySelector(".card-header").textContent;
    let contenido = item.parentNode.querySelector("p").textContent;
    id = item.parentNode.parentNode.id;

    document.querySelector("#campoTitulo").value = titulo;
    document.querySelector("#campoContenido").value = contenido;

    $("#mostrarModal").modal("show");
  }
}

function borrarCampos() {
  document.querySelector("#campoTitulo").value = "";
  document.querySelector("#campoContenido").value = "";
}

function generateNote(id, titulo, contenido) {
  const divPadre = document.createElement("div");
  divPadre.className = "card ";
  divPadre.id = id;

  const divHeader = document.createElement("div");
  divHeader.className = "card-header";

  const divBody = document.createElement("div");
  divBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";

  const buttonDelete = document.createElement("button");
  buttonDelete.className = "btn btn-danger";
  buttonDelete.id = "botonBorrado";

  const buttonEdit = document.createElement("button");
  buttonEdit.className = "btn btn-info ";
  buttonEdit.id = "botonEdit";

  const iconoBorrado = document.createElement("i");
  iconoBorrado.className = "fas fa-trash";

  const iconoEdit = document.createElement("i");
  iconoEdit.className = "fas fa-edit";

  const cardText = document.createElement("p");
  cardText.className = "card-text";

  divPadre.appendChild(divHeader);
  divPadre.appendChild(divBody);
  divBody.appendChild(cardTitle);
  divBody.appendChild(cardText);
  divBody.appendChild(buttonDelete);
  divBody.appendChild(buttonEdit);
  buttonDelete.appendChild(iconoBorrado);
  buttonEdit.appendChild(iconoEdit);

  buttonDelete.setAttribute("type", "button");

  document.getElementById("listaNotas").appendChild(divPadre);

  divHeader.innerHTML = titulo;
  //cardTitle.innerHTML = nota.categoria;
  cardText.innerHTML = contenido;
}

function createNoteJson(oDatos, sStatus, oXHR) {
  console.log(oDatos);
  oDatos.forEach((element) => {
    generateNote(element.id, element.titulo, element.contenido);
  });
}

function createNote() {
  let titulo = document.querySelector("#campoTitulo").value;
  let contenido = document.querySelector("#campoContenido").value;

  if (!editar) {
    let datos = "titulo=" + titulo + "&" + "contenido=" + contenido;

    $.ajax({
      type: "post",
      url: "../php/createNote.php",
      data: datos,
      dataType: "json",
      success: function (oDatos, sStatus, oXHR) {
        if (oDatos.error == 0) {
          alert(oDatos.mensaje);
          generateNote(oDatos.id, titulo, contenido);
        } else {
          alert(oDatos.mensaje);
        }
      },
    });
    borrarCampos();
    $("#mostrarModal").modal("hide");
  } else {
    let datos = "titulo=" + titulo + "&" + "contenido=" + contenido + "&" + "id=" + id;
    $.ajax({
        type: "post",
        url: "php/updateNote.php",
        data: datos,
        dataType: "json",
        success: function (oDatos, sStatus, oXHR) {
          if (oDatos.error == 0) 
            alert(oDatos.mensaje);
           else 
            alert(oDatos.mensaje);
          
        },
      });

    editar = false;
    borrarCampos();
    location.reload();
    $("#mostrarModal").modal("hide");
  }
}

function loadNotes() {
  $.ajax({
    type: "get",
    url: "php/getNotes.php",
    dataType: "json",
    success: createNoteJson,
    error: function () {
      alert("error occurred.");
    },
  });
}

function borrarNotas() {
    let notas = document.querySelectorAll("#listaNotas");
    notas.forEach(nota => {
        nota.remove();
    });
}
