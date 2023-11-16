import { NextRequest, NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

import FilterModel, {
  filterSchema,
  FilterInterface,
} from "../../model/filter";
import { model, connect } from "mongoose";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('=========================================================')
    console.log('body',body);
    console.log('=========================================================')

    const {payload} = body
    if (!payload) {
      return new NextResponse("messages required", { status: 400 });
    }
 
    await connect(process.env.MONGO_DB_HOST+"/newdb");
    let q: FilterInterface = {
      grade:payload.grade,
      topic:payload.topic,
      sub_topic:payload.sub_topic
    };
    let newFilter = new FilterModel(q);
    await newFilter.save();

    const all:FilterInterface[] = await FilterModel.find({});
    return NextResponse.json({data:all, status:200});

  } catch (error) {
    console.log("[FILTER_CREATION_ERROR]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(req: Request) {
  try {

      console.log('-----------------------------------------------------')
      console.log(`process.env.MONGO_DB_HOST :>>`, process.env.MONGO_DB_HOST)
      console.log('-----------------------------------------------------')

    await connect(process.env.MONGO_DB_HOST+"/newdb");
    const all:FilterInterface[] = await FilterModel.find({});

    return NextResponse.json({ data: all, status: 200 });
  } catch (error) {
    console.log("=========================================================");
    console.log("error GET routes.ts 62", error);
    console.log("=========================================================");
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    await connect(process.env.MONGO_DB_HOST+"/newdb");
    const resp = await FilterModel.findByIdAndDelete(
      req.nextUrl.searchParams.get("id")
    );
    console.log("=========================================================");
    console.log("resp", resp);
    console.log("=========================================================");
    return NextResponse.json({ data: " all", status: 200 });
  } catch (error) {
    console.log("=========================================================");
    console.log("error GET routes.ts 62", error);
    console.log("=========================================================");
    return new NextResponse("Internal error", { status: 500 });
  }
}
