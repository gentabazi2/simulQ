import { Router } from 'express';
import authRoute from '../routes/auth.routes';
// import usersRoute from '../features/user/user.routes';
// import paymentRoute from '../features/payment/payment.routes';
// import apiSlotsRoute from '../features/api_slots/api_slots.route';
// import tvRoute from '../features/trading_view/trading_view.routes';
// import contactRoute from '../features/contact-us/contact-us.routes';
// import telegramApiRoute from '../features/telegram/api/telegram-api.routes';
// import telegramBotRoute from '../features/telegram/bot/telegram-bot.routes';

const app = Router();

// Register all routes here
export default () => {
   app.use('/v1/auth', authRoute);
//   app.use('/v1/users', usersRoute);
//   app.use('/v1/payment', paymentRoute);
//   app.use('/v1/api_slot', apiSlotsRoute);
//   app.use('/v1/trading_view', tvRoute);
//   app.use('/v1/contact', contactRoute);
//   app.use('/v1/telegram-api',telegramApiRoute);
//   app.use('/v1/telegram-bot',telegramBotRoute);
  return app;
};
