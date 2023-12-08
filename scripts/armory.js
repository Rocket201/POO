export default class Inventory {
    #products;

    // Constructor de la clase
    constructor() {
        this.#products = []; // Inicialización del array de productos una vez que se crea la instancia
    }

    // Agrega un producto al inventario
    addProduct(product) {
        if (this.isValidProduct(product)) {
            this.products.push(product);

            // Verificar y almacenar en el almacenamiento local (localStorage)
            this.storeProductInLocalStorage(product);

            this.displayInventory(); // Actualizar la visualización del inventario
            this.calculateTotalValue();
        } else {
            console.error('Producto no válido. Asegúrate de proporcionar nombre, cantidad y precio.');
        }
    }

    // Elimina un producto del inventario
    deleteProduct(id) {
        const index = this.getProductIndexById(id);
        if (index !== -1) {
            this.products.splice(index, 1);
            localStorage.removeItem(`Producto: ${id}`);
            this.displayInventory();
            this.calculateTotalValue();
        }
    }

    // Edita un producto del inventario
    editProduct(id) {
        const product = this.getProductById(id);
        if (product) {
            const editForm = this.createEditForm(product);
            this.setupEditFormEvents(editForm, id);
            document.body.appendChild(editForm);
        }
    }

    // Actualiza un producto del inventario
    updateProduct(id, name, quantity, price) {
        const product = this.getProductById(id);
        if (product) {
            this.updateProductDetails(product, name, quantity, price);
            this.displayInventory(); // Actualiza la visualización del inventario
            this.calculateTotalValue();
            this.storeProductInLocalStorage(product);
        }
    }

    // Busca un producto en el inventario por nombre
    searchProduct(name) {
        const filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
        this.displayInventory(filteredProducts); // Actualizar la visualización del inventario con los productos filtrados
    }

    // Muestra el inventario en la tabla
    displayInventory(products = this.products) {
        const tableBody = document.getElementById('add-rows');
        tableBody.innerHTML = ''; // Limpia el contenido actual de la tabla

        products.forEach(product => {
            const row = this.createInventoryRow(product);
            this.setupButtonEvents(row, product.id);
            tableBody.appendChild(row); // Agrega la fila a la tabla
        });
    }

    // Calcula el valor total del inventario
    calculateTotalValue() {
        const totalValue = this.products.reduce((total, product) => {
            return total + (product.quantity * product.price);
        }, 0);
        
        // Actualizar el valor total en el DOM
        document.getElementById('total').textContent = `Valor total del inventario: ${totalValue.toFixed(2)}`;
    }

    // Getter para obtener los productos del inventario
    get products() {
        return this.#products;
    }

    // Setter para establecer los productos del inventario
    set products(products) {
        this.#products = products;
    }

    // Función auxiliar para validar un producto
    isValidProduct(product) {
        return product.name && product.quantity && product.price;
    }

    // Función auxiliar para almacenar un producto en el almacenamiento local
    storeProductInLocalStorage(product) {
        if (this.isValidProduct(product)) {
            const plainProduct = { id: product.id, name: product.name, quantity: product.quantity, price: product.price };
            const productJson = JSON.stringify(plainProduct);
            localStorage.setItem(`Producto: ${product.id}`, productJson);
        }
    }

    // Función auxiliar para obtener el índice de un producto por su ID
    getProductIndexById(id) {
        return this.products.findIndex(product => product.id === id);
    }

    // Función auxiliar para obtener un producto por su ID
    getProductById(id) {
        return this.products.find(product => product.id === id);
    }

    // Función auxiliar para actualizar los detalles de un producto
    updateProductDetails(product, name, quantity, price) {
        product.name = name;
        product.quantity = quantity;
        product.price = price;
    }

    // Función auxiliar para crear una fila de inventario
    createInventoryRow(product) {
        const row = document.createElement('tr'); // Crear una nueva fila
        // Configura las celdas de la fila con la información del producto
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.quantity}</td>
            <td>${product.price}</td>
            <td class="button-column">
                <button class="delete-button">Borrar</button>
                <button class="edit-button">Editar</button>
            </td>
        `;
        return row;
    }

    // Función auxiliar para crear un formulario de edición
    createEditForm(product) {
        const editForm = document.createElement('form');
        editForm.innerHTML = `<div class="update-form">
            <label for="editName">Nombre del producto</label>
            <input type="text" id="editName" value="${product.name}">
            <label for="editQuantity">Cantidad</label>
            <input type="number" id="editQuantity" value="${product.quantity}">
            <label for="editPrice">Precio</label>
            <input type="number" id="editPrice" value="${product.price}">
            <input type="hidden" id="editId" value="${product.id}">
            <button type="submit" class="submit-update">Actualizar producto</button>
            </div>
        `;
        return editForm;
    }

    // Función auxiliar para configurar eventos de botones en una fila
    setupButtonEvents(row, id) {
        row.querySelector('button:nth-child(1)').addEventListener('click', () => this.deleteProduct(id));
        row.querySelector('button:nth-child(2)').addEventListener('click', () => this.editProduct(id));
    }

    // Función auxiliar para configurar eventos de formulario de edición
    setupEditFormEvents(editForm, id) {
        editForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.updateProduct(
                document.getElementById('editId').value,
                document.getElementById('editName').value,
                document.getElementById('editQuantity').value,
                document.getElementById('editPrice').value
            );
            editForm.remove(); // Elimina el formulario después de la actualización para que este no se quede en el DOM
        });
    }
}
