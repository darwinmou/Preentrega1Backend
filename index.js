const fs = require("fs");

class ProductManager {
  constructor(filename) {
    this.filename = filename;
    this.products = [];
    this.length = 0;

    this.loadFromFile();
  }

  saveToFile() {
    fs.writeFileSync(this.filename, JSON.stringify(this.products, null, 2));
  }

  loadFromFile() {
    try {
      const data = fs.readFileSync(this.filename, "utf8");
      this.products = JSON.parse(data);
      this.length = this.products.length;
    } catch (error) {
      this.products = [];
      this.length = 0;
    }
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
    this.saveToFile();
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
        updatedProduct,
      };
      console.log("Producto actualizado exitosamente");
    } else {
      console.log("No se encontró el producto con el ID dado");
    }

    this.saveToFile();
  }

  deleteProduct(id) {
    const indexToDelete = this.products.findIndex(
      (product) => product.id === id
    );

    if (indexToDelete !== -1) {
      this.products.splice(indexToDelete, 1);
      console.log("Producto eliminado exitosamente");
    } else {
      console.log("No se encontró el producto con el ID dado");
    }
    this.saveToFile();
  }
}

const productManager = new ProductManager("productos.json");



productManager.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25,
});


productManager.updateProduct(1,{price:50,stock:3})



