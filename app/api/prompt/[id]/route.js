import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET (get)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

// PATCH (edit)
export const PATCH = async (request, { params }) => {
  try {
    await connectToDB();

    const existingPrompt = await Prompt.findById(params.id).populate("creator");

    if (!existingPrompt)
      return new Response("Prompt does not exist", { status: 404 });

    const { prompt, tag } = await request.json();

    existingPrompt.tag = tag;
    existingPrompt.prompt = prompt;

    await existingPrompt.save();

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt", { status: 500 });
  }
};

// DELETE (delete)
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfuly", { status: 200 });
  } catch (error) {
    return new Response("Failed to delete prompt", { status: 500 });
  }
};
