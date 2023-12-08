import Product from './ArmasS-G.js';
import Inventory from './armory.js';
import { storeProducts } from './localStorage.js';

// Crea una nueva instancia de la clase Inventory
const inventory = new Inventory();

// Productos por defecto

let defaultProducts = [
    new Product(1, 'Pistola', 20, 250.00),
    new Product(2, 'Rifle de asalto', 30, 1200.99),
    new Product(3, 'Escopeta', 15, 800.15),
    new Product(4, 'Ametralladora ligera', 50, 4500.99),
    new Product(5, 'Granada', 10, 100.75),
    new Product(6, 'Cuchillo táctico', 15, 79.99),
    new Product(7, 'Ballesta', 25, 199.99),
    new Product(8, 'Lanzacohetes', 35, 1200.99),
    new Product(9, 'Minas terrestres', 45, 29.99),
    new Product(10, 'Arco y flechas', 55, 99.99),
    new Product(11, 'Chaleco antibalas', 30, 499.99),
    new Product(12, 'Gafas de visión nocturna', 40, 399.99),
    new Product(13, 'Granada de humo', 50, 19.99),
    new Product(14, 'Casco táctico', 60, 149.99),
    new Product(15, 'Botiquín de primeros auxilios', 70, 59.99),
];


// Añade los productos por defecto al inventario
defaultProducts.forEach(product => inventory.addProduct(product));

// Almacena los productos por defecto en el almacenamiento local
storeProducts(defaultProducts);

// Obtén el formulario de añadir
const addForm = document.getElementById('form-add');

// Añadir un evento de envío al formulario
addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Obtiene los valores del formulario
    const name = document.getElementById('nameInput').value;
    const quantity = document.getElementById('stockInput').value;
    const price = document.getElementById('priceInput').value;
    const id = Date.now(); // Usa la fecha actual como id

    // Crea un nuevo producto con los valores obtenidos
    const product = new Product(id, name, quantity, price);
    
    // Añade el producto al inventario
    inventory.addProduct(product);
    this.reset(); // Limpia el formulario
});

// Obtén el formulario de editar
const editForm = document.getElementById('form-edit');

// Añadir un evento de envío al formulario
editForm.addEventListener('submit', function (e) {
    e.preventDefault();
    // Obtiene los valores del formulario de edición
    const name = document.getElementById('nameInput').value;
    const quantity = document.getElementById('stockInput').value;
    const price = document.getElementById('priceInput').value;
    const id = document.getElementById('editId').value;

    // Actualiza el producto en el inventario con los nuevos valores
    inventory.updateProduct(id, name, quantity, price);
    this.reset(); // Limpia el formulario
});

// Obtén el campo de búsqueda
const searchInput = document.getElementById('product-search');

// Añadir un evento de entrada al campo de búsqueda
searchInput.addEventListener('input', function (e) {
    const searchValue = e.target.value; // Obtiene el valor de búsqueda
    // Busca el producto en el inventario
    inventory.searchProduct(searchValue);
});