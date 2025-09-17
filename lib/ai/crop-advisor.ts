import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export interface CropAdviceRequest {
  cropName: string
  location: string
  season: string
  soilType?: string
  farmSize?: number
  specificIssue?: string
  adviceType: "planting" | "care" | "harvest" | "disease" | "pest"
}

export async function generateCropAdvice(request: CropAdviceRequest): Promise<{
  advice: string
  confidence: number
}> {
  const prompt = `You are an expert agricultural advisor for Indian farmers. Provide practical, actionable advice for the following scenario:

Crop: ${request.cropName}
Location: ${request.location}
Season: ${request.season}
Soil Type: ${request.soilType || "Not specified"}
Farm Size: ${request.farmSize ? `${request.farmSize} acres` : "Not specified"}
Advice Type: ${request.adviceType}
${request.specificIssue ? `Specific Issue: ${request.specificIssue}` : ""}

Please provide:
1. Specific, actionable advice for this ${request.adviceType} scenario
2. Best practices relevant to the location and season
3. Common mistakes to avoid
4. Expected timeline or frequency for recommended actions
5. Cost-effective solutions suitable for small to medium farmers

Keep the advice practical, culturally appropriate for Indian farming practices, and easy to understand. Focus on sustainable and economically viable solutions.`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      maxTokens: 500,
    })

    // Calculate confidence based on specificity of input
    let confidence = 0.7 // Base confidence
    if (request.soilType) confidence += 0.1
    if (request.farmSize) confidence += 0.1
    if (request.specificIssue) confidence += 0.1
    confidence = Math.min(confidence, 0.95) // Cap at 95%

    return {
      advice: text,
      confidence: Math.round(confidence * 100) / 100,
    }
  } catch (error) {
    console.error("Error generating crop advice:", error)
    throw new Error("Failed to generate crop advice")
  }
}

export async function generateWeatherBasedAdvice(
  cropName: string,
  weatherCondition: string,
  location: string,
): Promise<string> {
  const prompt = `As an agricultural expert, provide immediate advice for farmers growing ${cropName} in ${location} facing ${weatherCondition} weather conditions. 

Focus on:
1. Immediate protective measures
2. Preventive actions for crop protection
3. Post-weather recovery steps if needed
4. Equipment or materials needed

Keep advice concise and actionable for immediate implementation.`

  try {
    const { text } = await generateText({
      model: openai("gpt-4o-mini"),
      prompt,
      maxTokens: 300,
    })

    return text
  } catch (error) {
    console.error("Error generating weather-based advice:", error)
    throw new Error("Failed to generate weather advice")
  }
}
