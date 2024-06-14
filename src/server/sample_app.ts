import "../../test/bootstrap";
import { SelfGenCotChain } from "../chains/self_gen_cot_chain";
import { ExplainAgent } from '../../src/agents/explain_agent';
import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const app = express();
app.use(cors({ origin: "*" }));

const chain = new SelfGenCotChain();
const agent = new ExplainAgent();

app.get("/explain", async (req: any, res: any) => {
    const input = req.query.input;
    const chat_history = req.query.chat_history;
    const input2 = {
        input: input,
        chat_history: chat_history,
    }
    if (input && typeof input === "string" && chat_history && typeof chat_history === "string") {
        const response = await agent.run(input2);
        res.json(response);
    } else {
        res.json({ error: "No message provided" });
    }
});


app.get("/chain", async (req: any, res: any) => {
    const question = req.query.question;
    const answer = req.query.answer;
    const input = {
        question: question,
        answer: answer,
    }
    if (question && typeof question === "string" && answer && typeof answer === "string") {
        const response = await chain.call(input);
        res.json(response);
    } else {
        res.json({ error: "No message provided" });
    }
});


app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});

export default app;