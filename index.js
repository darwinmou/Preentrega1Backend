class ProductManager {
  constructor() {
    this.products = [];
    this.length = 0;
  }

  addProduct(product) {
    const found = this.products.find((x) => x.code === product.code);
    if (found) {
      console.error("El producto ya existe");
      return;
    }

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      console.error("Todos los campos son obligatorios");
      return;
    }

    this.length += 1;
    product.id = this.length;

    this.products.push(product);
  }

  getProducts() {
    return this.products;
  }

  getProducById(id) {
    const found = this.products.filter((x) => x.id === id);
    if (found.length === 0) {
      console.error("Not found");
      return;
    }
    return found;
  }

  updateProduct(id, updatedProduct) {
    const indexToUpdate = this.products.findIndex(
      (product) => product.id === id
    );

    if (indexToUpdate !== -1) {
      this.products[indexToUpdate] = {
        ...this.products[indexToUpdate],
        ...updatedProduct,
      };
      console.log("Producto actualizado exitosamente");
    } else {
      console.log("No se encontró el producto con el ID dado");
    }
  }

  deleteProduct(id) {
    const indexToDelete = this.products.findIndex(product => product.id === id);

    if (indexToDelete !== -1) {
      this.products.splice(indexToDelete, 1);
      console.log("Producto eliminado exitosamente");
    } else {
      console.log("No se encontró el producto con el ID dado");
    }
  }

}

const productManager = new ProductManager();

console.log(productManager.getProducts());

productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

console.log(productManager.getProducts());

productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});

console.log(productManager.getProducById(1));

productManager.getProducById(100);

productManager.updateProduct(1,{price:150, stock: 15})
console.log(productManager.getProducts());

productManager.deleteProduct(1)
console.log(productManager.getProducts());