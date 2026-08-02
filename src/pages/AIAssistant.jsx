import React, { useState } from 'react';

const Loader = () => (
  <div className="flex flex-col items-center justify-center p-8 gap-4">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
    <p className="text-sm font-bold text-slate-500 uppercase tracking-widest animate-pulse">AI is thinking...</p>
  </div>
);

export default function AIAssistant({ user }) {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse('');

    try {
      const token = localStorage.getItem('token');
      
      const res = await fetch('[https://hillstay-ai-1.onrender.com](https://hillstay-ai-1.onrender.com)/api/ai/travel-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ prompt })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to connect to AI');
      }

      setResponse(data.answer);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (text) => {
    return text.split('\n').map((line, index) => {
      // Replace **text** with bold tags
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <p key={index} className="mb-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: formattedLine }} />
      );
    });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 p-6 md:p-12 flex justify-center">
      <div className="max-w-4xl w-full flex flex-col md:flex-row gap-8">
        
        {/* Left Side: Input Area */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-light text-slate-900 mb-2">AI Concierge</h1>
            <p className="text-sm text-slate-500">Ask our AI for travel advice, packing lists, or eco-tourism tips for your next HillStay trip.</p>
          </div>

          <form onSubmit={handleAskAI} className="flex flex-col gap-4">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., I am planning a 3-day winter trip to a mountain homestay. What should I pack?"
              className="w-full h-40 p-4 border border-slate-200 rounded-lg outline-none focus:border-emerald-600 transition resize-none bg-white shadow-sm"
              disabled={isLoading}
            ></textarea>
            <button 
              type="submit" 
              disabled={isLoading || !prompt.trim()}
              className="bg-slate-900 hover:bg-emerald-700 text-white font-bold uppercase tracking-widest py-4 rounded-lg transition disabled:opacity-50"
            >
              Ask AI
            </button>
          </form>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 text-red-700 text-sm font-bold">
              {error}
            </div>
          )}
        </div>

        {/* Right Side: Response Area */}
        <div className="w-full md:w-2/3 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden flex flex-col h-[600px]">
          <div className="bg-slate-900 text-white p-4 flex items-center gap-3">
            <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center font-bold">AI</div>
            <span className="font-semibold tracking-wide">HillStay Assistant</span>
          </div>
          
          <div className="p-8 flex-1 overflow-y-auto">
            {!isLoading && !response && (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 gap-4">
                <p>Hello, {user?.name || 'Traveler'}! Ask me anything about your upcoming stay.</p>
              </div>
            )}
            
            {isLoading && <Loader />}
            
            {response && !isLoading && (
              <div className="text-slate-700 fade-in">
                {formatResponse(response)}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}