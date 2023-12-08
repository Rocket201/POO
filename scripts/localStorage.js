// Función para almacenar productos en el almacenamiento local del navegador.
// Se utiliza un try-catch para manejar posibles errores al interactuar con el almacenamiento local.
export function storeProducts(defaultProducts) {
    // Itera sobre la lista de productos por defecto
    defaultProducts.forEach(product => {
        // Verifica si el producto tiene los campos necesarios
        if (product.name && product.quantity && product.price) {
            try {
                // Convierte los detalles del producto a un objeto plano (plain object)
                const plainProduct = { id: product.id, name: product.name, quantity: product.quantity, price: product.price };
                // Convierte el objeto del producto a una cadena JSON
                const productJson = JSON.stringify(plainProduct);
                // Almacena el producto en el almacenamiento local con una clave única basada en el ID del producto
                localStorage.setItem(`Producto: ${product.id}`, productJson);
            } catch (error) {
                // En caso de error al interactuar con el almacenamiento local, muestra un mensaje de error en la consola
                console.error('Error al almacenar el producto:', error);
            }
        }
    });
}
