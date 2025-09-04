
import { GoogleGenAI, Type } from "@google/genai";
import { TestCaseCategory } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const testCaseSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      category: {
        type: Type.STRING,
        description: "The functional area of the homepage being tested (e.g., 'Header & Navigation')."
      },
      testCases: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            id: {
              type: Type.STRING,
              description: "A unique identifier for the test case, e.g., 'TC-NAV-001'."
            },
            description: {
              type: Type.STRING,
              description: "A clear, concise description of the test action to be performed."
            },
            expectedResult: {
              type: Type.STRING,
              description: "The expected outcome after performing the test action."
            }
          },
          required: ["id", "description", "expectedResult"]
        }
      }
    },
    required: ["category", "testCases"]
  }
};


export const generateTestCases = async (url: string): Promise<TestCaseCategory[]> => {
  try {
    const prompt = `
      Analyze the homepage of the website: ${url}. 
      This is a major car marketplace in the UAE.
      Based on your analysis of its likely features (like car search with filters, featured listings, navigation menus, login/signup flows, language selection), create a comprehensive list of test cases.
      Organize the test cases into logical categories (e.g., 'Header & Navigation', 'Search Functionality', 'Featured Listings', 'Footer', 'Responsiveness').
      For each test case, provide a unique ID, a clear description of the action, and the expected result.
      Return the output as a JSON object that conforms to the provided schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: testCaseSchema,
      },
    });

    const jsonText = response.text.trim();
    const parsedData = JSON.parse(jsonText);

    // Basic validation to ensure the parsed data matches the expected structure
    if (Array.isArray(parsedData) && parsedData.every(cat => cat.category && Array.isArray(cat.testCases))) {
        return parsedData as TestCaseCategory[];
    } else {
        throw new Error("API returned data in an unexpected format.");
    }

  } catch (error) {
    console.error("Error generating test cases:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate test cases: ${error.message}`);
    }
    throw new Error("An unknown error occurred while generating test cases.");
  }
};
