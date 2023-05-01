import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { OpenAIApi, Configuration } from "openai";

const configuration = new Configuration({
    apiKey: process.env.API_KEY
  });

const openai = new OpenAIApi(configuration);


export default function Explain({data}){

    return (
        <div className="flex flex-row justify-center items-center min-h-screen py-2">
        <div className="flex flex-col max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mx-2">
            <div>
            <h1 className="text-gray-700 font-bold text-xl mb-2">Message</h1>
            <p>{data.message}</p>
            </div>
        </div>
        <div className="flex flex-col max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mx-2">
            <div>
            <h1 className="text-gray-700 font-bold text-xl mb-2">Paper 1</h1>
            <p>{data.paper1}</p>
            </div>
        </div>
        <div className="flex flex-col max-w-md py-4 px-8 bg-white shadow-lg rounded-lg mx-2">
            <div>
            <h1 className="text-gray-700 font-bold text-xl mb-2">Paper 2</h1>
            <p>{data.paper2}</p>
            </div>
        </div>
        </div>


          )
    
}


export async function getServerSideProps(context) {
    const { ids } = context.query
    console.log(ids)
    const id1 = ids[0];
    const id2 = ids[1];

    const [json1, json2] = await Promise.all([
        fetch(`https://recs_paper-1-w3981585.deta.app/${id1}`),
        fetch(`https://recs_paper-1-w3981585.deta.app/${id2}`),
      ]);
      
    const response1 = await json1.json();
    const response2 = await json2.json();

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

    
    const data = { message: completion.data.choices[0].message.content,
        paper1: paper1_,
        paper2: paper2_}

    console.log(data)
    return {
        props: { 
            data 
        }, // will be passed to the page component as props
      }
  }
