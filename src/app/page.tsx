"use client";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilterInterface } from "./model/filter";

interface questionInteface {
  prompt: string;
  _id?: string;
  response: string;
}

export default function Page() {
  const router = useRouter();
  const [messages, setMessages] = useState<ChatCompletionRequestMessage[]>([]);
  const [questions, setQuestions] = useState<questionInteface[]>([]);
  const [filters, setFilters] = useState<FilterInterface[]>([]);
  const [grades, setGrades] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);

  async function onSubmit(data: FormData) {
    console.log();
    const grade = data.get("grade");
    const topic = data.get("topic");
    const sub_topic = data.get("sub_topic");
    if (grade == "Choose a Grade") {
      alert("please select a grade");
      return;
    }
    if (!topic && topic == "Choose a Topic") {
      alert("please select a topic");
      return;
    }
    const number_of_questins = 2;
    let prompt: string = `act as an expert mathematics tutor for young students of ${grade} grade and create ${number_of_questins} questions
     on the topic ${topic} and sub topic ${sub_topic}. Your response should be a valid json with question number as the key and three things in the value 
     1. the generated question as 'question', 2. correct answer as 'correct_answer' 3. step by step solution to the question as the value as 'solution'. 
    Remember your response should be only valid json.  don't add any other affirmations. don't say sure, here are two math questions `;

    console.log("=========================================================");
    console.log("prompt", prompt);
    console.log("=========================================================");
    try {
      const userMessage: ChatCompletionRequestMessage = {
        role: "user",
        content: prompt,
      };

      // const newMessages = [...messages, userMessage];
      const messages = {
        messages: { messages: [userMessage] },
        grade,
        topic,
        sub_topic,
      };

      const response = await axios.post("/api/conversation", { messages });
      console.log("=========================================================");
      console.log("response", response);
      console.log("=========================================================");
      setMessages((current) => [...current, userMessage, response.data]);
    } catch (error) {
      console.log("========== ", error);
    } finally {
      router.refresh();
    }
  }

  useEffect(() => {
    async function getAllFilters() {
      try {
        const response = await axios.get("/api/filters");

        const topics_set = new Set(
          response.data.data.map((x: FilterInterface) => x.topic)
        );
        const topics_: any[] = Array.from(topics_set);
        setTopics(topics_);
        const grades_set = new Set(
          response.data.data.map((x: FilterInterface) => x.topic)
        );
        const grades_: any[] = Array.from(grades_set);
        setGrades(grades_);

        setFilters(response.data.data);
      } catch (error) {
        console.log("error getting filters 45", error);
      }
    }
    getAllFilters();
  }, []);

  useEffect(() => {
    async function getAllQuestions() {
      try {
        const response = await axios.get("/api/conversation");

        console.log(
          "========================================================="
        );
        console.log("response", response);
        console.log("response", response.data);
        setQuestions(response.data.data);
        console.log(
          "========================================================="
        );
      } catch (error) {
        console.log(
          "========================================================="
        );
        console.log("error 45", error);
        console.log(
          "========================================================="
        );
      }
    }
    getAllQuestions();
  }, [messages]);
  async function deleteQuestion(id: any) {
    console.log("=========================================================");
    console.log("id", id);
    console.log("=========================================================");
    try {
      const response = await axios.delete("/api/conversation", {
        params: { id },
      });
      if (response.status == 200) {
        setQuestions((prevData) => prevData.filter((d) => d._id != id));
      }
      console.log(
        "=========================================================",
        response
      );
    } catch (error) {
      console.log("=========================================================");
      console.log("error 85", error);
      console.log("=========================================================");
    } finally {
    }
  }
  return (
    // <div className="justify-center h-screen p-3 text-white ">
    <>
      <div className="flex flex-col   space-y-3 p-6">
        <div className=" p-3">
          <h1 className=" text-lg text-blue-400 mb-3 ">Create Questions</h1>

          <form className="flex s  justify-between flex-wrap" action={onSubmit}>
             
              <div className="w-1/4">
                <label
                  htmlFor="grade"
                  className="block  mb-2 text-sm font-medium text-white-900 dark:text-white"
                >
                  Select a Grade
                </label>
                <select
                  id="grade"
                  name="grade"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue={undefined}>Choose a Grade</option>
                  {grades?.map((grade, i) => (
                    <option key={i} value={grade}>
                      {grade}
                    </option>
                  ))}
                </select>
              </div> 
              <div className="w-1/4">
              <label
                  htmlFor="topic"
                  className="block  mb-2 text-sm font-medium text-white-900 dark:text-white"
                >
                  Select a Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
                    dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option defaultValue={""}>Choose a Topic</option>
                  {topics?.map((topic, i) => (
                    <option key={i} value={topic}>
                      {topic}
                    </option>
                  ))}
                </select>
              </div>
        
              <div className="w-1/4">
                <label
                  htmlFor="sub_topic"
                  className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
                >
                  Enter a sub Topic
                </label>

                <input
                  type="text"
                  name="sub_topic"
                  id="sub_topic"
                  className="text-black w-full rounded-md p-2"
                  placeholder="enter a subtopic"
                />
              </div>
              <div className="w-full m-0" style={{'margin':'0px'}}>

              <button
                type="submit"
                className="w-full p-3 mt-3  rounded-md bg-slate-500 hover:bg-slate-600"
                >
                Generate
              </button>
                </div>
          </form>
        </div>
        <hr className="px-3" />
        <div className="space-y-4  p-3 ">
          <div className="w-full  p-2 space-y-2 h-96 overflow-auto">
            {questions?.map((question, i) => (
              <div
                key={i}
                className=" p-3 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <a href="#">
                  <h5 className="mb-2  font-semibold tracking-tight text-gray-900 dark:text-white">
                    {question.prompt}{" "}
                  </h5>
                </a>
                <div className="flex justify-between">
                  <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                    {question.response}
                  </p>
                  <button
                    className="bg-red-400 p-3 rounded-md hover:cursor-pointer hover:bg-red-500 h-12  "
                    onClick={() => deleteQuestion(question._id)}
                  >
                    delete
                  </button>
                </div>
                {/* <a
                  href="#"
                  className="inline-flex items-center text-blue-600 hover:underline"
                >
                  See our guideline
                </a> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
