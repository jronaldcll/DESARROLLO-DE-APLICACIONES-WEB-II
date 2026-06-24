import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, delay } from 'rxjs/operators';

export interface AiConfig {
  provider: 'openai' | 'gemini' | 'claude' | 'none';
  apiKey: string;
  model: string;
}

interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: {
        text: string;
      }[];
    };
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class AiService {
  private readonly STORAGE_KEY = 'cliniva_ai_config';

  constructor(private http: HttpClient) {}

  /**
   * Saves the AI configuration to local storage
   */
  saveConfig(config: AiConfig): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(config));
  }

  /**
   * Retrieves the AI configuration from local storage
   */
  getConfig(): AiConfig {
    const config = localStorage.getItem(this.STORAGE_KEY);
    return config
      ? JSON.parse(config)
      : { provider: 'none', apiKey: '', model: '' };
  }

  /**
   * Checks if AI is configured with an API key
   */
  isAiEnabled(): boolean {
    const config = this.getConfig();
    return config.provider !== 'none' && config.apiKey.length > 0;
  }

  /**
   * Sends a prompt to the configured AI provider
   */
  postPrompt(prompt: string): Observable<string> {
    const config = this.getConfig();

    if (!this.isAiEnabled()) {
      // Return mock data if AI is not enabled (for demo purposes)
      return of(`[DEMO MODE] This is a sample AI response to your prompt: "${prompt}". Please configure an API key in settings to see real AI results.`).pipe(delay(1500));
    }

    if (config.provider === 'openai') {
      return this.callOpenAI(prompt, config);
    } else if (config.provider === 'gemini') {
      return this.callGemini(prompt, config);
    }

    return throwError(() => new Error('Unsupported AI provider'));
  }

  private callOpenAI(prompt: string, config: AiConfig): Observable<string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${config.apiKey}`,
    });

    const body = {
      model: config.model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    };

    return this.http.post<OpenAIResponse>('https://api.openai.com/v1/chat/completions', body, { headers }).pipe(
      map(res => res.choices[0].message.content),
      catchError(err => {
        const errorMsg = err.error?.error?.message || err.statusText || 'OpenAI API Error';
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  private callGemini(prompt: string, config: AiConfig): Observable<string> {
    const modelName = (config.model || 'gemini-1.5-flash').trim();
    const apiKey = (config.apiKey || '').trim();
    
    // Using the exact URL and Header structure from your working CURL command
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-goog-api-key': apiKey
    });

    const body = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    return this.http.post<GeminiResponse>(url, body, { headers }).pipe(
      map(res => {
        if (res.candidates && res.candidates[0].content && res.candidates[0].content.parts) {
          return res.candidates[0].content.parts[0].text;
        }
        throw new Error('Invalid response structure from Gemini');
      }),
      catchError(err => {
        let errorMsg = 'Gemini API Error';
        if (err.error?.error?.message) {
          errorMsg = err.error.error.message;
        } else if (err.status === 404) {
          errorMsg = `Model "${modelName}" not found at v1beta endpoint.`;
        } else {
          errorMsg = err.statusText || 'Connection Failed';
        }
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  /**
   * Test connection helper
   */
  testConnection(): Observable<boolean> {
    return this.postPrompt('Respond with "Connected"').pipe(
      map(res => res.toLowerCase().includes('connected')),
      catchError(() => of(false))
    );
  }
}
