class ProductManager {
  constructor() {
    this.products = [];
    this.length = 0;
  }

  addProduct(product) {
    const found = this.products.find((x) => x.code === product.code);
    if (found) {
      console.error("El producto ya existe");
      return
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
      return
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
      return
    }
    return found;
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
