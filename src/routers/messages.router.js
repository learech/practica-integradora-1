

import { Router } from 'express';
import messageService from '../dao/services/message.service.js';

const messageRouter = Router();

messageRouter.get('/', async (req, res) => {
  const allMessages = await messageService.getMessages();

  try {
    res.render('chat', { title: 'Chat || Backend ', messages: allMessages });
  } catch (err) {
    res.send({ ERROR: err });
  }
});

export default messageRouter;
