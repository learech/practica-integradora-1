import { productModel } from "../models/product.model.js";

class ProductService {
  constructor() {
    this.model = productModel;
  }

  
  async addProduct(product) {
    return await this.model.create(product);
  }
  
  async getProducts() {
    return await this.model.find();
  }
  
  async updateProduct(pid, product) {
    return await this.model.updateOne({ _id: pid }, product);
  }
  
  async deleteProduct(pid){
    return await this.model.deleteOne({_id:pid});
  }
  
  async getProductById(pid){
    return await this.model.findOne({_id:pid});
  }


}

const productService = new ProductService();
export default productService;
