
import fs from "fs";
import ProductManager from "./productManager.js";

const productManager = new ProductManager("./products.json");

export default class CartManager {
  
  #id = 0; 
  constructor(path) {
    
    this.path = path;
  
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }
  
  async addCart(arrayProducts) {
    try {
      const cartsAct = await this.getCarts(); 
      const id = cartsAct.length > 0 ? cartsAct[cartsAct.length - 1].id + 1 : 1;
      const newCart = { products: arrayProducts }; 
      newCart.id = id; 

      cartsAct.push(newCart); 

      await fs.promises.writeFile(this.path, JSON.stringify(cartsAct));
      return cartsAct;
    } catch (err) {
      console.log(`Algo salió mal al intentar agregar un carrito ERROR:${err}`);
    }
  }
  
  async getCarts() {
    try {
      const cartsAct = await fs.promises.readFile(this.path, "utf-8"); 
      const cartsActParseados = JSON.parse(cartsAct); 
      return cartsActParseados;
    } catch (err) {
      console.log(
        `Algo salió mal al intentar obtener los carritos parseados, ERROR: ${err}`
      );
    }
  }
  
  async getProductsByidCart(idCart) {
    try {
      const cartsAct = await this.getCarts(); 
      const idcartFound = await cartsAct.find((cart) => cart.id === idCart);

      const productsList = idcartFound.products; 
      return productsList;
    } catch (err) {
      console.log(
        `Algo salió mal al intentar obtener la lista de productos del idCart especificado, ERROR: ${err}`
      );
    }
  }

  

  async addProductToCart(cartId, productId) {
    
    try {
      let producto = await productManager.getProductById(productId); 
      
      const cartsAct = JSON.parse(
        await fs.promises.readFile(this.path, "utf-8")
      );
      
      let cartFound = cartsAct.filter((cart) => {
        return cart.id === cartId;
      })[0];
      
      let indice = cartFound.products.findIndex((producto) => {
        return producto.id === productId;
      });

      if (indice === -1) {
        
        let producto = { id: productId, quantity: 1 };
        cartFound.products.push(producto);
      } else {
        let cantidad = cartFound.products[indice].quantity + 1; 
        producto = { id: productId, quantity: cantidad }; 
        cartFound.products[indice] = producto; 
      }

      await fs.promises.writeFile(this.path, JSON.stringify(cartsAct)); 
    } catch (err) {
      console.log(
        `Algo salió mal al agregar un producto al cart con id: ${cid}, ERROR: ${err}`
      );
    }
  }
}



const carts = new CartManager("./carts.json"); 

const pruebas = async () => {
  try {
    
    await carts.addCart([]);
    
  } catch (err) {
    console.log(
      `Algo salió mal al hacer las pruebas del Cart Manager, ERROR: ${err}`
    );
  }
};


