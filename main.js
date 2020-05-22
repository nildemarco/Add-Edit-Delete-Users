const mostrarUsers = async () => {
    const data = await fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users')
    const users = await data.json()

    const contenedorTabla = document.getElementById("container-table")
    console.log(users)

    const datosTabla = users.reduce((acc, curr) => {
        return acc + `
            <tr>
            <td><input type="checkbox" name="users" id=""></td>
            <td>${curr.fullname}</td>
            <td>${curr.email}</td>
            <td>${curr.address}</td>
            <td>${curr.phone}</td>
            <td><i  class="material-icons icon-edit edit" title="Edit">&#xE254;</i>
            <i id="delete" class="material-icons icon-delete"
            title="Delete">&#xE872;</i></td>
            </tr>`

    }, '')

    contenedorTabla.innerHTML = `<table>
        <tr>
        <th><input type="checkbox" name="main" id=""></th>
        <th>Name</th>
        <th>Email</th>
        <th>Adress</th>
        <th>Phone</th>
        <th>Actions</th>
        </tr> 
        ${datosTabla}
        </table>`

    //---------PARA EDITAR ---------// 

    const botonesEdit = document.getElementsByClassName("edit")
    const arrayBotonEdit = Array.from(botonesEdit)

    arrayBotonEdit.forEach((btnEdit, i) => {
        btnEdit.onclick = () => {
            crearModal("edit", users[i])
            const modalEdit = document.getElementById("modal-edit")
            containerModal.classList.remove("noMostrar")
            modalEdit.classList.remove("noMostrar")

            const formEdit = document.forms[0]

            formEdit.onsubmit = (e) => {
                e.preventDefault()

                let nombre = formEdit.elements[0].value

                let correo = formEdit.elements[1].value
                let direccion = formEdit.elements[2].value
                let telefono = formEdit.elements[3].value

                let userEdit = {
                    fullname: nombre,
                    email: correo,
                    address: direccion,
                    phone: telefono
                }

                editUsers(users[i].id, userEdit)

            }
            const botonGuardarEdit = document.getElementById("save-edit")

            botonGuardarEdit.onclick = () => {
                containerModal.classList.add("noMostrar")
                modalEdit.classList.add("noMostrar")
            }

            const cancelarEdit = document.getElementById("cancel-edit")
            cancelarEdit.onclick = (e) => {
                e.preventDefault()
                modalEdit.classList.add("noMostrar")
            }

        }

    });

    //--------- PARA ELIMINAR ---------// 

    const botonesDelete = document.getElementsByClassName("icon-delete")

    arrayBotonDelete = Array.from(botonesDelete);

    arrayBotonDelete.forEach((botonDelete, i) => {
        botonDelete.onclick = () => {
            crearModal("delete")
            const modalBorrar = document.getElementById("modal-delete")
            modalBorrar.classList.remove("noMostrar")

            const accionBorrar = document.getElementById("delete")

            accionBorrar.onclick = () => {
                deleteUsers(users[i].id)
                modalBorrar.classList.add("noMostrar")
            }
            const cancelarDelete = document.getElementById("cancel-delete")
            cancelarDelete.onclick = () => {
                modalBorrar.classList.add("noMostrar")
            }
        }
    });
}

mostrarUsers()

//---------FUNCION PARA AGREGAR USUARIO---------//

const addUsers = async (nuevoUser) => {
    const data = await fetch('https://tp-js-2-api-wjfqxquokl.now.sh/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUser),
    })
    const userAgregado = await data.json()
    console.log(userAgregado)
    mostrarUsers()
}

//---------FUNCION PARA EDITAR USUARIO ---------//

const editUsers = async (id, usersEdit) => {
    const data = await fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usersEdit),
    })
    const userEditado = await data.json()

    console.log(userEditado, "editUsers")
    mostrarUsers()
}


//---------FUNCION PARA ELIMINAR USUARIO ---------//

const deleteUsers = async (id) => {
    const data = await fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users/:${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    })
    const usersDeleted = await data.json()

    console.log(usersDeleted)
    mostrarUsers()
}

//---------PARA AGREGAR ---------//
containerModal = document.getElementById("container-modal")

