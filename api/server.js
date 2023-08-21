import express from "express";
import cors from "cors";
// import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

// dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    res.status(200).send({
        message:
            "This is ChatGPT AI APP server url, please visit https://chatgpt-ai-app-od21.onrender.com",
    });
});

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

app.post("/", async (req, res) => {
    try {
        const response = openai.createChatCompletion({
            model:"gpt-3.5-turbo",
            messages: [{role:"user",content:req.body.input}]
        }).then(async (rs) =>{
            // console.log(rs.data.choices[0].message.content,' -> res')
            // console.log(rs,' -> rs')
            // rsp = rs.data.choices[0].message.content;
           
            // say.speak(rsp);
            res.status(200).json({
                bot: rs.data.choices[0].message.content
            })
            // console.log(rsp, " -> res");
        })
        // await openai.createCompletion({
        //     model: "gpt-3.5-turbo",
        //     messages:[
                
        //         {"role": "user", "content": req.body.input}
        //     ]
           
        // });
        // console.log("PASSED: ", req.body.input);

        // res.status(200).send({
        //     bot: response.data.choices[0].text,
        // });
    } catch (error) {
        console.log("FAILED:", req.body.input);
        console.error(error);
        res.status(500).send(error);
    }
});

app.listen(4000, () => console.log("Server is running on port 4000"));
