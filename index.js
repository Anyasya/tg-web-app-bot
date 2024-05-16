const TelegramBot = require('node-telegram-bot-api');

const token = '6693073853:AAHe0KnpkGqstwIeIMBeMBdryETPHZYbzp4';


const bot = new TelegramBot(token, {polling: true});
const webAppUrl = 'https://splendorous-blancmange-1c725a.netlify.app';

// bot.onText(/\/echo (.+)/, (msg, match) => {
//     const chatId = msg.chat.id;
//     const resp = match[1];
//     bot.sendMessage(chatId, resp);
// });


bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const text = msg.text;
    if(text === '/start') {
        await bot.sendMessage(chatId, ' Добро пожаловать!', {
            reply_markup: {
                keyboard: [
                    [{text: 'Поиск кандидатов', web_app: {url: webAppUrl + '/form'}}]
                ]
            }
        })

        await bot.sendMessage(chatId, 'Посмотреть всех кандидатов по кнопке ниже', {
            reply_markup: {
                inline_keyboard: [
                    [{text: 'Все кандидаты', web_app: {url: webAppUrl}}]
                ]
            }
        })
    }

    if(msg?.web_app_data?.data) {
        console.log(msg?.web_app_data?.data,'msg?.web_app_data?.data')
        try {
            const data = JSON.parse(msg?.web_app_data?.data)
            console.log(data)
            await bot.sendMessage(chatId, 'Поиск по параметрам!')
            await bot.sendMessage(chatId,
            `
            Локация: ${data?.country}, зп от: ${data?.salary_from}
            `);
            // await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

            setTimeout(async () => {
                await bot.sendMessage(chatId, 'Найдено кандидатов: 3', {
                    reply_markup: {
                        inline_keyboard: [
                            [{text: 'Посмотреть кандидатов', web_app: {url: webAppUrl + '/applicants'}}]
                        ]
                    }
                })
                // await bot.sendMessage(chatId, 'Найдено кандидатов: 3');
            }, 3000)
        } catch (e) {
            console.log(e);
        }
    }

    if(msg?.web_app_data?.data) {
        console.log(msg?.web_app_data?.data,'msg?.web_app_data?.data 2')
        try {
            // const data = JSON.parse(msg?.web_app_data?.data.statusText)
            // console.log(data)
            // await bot.sendMessage(chatId, `Кандидаты перемещены на статус ${data?.statusText}`)
            // await bot.sendMessage(chatId, `
            // Локация: ${data?.country}
            // Зп от: ${data?.salary_from}
            // Локация: ${data?.country}
            // `);
            // await bot.sendMessage(chatId, 'Ваша улица: ' + data?.street);

            // setTimeout(async () => {
            //     await bot.sendMessage(chatId, 'Найдено кандидатов: 3', {
            //         reply_markup: {
            //             inline_keyboard: [
            //                 [{text: 'Посмотреть кандидатов', web_app: {url: webAppUrl + '/applicants'}}]
            //             ]
            //         }
            //     })
            //     // await bot.sendMessage(chatId, 'Найдено кандидатов: 3');
            // }, 3000)
        } catch (e) {
            console.log(e);
        }
    }

    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Received your message');
});
