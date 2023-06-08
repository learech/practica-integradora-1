
import fs from "fs";
import status from "statuses";

export default class ProductManager {
  constructor(path) {
    
    this.path = path;
    
    if (!fs.existsSync(this.path)) {
      fs.writeFileSync(this.path, JSON.stringify([]));
    }
  }
  
  async addProduct(objeto
  ) {
    const productosAct = await this.getProducts(); 
    const id =
      productosAct.length > 0
        ? productosAct[productosAct.length - 1].id + 1
        : 1; 

    try {
      const product = {
        title: objeto.title,
        description: objeto.description,
        price: objeto.price,
        thumbnail: objeto.thumbnail,
        code: objeto.code,
        stock: objeto.stock,
        category: objeto.category,
        status: objeto.status,
      };
      product.id = id; 

      if (
        
        (product.title != undefined) &
        (product.description != undefined) &
        (product.price != undefined) &
        (product.thumbnail != undefined)&
        (product.code != undefined) &
        (product.stock != undefined) &
        (product.category != undefined)
      ) {
        productosAct.push(product); 
        await fs.promises.writeFile(this.path, JSON.stringify(productosAct));
        return productosAct;
      } else {
        console.log("Todos los campos son obligatorios");
      }
    } catch (err) {
      console.log(
        `Algo salió mal al intentar agregar un producto ERROR:${err}`
      );
    }
  }
  
  async getProducts() {
    try {
      const productosAct = await fs.promises.readFile(this.path, "utf-8"); 
      const productosActParseados = JSON.parse(productosAct); 
      return productosActParseados;
    } catch (err) {
      console.log(
        `Algo salió mal al intentar obtener los objetos parseados, ERROR: ${err}`
      );
    }
  }
 

  async getProductById(idProduct) {
    try {
      const productosAct = await this.getProducts(); 
      const filtroID = productosAct.filter(
        (product) => product.id === idProduct
      );
      filtroID.length === 0
        ? console.log("No existe ningún producto con el ID especificado.")
        : console.log("Producto encontrado exitosamente"); 
      return filtroID;
    } catch (err) {
      console.log(
        `Algo salió mal al intentar obtener un producto por su ID, ERROR: ${err}`
      );
    }
  }


  async updateProduct(idProduct, objeto) {
    try {
      const productosAct = await this.getProducts(); 
      const indiceID = productosAct.findIndex(
        
        (producto) => producto.id === idProduct
      );
      if (indiceID === -1) {
        
        console.log(
          "No existe ningún producto con el ID especificado, no se puede actualizar."
        );
      } else {
      
        const [newValue] = Object.values(objeto); 
        productosAct[indiceID][Object.keys(objeto)] = newValue; 

        await fs.promises.writeFile(this.path, JSON.stringify(productosAct));
      }
    } catch (err) {
      console.log(
        `Algo salió mal al intentar actualizar los productos, ERROR: ${err}`
      );
    }
  }

  
  async deleteProduct(idProduct) {
    try {
      const productosAct = await this.getProducts(); 
      const findIndex = productosAct.findIndex(
        (product) => product.id == idProduct
      );
      productosAct.splice(findIndex, 1); 
      await fs.promises.writeFile(this.path, JSON.stringify(productosAct));

      return productosAct;
    } catch (err) {
      console.log(
        `Algo salió mal al intentar eliminar un producto por su ID, ERROR: ${err}`
      );
    }
  }
}

