import React, { useState } from 'react';
import { CheckCircle2, Send } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }
    setError('');
    setSubscribed(true);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#EFE3D8] border-t border-[#E3D4C7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Title */}
        <h2 className="font-serif text-3xl sm:text-4xl text-[#1C1917] font-semibold tracking-tight mb-3">
          Join the Luméa Community
        </h2>

        {/* Subtitle */}
        <p className="text-sm sm:text-base text-[#685D52] max-w-xl mx-auto mb-8 leading-relaxed">
          Be the first to know about new arrivals, exclusive offers and style inspiration.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 bg-white/90 text-[#2B2520] px-6 py-4 rounded-xl shadow-sm border border-[#DAC8B8] max-w-md mx-auto">
            <CheckCircle2 className="w-5 h-5 text-[#2E7D32] flex-shrink-0" />
            <div className="text-left text-sm">
              <p className="font-semibold text-[#1C1917]">You’re in the Luméa club!</p>
              <p className="text-xs text-[#6E645A]">Enjoy 15% off your first order with code <strong>LUMEA15</strong></p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-xl mx-auto"
          >
            <div className="relative w-full">
              <input
                type="email"
                id="newsletter-email-input"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Your email address"
                className="w-full px-5 py-3.5 bg-white text-[#1C1917] placeholder-[#9E9285] rounded-sm text-sm border border-[#D5C6B7] focus:outline-none focus:ring-2 focus:ring-[#1C1917] focus:border-transparent transition-all shadow-sm"
              />
              {error && (
                <span className="absolute -bottom-5 left-2 text-[11px] text-[#B85D3B] font-medium">
                  {error}
                </span>
              )}
            </div>

            <button
              type="submit"
              id="newsletter-subscribe-btn"
              className="w-full sm:w-auto flex-shrink-0 px-8 py-3.5 bg-[#1C1917] hover:bg-[#342D27] text-white text-sm font-medium tracking-wide rounded-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2"
            >
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
