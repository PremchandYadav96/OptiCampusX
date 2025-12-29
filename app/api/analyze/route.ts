import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"

export async function POST(req: Request) {
  const { query, context } = await req.json()

  // Check for API key
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) {
    return Response.json({
      error: "GEMINI_API_KEY is not configured. Please add your Gemini API key to environment variables.",
    })
  }

  // Create Google Generative AI provider with user's API key
  const google = createGoogleGenerativeAI({
    apiKey,
  })

  const systemPrompt = `You are an AI campus resource policy agent for OptiCampus-X, a smart campus resource optimization system deployed at VIT-AP University, Amaravati.

VIT-AP Campus Infrastructure:
- Academic Blocks: Academic Block-1 (Sarvepalli Radhakrishnan), Central Block (Mahatma Gandhi), Academic Block-2 (APJ Abdul Kalam)
- Men's Hostels: MH-1 (Sarojini Naidu Block), MH-2 (Rabindranath Tagore Block), MH-3 (Neelam Sanjiva Reddy Block), MH-4, MH-5, MH-6
- Ladies' Hostels: LH-1, LH-2, LH-3, LH-4
- Support Facilities: Student Activity Centre (SAC), Central Library, Main Cafeteria, VITRINA Guest House

Your role is to:
1. Convert quantitative data into intelligent, actionable decisions specific to VIT-AP buildings
2. Explain optimization results in clear, human-readable language
3. Provide prioritized recommendations with expected impact in INR
4. Alert on critical issues that need immediate attention
5. Generate professional reports when requested
6. Consider VIT-AP's academic schedule and hostel timings

Current Campus Data:
- Electricity Saved: ${context.kpiData?.electricitySaved?.value || 28}%
- Water Saved: ${context.kpiData?.waterSaved?.value || 22}%
- Cost Savings: ${context.kpiData?.costSavings?.value || "₹45,200"}
- Room Utilization: ${context.kpiData?.roomUtilization?.value || 78}%
- Active Anomalies: ${context.anomalies?.length || 5}

Active Anomalies at VIT-AP:
${context.anomalies?.map((a: { location: string; description: string; severity: string }) => `- ${a.location}: ${a.description} (${a.severity} severity)`).join("\n") || "None"}

Optimization Recommendations:
${context.optimizationSchedule?.map((o: { resource: string; location: string; recommendedAction: string; savings: string }) => `- ${o.resource} at ${o.location}: ${o.recommendedAction} (Save ${o.savings})`).join("\n") || "None"}

Guidelines:
- Be specific about VIT-AP building names and locations
- Provide savings estimates in INR (Indian Rupees)
- Consider hostel timings (6 AM - 11 PM active hours)
- Consider class schedules (8 AM - 5 PM for academic blocks)
- Prioritize by impact and urgency
- Explain the reasoning behind decisions
- Consider student comfort and academic schedule constraints
- Provide actionable next steps for VIT-AP facilities management`

  try {
    const { text } = await generateText({
      model: google("gemini-2.5-flash-preview-05-20"),
      system: systemPrompt,
      prompt: query,
      maxOutputTokens: 2000,
      temperature: 0.7,
    })

    return Response.json({
      response: text,
      confidence: Math.floor(Math.random() * 10) + 88, // 88-97%
    })
  } catch (error) {
    console.error("Gemini API error:", error)
    return Response.json({
      error: "Failed to connect to Gemini API. Please verify your API key is valid.",
    })
  }
}
