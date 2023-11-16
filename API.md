`http://localhost:3000/api/

conversation
filters
image
single_question
upload
`

http://localhost:3000/api/ this is the base url and the remaining parts listed below are the modules each module has 
POST, GET, DELETE, UPDATE operations
 
####  e.g., if you GET http://localhost:3000/api/conversation it will return all the questions generated, here is the models :


export interface QuestionInterface {
  _id?: string;
  prompt: string;
  response: string;
  topic: string;
  sub_topic: string;
  grade: string;
  image_url?: string;
  img_gen_prompt_question?: string;
  img_gen_prompt_solution?: string;
  date?: Date;
}
export interface SingleQuestionInterface {
  _id?: string;
  prompt: string;
  question:string;
  correct_answer:string;
  solution:string;
  topic: string;
  sub_topic: string;
  grade: string;
  image_url?: string;
  img_gen_prompt_question?: string;
  img_gen_prompt_solution?: string;
  date?: Date;
}

export const questionSchema = new Schema<QuestionInterface>({
  prompt: {
    type: String,
  },
  response: {
    type: String,
  },
  grade: {
    type: String,
  },
  topic: {
    type: String,
  },
  sub_topic: {
    type: String,
  },
  image_url: {
    type: String,
  },
  img_gen_prompt_question: {
    type: String,
  },
  img_gen_prompt_solution: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const singleQuestionSchema = new Schema<SingleQuestionInterface>({
  prompt: {
    type: String,
  },
  question: {
    type: String,
  },
  solution: {
    type: String,
  },
  correct_answer: {
    type: String,
  },
  grade: {
    type: String,
  },
  topic: {
    type: String,
  },
  sub_topic: {
    type: String,
  },
  img_gen_prompt_question: {
    type: String,
  },
  img_gen_prompt_solution: {
    type: String,
  },
  image_url: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});



# rest of the models are in  src/app/model folder