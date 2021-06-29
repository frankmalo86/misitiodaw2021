
var p = {
    'nombre':'Frank',
    'apellido': 'Malo',
    'sexo': 'Masculino',
    'edad': 34
}



function saludo(nombre){
    console.log('HOla, ' + nombre )
    console.log(p.nombre)
    console.log(p.sexo)
}

// function contarletras(texto, event){
//     console.log(texto.length)
//     if (  ){
//         return false;
//     }
//     return true;
// }


const contarletras = (texto, event) => {
    console.log(event)
    return !(texto.length >= 10 && event.keyCode != 8) 
}

// const presentarcantidadletras = (texto) => {
//     var span_obj = document.getElementById("cantidad_caracteres")
//     span_obj.textContent = texto.length;
// }


const presentarcantidadletras = (texto) => $("#cantidad_caracteres").text(texto.length);
    

// function animacioncompleta(){
//     alert("funcion terminada")
// }

// var opciones = { //JSON
//     duration:10,
//     queue:false,
//     complete:animacioncompleta
// }

// $.show(opciones)


var personas = ['Juan', 'Frank', 'Pedro']
// var personas = personas.sort()
// console.log(personas)

// for (var i = 0; i < personas.length; i++){
//     console.log(personas[i])
// }

// const imprimirPersona = (p, i) => alert('hola, ' + p + 'indice ' + i);
// personas.forEach((p, i) => alert('hola, ' + p + 'indice ' + i))

// var personas2 = [
//         {nombre:'Juan', edad:25}, 
//         {nombre:'Frank', edad:35}, 
//         {nombre:'Pedro', edad:15}
//     ]

// personas2 = personas2.sort(
//     (P1,P2) => {
//         if (P1.edad < P2.edad) return -1
//         if (P1.edad > P2.edad) return 1
//         return 0
//     }
// )

// personas2 = personas2.sort(
//     (P1,P2) => {
//         if (P1.nombre < P2.nombre) return 1
//         if (P1.nombre > P2.nombre) return -1
//         return 0
//     }
// )

// console.log(personas2)

// personas2.forEach(
//     pasjson =>{
//         console.log('HOla, ' + pasjson.nombre);
//         console.log('Tu edad es, ' + pasjson.edad);
//     }

// )


$( () => {
        $(`#loading`).hide()
        var tooltips = $( "[title]" ).tooltip({
        position: {
            my: "left top",
            at: "right+5 top-5",
            collision: "none"
        },
        show: { effect: "blind", duration: 800 }
        });
        $( "#btn_guardar" ).on( "click", () => tooltips.tooltip( "open" ));
        $( "#fecha" ).datepicker({
            numberOfMonths: 2,
            showButtonPanel: true,
            showAnim: "clip"
        }); 

        $( "[type=radio]" ).checkboxradio();
    } 
  );


  const agregarparrafo = () => {
    var p = document.createElement("p");
    var texto = document.createTextNode("Este p no estaba en el HTML original");
    p.appendChild(texto);
    document.body.appendChild(p);
  }



  const agregar_filas = (id_tabla) => {
      // nombre de la tabla
      var rowCount = $(`#${id_tabla} tbody tr`).length;
      if (rowCount != 0){
        $(`#${id_tabla} tbody tr:last`).after(`<tr>
                                        <td>cell1_${ rowCount + 1 }</td>
                                        <td>cell2_${ rowCount + 1 }</td>
                                        <td>cell3_${ rowCount + 1 }</td>
                                        </tr>`);
      }else{
        $(`#${id_tabla} tbody`).append(`<tr>
                                        <td>cell1_${ rowCount + 1 }</td>
                                        <td>cell2_${ rowCount + 1 }</td>
                                        <td>cell3_${ rowCount + 1 }</td>
                                        </tr>`);
      }

    }

const eliminar_filas = (id_tabla) => $(`#${id_tabla} tbody tr:last`).remove();


const save_post = () => {
    var titulo = $('#titulo').val();
    var comentario = $('#comentario').val();
    var datos = JSON.stringify({
        title: titulo,
        body: comentario,
        userId: 1
      })

    var configuraciones = {
        url : 'https://jsonplaceholder.typicode.com/posts',
        method : 'POST',
        success: (data) => {

            $.when( get_posts() ).then(( posts, textStatus, jqXHR ) =>{
                $(`#tbl_posts tbody`).append(`<tr>
                    <td>${ data.id }</td>
                    <td>${ data.title }</td>
                    <td>${ data.body }</td>
                    </tr>`);
            }); 
        },
        data:datos,
        headers: {'Content-type': 'application/json; charset=UTF-8'}
    }

    $.ajax(configuraciones)
    
}

