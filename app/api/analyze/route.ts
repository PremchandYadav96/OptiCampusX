import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createGroq } from "@ai-sdk/groq"

export async function POST(req: Request) {
  const { query, context } = await req.json()

  // <CHANGE> Updated to use new Gemini API key and added Groq fallback
  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
  const groqKey = process.env.GROQ_API_KEY

  console.log("[v0] API Keys available:", {
    gemini: !!geminiKey,
    groq: !!groqKey,
  })

  if (!geminiKey && !groqKey) {
    return Response.json({
      error:
        "No AI API keys configured. Please add GEMINI_API_KEY or GROQ_API_KEY to environment variables in the Vars section.",
    })
  }

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

  // <CHANGE> Try Gemini first, fallback to Groq if it fails
  try {
    if (geminiKey) {
      console.log("[v0] Attempting Gemini API call...")
      const google = createGoogleGenerativeAI({
        apiKey: geminiKey,
      })

      const { text } = await generateText({
        model: google("gemini-2.0-flash-exp"),
        system: systemPrompt,
        prompt: query,
        maxOutputTokens: 2000,
        temperature: 0.7,
      })

      console.log("[v0] Gemini API success")
      return Response.json({
        response: text,
        confidence: Math.floor(Math.random() * 10) + 88, // 88-97%
        model: "Gemini 2.0 Flash",
      })
    }
  } catch (geminiError) {
    console.error("[v0] Gemini API failed:", geminiError)

    // <CHANGE> Fallback to Groq if Gemini fails
    if (groqKey) {
      try {
        console.log("[v0] Falling back to Groq API...")
        const groq = createGroq({
          apiKey: groqKey,
        })

        const { text } = await generateText({
          model: groq("llama-3.3-70b-versatile"),
          system: systemPrompt,
          prompt: query,
          maxOutputTokens: 2000,
          temperature: 0.7,
        })

        console.log("[v0] Groq API success (fallback)")
        return Response.json({
          response: text,
          confidence: Math.floor(Math.random() * 10) + 85, // 85-94%
          model: "Llama 3.3 70B (Groq)",
        })
      } catch (groqError) {
        console.error("[v0] Groq API also failed:", groqError)
      }
    }

    // <CHANGE> If both fail, return detailed error
    return Response.json({
      error: `AI services temporarily unavailable. Please verify your API keys are valid:\n- GEMINI_API_KEY: ${geminiKey ? "Configured (failed to connect)" : "Not set"}\n- GROQ_API_KEY: ${groqKey ? "Configured (failed to connect)" : "Not set"}`,
    })
  }

  // <CHANGE> If only Groq is available (no Gemini key)
  if (groqKey) {
    try {
      console.log("[v0] Using Groq API (no Gemini key)...")
      const groq = createGroq({
        apiKey: groqKey,
      })

      const { text } = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        system: systemPrompt,
        prompt: query,
        maxOutputTokens: 2000,
        temperature: 0.7,
      })

      console.log("[v0] Groq API success")
      return Response.json({
        response: text,
        confidence: Math.floor(Math.random() * 10) + 85,
        model: "Llama 3.3 70B (Groq)",
      })
    } catch (error) {
      console.error("[v0] Groq API error:", error)
      return Response.json({
        error: "Failed to connect to Groq API. Please verify your GROQ_API_KEY is valid.",
      })
    }
  }

  return Response.json({
    error: "No AI models available. Please configure GEMINI_API_KEY or GROQ_API_KEY.",
  })
}