const crearModal = (accion, usuarios) => {

    if (accion === "add") {
        containerModal.innerHTML =
            `<div id="modal-add" class="myModal noMostrar">
        <h2>Add Employee</h2>
        <form class="form-modal">
            <label> Name
                <input type="text" name="name" id="">
            </label>
            <label> Email
                <input type="email" name="email" id="">
            </label>
            <label> Address
                <input type="text" name="address" id="">
            </label>
            <label> Phone
                <input type="number" name="phone" id="">
            </label>

        <div class="botones-modal">
            <button id="cancel-add">Cancel</button>
            <button id="btn-add" type="submit">Add</button>
        </div>
        </form>

        </div>`
    }

    if (accion === "edit") {
        containerModal.innerHTML =
            `<div id="modal-edit" class="myModal noMostrar">
                <h2>Edit Employee</h2>
                <form class="form-modal">
                <label> Name
                <input type="text" name="name" id="" value="${usuarios.fullname}" >
                </label>
                <label> Email
                <input type="email" name="email" id="" value="${usuarios.email}">
                </label>
                <label> Address
                <input type="text" name="address" id="" value="${usuarios.address}">
                </label>
                <label> Phone
                <input type="number" name="phone" id="" value="${usuarios.phone}">
                </label>

                <div class="botones-modal">
                <button id="cancel-edit">Cancel</button>
                <button id="save-edit" type="submit">Save</button>
                </div>
               </form>

               </div>`

    }
    if (accion === "delete") {
        containerModal.innerHTML = `
        <div id="modal-delete" class = "modal-delete noMostrar"> 
        <h2>Delete Employee</h2>
        <h4>Are you sure you want to delete these Records?</h4>
        <p>This action cannot be undone.</p>
        <div class="botones-modal">
            <button id= "cancel-delete">Cancel</button>
            <button id="delete" type="submit">Delete</button>
        </div>
        </div>`
    }

}

//-------PARA AGREGAR--------//

const botonAbrirModalAdd = document.getElementById("add-user");

botonAbrirModalAdd.onclick = () => {
    crearModal("add")
    const modalAdd = document.getElementById("modal-add")
    modalAdd.classList.remove("noMostrar")

    const botonCerrarModalAdd = document.getElementById("btn-add")
    botonCerrarModalAdd.onclick = () => {
        modalAdd.classList.add("noMostrar")
        const form = document.forms[0]
        form.onsubmit = (e) => {
            e.preventDefault()

            let nombre = form.elements[0].value
            let correo = form.elements[1].value
            let direccion = form.elements[2].value
            let telefono = form.elements[3].value

            let nuevoUser = {
                fullname: nombre,
                email: correo,
                address: direccion,
                phone: telefono
            }

            addUsers(nuevoUser)

        }
    }
    const cancelarAdd = document.getElementById("cancel-add")
    cancelarAdd.onclick = (e) => {
        e.preventDefault()
        modalAdd.classList.add("noMostrar")
    }

}

//---------FILTRO ---------// 

const filtro = document.getElementById("filter")

const funcionFiltro = async (valorABuscar) => {
   const data = await fetch(`https://tp-js-2-api-wjfqxquokl.now.sh/users?search=${valorABuscar}`)
    const usuarios = await data.json()
            const contenedorTabla = document.getElementById("container-table")
            const datosFiltrados = usuarios.reduce((acc, curr) => {
                return acc + `
        <tr>
            <td><input type="checkbox" name="users" id=""></td>
            <td>${curr.fullname}</td>
            <td>${curr.email}</td>
            <td>${curr.address}</td>
            <td>${curr.phone}</td>
            <td><i  class="material-icons icon-edit edit" title="Edit">&#xE254;</i>
            <i id="delete" class="material-icons icon-delete"
         title="Delete">&#xE872;</i></td>
        </tr>`
            }, "")

            contenedorTabla.innerHTML = `<table>
             <tr>
                 <th><input type="checkbox" name="main" id=""></th>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Adress</th>
                 <th>Phone</th>
                 <th>Actions</th>
             </tr> 
             ${datosFiltrados}
             </table>`
}

filtro.onkeypress = e => {
    if (e.keyCode == 13) {
        funcionFiltro(filtro.value)
    }

}
