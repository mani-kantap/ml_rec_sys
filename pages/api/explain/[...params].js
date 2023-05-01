import axios from 'axios';
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
    apiKey: "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",
  });

const openai = new OpenAIApi(configuration);


export default async function handler(req, res) {
    console.log("Inside explain api")
    const params = req.query.params
    if(params.length == 2){
    try {
        const id1 = params[0];
        const id2 = params[1];
        console.log(id1) 
        console.log(id2)
        // Make a GET request to retrieve the details of ID1 and ID2 from the external API
        const [json1, json2] = await Promise.all([
          fetch(`https://recs_paper-1-w3981585.deta.app/${id1}`),
          fetch(`https://recs_paper-1-w3981585.deta.app/${id2}`),
        ]);
        
        const response1 = await json1.json();
        const response2 = await json2.json();

        // Create a JSON object that includes the details of both IDs
        // const json = {
        //   id1: response1.data,
        //   id2: response2.data,
        // };
        // console.log(response1)
        // console.log(response2)
        console.log("Making an api call")

        const prompt = "First Paper: " + response1.results.title+ " "+ response1.results.summary + "\n Recommended Paper: " +response2.results.title+ " "+ response2.results.summary + "\n" + "###" + 
        "\n" + "Explain the reason for suggesting recommended paper for the first paper in 2 lines ?";

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: prompt}],
          });
        // console.log(completion.data)

        const paper1_ =  response1.results.title + " " + response1.results.summary
        const paper2_ =  response2.results.title + " " + response2.results.summary
        
        res.status(200).json({ message: completion.data.choices[0].message.content,
        paper1: paper1_,
        paper2: paper2_});

      } catch (error) {
        // If there was an error with the external API request, send an error response back to the client
        console.log(error)
        res.status(500).json({ message: 'Error retrieving details from external API.' });
      }
    }
  }
  