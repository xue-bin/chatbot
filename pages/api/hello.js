import OpenAI from "openai";

const openai = new OpenAI();

export default async function handler(req, res) {
  const name = req.body.pet
  try {
    // Process a POST request
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: "Please help me generatet a name for the following animal, provide at least 3 names: " + name }],
      model: "gpt-3.5-turbo",
    })

    const image = await openai.images.generate({prompt: "A cute" + name})

    console.log(image.data)
    const response = {
      completion: completion.choices[0],
      image: image.data
    }
    res.status(200).json(response)
  } catch (error) {
    // Handle any other HTTP method
    if (error.image) {
      console.log(error.image.status);
      console.log(error.image.data);
  } else {
      console.log(error.message);
  }
  }
}