const get_posts = () => {
    
    var configuraciones = {
        url : 'https://jsonplaceholder.typicode.com/posts',
        method : 'GET',
        success: (data) => {
            data = data.reverse();
            data.forEach(element => {

                $(`#tbl_posts tbody`).append(`<tr>
                <td>${ element.id }</td>
                <td>${ element.title }</td>
                <td>${ element.body }</td>
                </tr>`);
                
            });
        },
        beforeSend: () => {
            $(`#tbl_posts tbody`).empty()
        }
    }


    return $.ajax(configuraciones)

}




const get_articulos = () => {
    
    var configuraciones = {
        url : 'http://192.168.100.76:8000/api/articles',
        method : 'GET',
        success: (data) => {
            console.log(data)
            data.forEach(element => {

                $(`#tbl_articulos tbody`).append(`<tr>
                <td>${ element.id }</td>
                <td>${ element.title }</td>
                <td>${ element.body }</td>
                </tr>`);
                
            });
            $(`#loading`).hide()
        },
        beforeSend: () => {
            $(`#loading`).show()
            $(`#tbl_articulos tbody`).empty()
        }
    }


    return $.ajax(configuraciones)

}






// const save_post = () => {
//     var titulo = $('#titulo').val();
//     var comentario = $('#comentario').val();
//     var datos = JSON.stringify({
//         title: titulo,
//         body: comentario,
//         userId: 1
//       })

//     var configuraciones = {
//         url : 'https://jsonplaceholder.typicode.com/posts',
//         method : 'POST',
//         success: (data) => {

//             var p1 = new Promise((resolve, reject) =>{
//                 get_posts(resolve, reject)
//             })
            
//             p1.then(
//                 () => {
//                     $(`#tbl_posts tbody`).append(`<tr>
//                     <td>${ data.id }</td>
//                     <td>${ data.title }</td>
//                     <td>${ data.body }</td>
//                     </tr>`);
//                 }
//             )
            
//         },
//         data:datos,
//         headers: {'Content-type': 'application/json; charset=UTF-8'}
//     }

//     $.ajax(configuraciones)
    
// }

// const get_posts = (resolve, reject) => {
    
//     var configuraciones = {
//         url : 'https://jsonplaceholder.typicode.com/posts',
//         method : 'GET',
//         success: (data) => {
//             data = data.reverse();
//             data.forEach(element => {

//                 $(`#tbl_posts tbody`).append(`<tr>
//                 <td>${ element.id }</td>
//                 <td>${ element.title }</td>
//                 <td>${ element.body }</td>
//                 </tr>`);
                
//             });
//             if (resolve) resolve(data);
//         },
//         beforeSend: () => {
//             $(`#tbl_posts tbody`).empty()
//         }
//     }


//     $.ajax(configuraciones)

// }



// const save_post = () => {
//     var titulo = $('#titulo').val();
//     var comentario = $('#comentario').val();
//     var datos = JSON.stringify({
//         title: titulo,
//         body: comentario,
//         userId: 1
//       })

//     var configuraciones = {
//         url : 'https://jsonplaceholder.typicode.com/posts',
//         method : 'POST',
//         success: (data) => {
//              // esto es un error porque la linea 297 podria ejecutarse antes de la lina 295 ya que la función get_posts es asincrónica, entonces necesita una promesa
//             get_posts()
            
//             $(`#tbl_posts tbody`).append(`<tr>
//             <td>${ data.id }</td>
//             <td>${ data.title }</td>
//             <td>${ data.body }</td>
//             </tr>`);
            
            
//         },
//         data:datos,
//         headers: {'Content-type': 'application/json; charset=UTF-8'}
//     }

//     $.ajax(configuraciones)
    
// }

// const get_posts = () => {
    
//     var configuraciones = {
//         url : 'https://jsonplaceholder.typicode.com/posts',
//         method : 'GET',
//         success: (data) => {
//             data = data.reverse();
//             data.forEach(element => {

//                 $(`#tbl_posts tbody`).append(`<tr>
//                 <td>${ element.id }</td>
//                 <td>${ element.title }</td>
//                 <td>${ element.body }</td>
//                 </tr>`);
                
//             });
//         },
//         beforeSend: () => {
//             $(`#tbl_posts tbody`).empty()
//         }
//     }


//     $.ajax(configuraciones)

// }