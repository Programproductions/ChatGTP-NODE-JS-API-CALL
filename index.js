require('dotenv').config()
const axios = require('axios');

let apiKey = process.env.OPENAI_API_KEY

async function chatGTP(input) {
    try {
        let data = JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "system", "content": "You are a helpful assistant." },
                { "role": "user", "content": "Who won the world series in 2020?" },
                { "role": "assistant", "content": "The Los Angeles Dodgers won the World Series in 2020." },
                { "role": "user", "content": input }
            ]
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://api.openai.com/v1/chat/completions',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            data: data
        };
        let completion = await axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                let output = response.data.choices[0].message;
                return output
            })
            .catch(function (error) {
                console.log(error, 'error in calling chat completion');
            });
        console.log('CHATGTP response', completion)
        return completion
    } catch (e) {
        console.log(e, ' error in the callChatGTP function')
    }
}

let input = "Whats the capital of England?"
let chat = chatGTP(input)

module.exports = {
    chatGTP
}



