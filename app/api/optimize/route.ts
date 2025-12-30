import { generateText } from "ai"
import { createGoogleGenerativeAI } from "@ai-sdk/google"
import { createGroq } from "@ai-sdk/groq"
import { kpiData, sampleAnomalies } from "@/lib/sample-data"

export async function POST(req: Request) {
  const { costWeight, sustainabilityWeight, comfortEnabled } = await req.json()

  const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY
  const groqKey = process.env.GROQ_API_KEY

  console.log("[v0] Optimization API - Keys available:", {
    gemini: !!geminiKey,
    groq: !!groqKey,
  })

  if (!geminiKey && !groqKey) {
    return Response.json({
      error: "No AI API keys configured. Please add GEMINI_API_KEY or GROQ_API_KEY.",
    })
  }

  const systemPrompt = `You are an optimization engine for OptiCampus-X, a smart campus resource management system for VIT-AP University, Amaravati.

Your task is to generate an optimal resource schedule for the next 24 hours across 17+ VIT-AP campus buildings:

**Academic Blocks:**
- Academic Block-1 (Sarvepalli Radhakrishnan)
- Central Block (Mahatma Gandhi) 
- Academic Block-2 (APJ Abdul Kalam)

**Men's Hostels:**
- MH-1 (Sarojini Naidu Block)
- MH-2 (Rabindranath Tagore Block)
- MH-3 (Neelam Sanjiva Reddy Block)
- MH-4, MH-5, MH-6

**Ladies' Hostels:**
- LH-1, LH-2, LH-3, LH-4

**Support Facilities:**
- Student Activity Centre (SAC)
- Central Library
- Main Cafeteria

**Current Campus Status:**
- Electricity Saved: ${kpiData.electricitySaved.value}%
- Water Saved: ${kpiData.waterSaved.value}%
- Cost Savings: ${kpiData.costSavings.value}
- Active Anomalies: ${sampleAnomalies.length}

**Optimization Parameters:**
- Cost Minimization Weight: ${costWeight}%
- Sustainability Priority Weight: ${sustainabilityWeight}%
- Comfort Constraints Enabled: ${comfortEnabled ? "Yes" : "No"}

**Constraints:**
- Academic class timings: 8 AM - 5 PM (Monday-Friday)
- Hostel active hours: 6 AM - 11 PM
- Library hours: 8 AM - 10 PM
- Minimum room temperature: 24°C (if comfort enabled)
- Student density patterns: High (9 AM-12 PM, 2 PM-5 PM), Medium (6 PM-9 PM), Low (other times)

**Active Anomalies:**
${sampleAnomalies.map((a) => `- ${a.location}: ${a.description} (${a.severity} severity)`).join("\n")}

Generate a JSON array of 6-8 optimization actions with this exact structure:
{
  "resource": "AC Units" | "Lighting" | "Lab Equipment" | "Water Pumps" | "Corridor Lights" | "Fans" | "Heating",
  "location": "VIT-AP building name (with block name if applicable)",
  "currentStatus": "On" | "Off" | "Standby" | "100%" | etc,
  "recommendedAction": "Specific actionable recommendation",
  "savings": "₹X,XXX/day",
  "reason": "Clear explanation considering student comfort, schedules, and campus patterns"
}

Focus on:
1. Real energy/water savings opportunities based on occupancy patterns
2. VIT-AP specific building names and locations
3. Actionable recommendations facility management can implement
4. Balancing cost savings with student comfort
5. Addressing any active anomalies in your recommendations

Return ONLY valid JSON array, no markdown formatting.`

  try {
    if (geminiKey) {
      console.log("[v0] Optimization - Attempting Gemini API...")
      const google = createGoogleGenerativeAI({
        apiKey: geminiKey,
      })

      const { text } = await generateText({
        model: google("gemini-2.0-flash-exp"),
        system: systemPrompt,
        prompt: "Generate the optimal resource schedule for VIT-AP campus for the next 24 hours.",
        maxOutputTokens: 3000,
        temperature: 0.5,
      })

      console.log("[v0] Optimization - Gemini success")

      // Parse the JSON response
      const cleanedText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim()
      const schedule = JSON.parse(cleanedText)

      // Calculate total savings
      const totalSavings = schedule.reduce((acc: number, item: { savings: string }) => {
        const num = Number.parseInt(item.savings.replace(/[₹,]/g, ""))
        return acc + num
      }, 0)

      return Response.json({
        schedule,
        totalSavings,
        model: "Gemini 2.0 Flash",
      })
    }
  } catch (geminiError) {
    console.error("[v0] Optimization - Gemini failed:", geminiError)

    if (groqKey) {
      try {
        console.log("[v0] Optimization - Falling back to Groq...")
        const groq = createGroq({
          apiKey: groqKey,
        })

        const { text } = await generateText({
          model: groq("llama-3.3-70b-versatile"),
          system: systemPrompt,
          prompt: "Generate the optimal resource schedule for VIT-AP campus for the next 24 hours.",
          maxOutputTokens: 3000,
          temperature: 0.5,
        })

        console.log("[v0] Optimization - Groq success (fallback)")

        const cleanedText = text
          .replace(/```json\n?/g, "")
          .replace(/```\n?/g, "")
          .trim()
        const schedule = JSON.parse(cleanedText)

        const totalSavings = schedule.reduce((acc: number, item: { savings: string }) => {
          const num = Number.parseInt(item.savings.replace(/[₹,]/g, ""))
          return acc + num
        }, 0)

        return Response.json({
          schedule,
          totalSavings,
          model: "Llama 3.3 70B (Groq)",
        })
      } catch (groqError) {
        console.error("[v0] Optimization - Groq also failed:", groqError)
      }
    }

    return Response.json({
      error: `Optimization failed. AI services unavailable.`,
    })
  }

  if (groqKey) {
    try {
      console.log("[v0] Optimization - Using Groq (no Gemini key)...")
      const groq = createGroq({
        apiKey: groqKey,
      })

      const { text } = await generateText({
        model: groq("llama-3.3-70b-versatile"),
        system: systemPrompt,
        prompt: "Generate the optimal resource schedule for VIT-AP campus for the next 24 hours.",
        maxOutputTokens: 3000,
        temperature: 0.5,
      })

      console.log("[v0] Optimization - Groq success")

      const cleanedText = text
        .replace(/```json\n?/g, "")
        .replace(/```\n?/g, "")
        .trim()
      const schedule = JSON.parse(cleanedText)

      const totalSavings = schedule.reduce((acc: number, item: { savings: string }) => {
        const num = Number.parseInt(item.savings.replace(/[₹,]/g, ""))
        return acc + num
      }, 0)

      return Response.json({
        schedule,
        totalSavings,
        model: "Llama 3.3 70B (Groq)",
      })
    } catch (error) {
      console.error("[v0] Optimization - Groq error:", error)
      return Response.json({
        error: "Failed to generate optimization schedule.",
      })
    }
  }

  return Response.json({
    error: "No AI models available for optimization.",
  })
}
