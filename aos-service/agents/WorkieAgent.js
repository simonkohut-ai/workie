const { GoogleGenerativeAI, SchemaType } = require('@google/generative-ai');
const dotenv = require('dotenv');
const { recordUsage } = require('../utils/usage-tracker');

dotenv.config();

class WorkieAgent {
  constructor() {
    // Initialize Google GenAI
    const apiKey = process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.warn('GOOGLE_API_KEY is not set in environment variables.');
    }
    this.genAI = new GoogleGenerativeAI(apiKey);
    this.modelName = 'gemini-2.5-flash-preview-09-2025';
  }

  /**
   * Executes the Freelancer Admin workflow on a transcript.
   * @param {string} transcriptText
   * @param {string} userId
   * @returns {Promise<Object>} JSON object with summary, actionItems, and draftEmail
   */
  async executeTask(transcriptText, userId) {
    console.log(`[WorkieAgent] Starting task execution for user: ${userId}...`);
    
    try {
      const model = this.genAI.getGenerativeModel({
        model: this.modelName,
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
              summary: { type: SchemaType.STRING, description: "Summarize the transcript into 3 key decisions made." },
              actionItems: { 
                type: SchemaType.ARRAY, 
                items: { type: SchemaType.STRING },
                description: "List all specific action items with assigned owners."
              },
              draftEmail: { type: SchemaType.STRING, description: "A professional, concise, friendly follow-up email draft." }
            },
            required: ["summary", "actionItems", "draftEmail"]
          }
        }
      });

      const prompt = `
You are Workie, a Freelancer Admin Agent. Your goal is to help manage administrative tasks with a friendly, competent tone (aligned with workie_vision_values.md).

Analyze the following transcript text and perform three actions:
1. Summarize the transcript into 3 key decisions made.
2. Extract and list all specific action items with assigned owners (if mentioned).
3. Write a professional, concise follow-up email draft based on the summary and action items, addressed to the client. Use a friendly competence tone.

TRANSCRIPT:
${transcriptText}
`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      let actualTokensUsed = 0;
      // Log usage if available
      if (response.usageMetadata) {
          actualTokensUsed = response.usageMetadata.totalTokenCount || 0;
          console.log(`[WorkieAgent] Token Usage - Prompt: ${response.usageMetadata.promptTokenCount}, Candidates: ${response.usageMetadata.candidatesTokenCount}, Total: ${actualTokensUsed}`);
      } else {
          // Fallback/Simulation if metadata is missing
          actualTokensUsed = 100; 
          console.log('[WorkieAgent] Token usage data not available in response metadata. Using placeholder: ' + actualTokensUsed);
      }

      // Record usage
      if (userId) {
        await recordUsage(userId, actualTokensUsed);
      } else {
        console.warn('[WorkieAgent] No userId provided, skipping usage recording.');
      }

      console.log('[WorkieAgent] Task execution completed successfully.');

      return JSON.parse(text);

    } catch (error) {
      console.error('[WorkieAgent] Error executing task:', error);
      throw error;
    }
  }
}

module.exports = new WorkieAgent();
