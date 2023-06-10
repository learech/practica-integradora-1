import { messageModel } from "../models/message.model.js";

class MessageService {
    constructor(){
        this.model = messageModel;
    }
    async getMessages (){
        return await this.model.find().lean();
    }
    async addMessage(msj){
        await this.model.create(msj);
    }

}

const messageService = new MessageService();
export default messageService;