import React, { useState } from 'react';
import { X, Copy, Check, GitBranch, Globe, Terminal, ArrowUpRight } from 'lucide-react';

interface DeployGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeployGuideModal: React.FC<DeployGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const gitCommands = `git init
git add .
git commit -m "feat: Luméa fashion brand landing page"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main`;

  const vercelCliCommands = `npm i -g vercel
vercel`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="relative bg-[#FAF8F5] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#E7DFD4] z-10 my-8 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-white border-b border-[#E8E1D7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#1C1917] flex items-center justify-center text-white">
              <GitBranch className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="font-serif text-2xl text-[#1C1917] font-semibold">
                Push to GitHub & Deploy to Vercel
              </h2>
              <p className="text-xs text-[#7A7065]">
                Complete step-by-step guide with pre-configured <code className="bg-[#EFE9DF] px-1.5 py-0.5 rounded text-[#2A241F]">vercel.json</code>.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6E645A] hover:text-[#1C1917] hover:bg-[#F2ECE3] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm text-[#4E443A]">
          
          {/* Step 1: GitHub */}
          <div className="bg-white p-5 rounded-xl border border-[#E6DDD1] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-serif font-semibold text-[#1C1917]">
                <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs flex items-center justify-center font-sans font-bold">
                  1
                </span>
                <span>Push Code to GitHub</span>
              </div>
              <button
                onClick={() => copyToClipboard(gitCommands, 1)}
                className="inline-flex items-center gap-1 text-xs text-[#6B5E52] hover:text-[#1C1917] px-2.5 py-1 rounded border border-[#D5C9BC] hover:bg-[#FAF8F5]"
              >
                {copiedIndex === 1 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Commands</span>
                  </>
                )}
              </button>
            </div>

            <p className="text-xs text-[#6B6054]">
              First, create a new empty repository on <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-[#1C1917] font-semibold underline">GitHub</a>, then run these terminal commands in your local project folder:
            </p>

            <pre className="bg-[#1C1917] text-stone-200 p-4 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
              {gitCommands}
            </pre>
          </div>

          {/* Step 2: Vercel */}
          <div className="bg-white p-5 rounded-xl border border-[#E6DDD1] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-serif font-semibold text-[#1C1917]">
                <span className="w-6 h-6 rounded-full bg-[#1C1917] text-white text-xs flex items-center justify-center font-sans font-bold">
                  2
                </span>
                <span>Deploy on Vercel (Fastest: Connect GitHub)</span>
              </div>
              <a
                href="https://vercel.com/new"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs text-white bg-[#1C1917] hover:bg-[#38312B] px-3 py-1.5 rounded font-medium"
              >
                <span>Open Vercel</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <ol className="list-decimal list-inside text-xs text-[#6B6054] space-y-2 leading-relaxed pl-1">
              <li>Log in to <strong className="text-[#1C1917]">vercel.com</strong> with your GitHub account.</li>
              <li>Click <strong className="text-[#1C1917]">"Add New..." → "Project"</strong>.</li>
              <li>Select your newly pushed repository and click <strong className="text-[#1C1917]">"Import"</strong>.</li>
              <li>
                Framework Preset: <span className="bg-[#EFE9DF] text-[#1C1917] font-mono px-1.5 py-0.5 rounded">Vite</span> (auto-detected).
              </li>
              <li>
                Build Command: <span className="bg-[#EFE9DF] text-[#1C1917] font-mono px-1.5 py-0.5 rounded">npm run build</span>.
              </li>
              <li>
                Output Directory: <span className="bg-[#EFE9DF] text-[#1C1917] font-mono px-1.5 py-0.5 rounded">dist</span>.
              </li>
              <li>Click <strong className="text-[#1C1917]">"Deploy"</strong>! Your site will be live on a <code className="text-[#B85D3B]">.vercel.app</code> domain in under 30 seconds.</li>
            </ol>
          </div>

          {/* Step 3: Vercel CLI Alternative */}
          <div className="bg-white p-5 rounded-xl border border-[#E6DDD1] shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-base font-serif font-semibold text-[#1C1917]">
                <Terminal className="w-5 h-5 text-[#88786A]" />
                <span>Alternative: Instant Deploy via Vercel CLI</span>
              </div>
              <button
                onClick={() => copyToClipboard(vercelCliCommands, 2)}
                className="inline-flex items-center gap-1 text-xs text-[#6B5E52] hover:text-[#1C1917] px-2.5 py-1 rounded border border-[#D5C9BC] hover:bg-[#FAF8F5]"
              >
                {copiedIndex === 2 ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <pre className="bg-[#1C1917] text-stone-200 p-3 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
              {vercelCliCommands}
            </pre>
            <p className="text-xs text-[#7A7065]">
              The root <code className="bg-[#EFE9DF] px-1 rounded text-[#221D18]">vercel.json</code> file has already been added to handle all routing rules automatically.
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#E8E1D7] flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#1C1917] text-white text-xs font-semibold rounded-sm hover:bg-[#38312B] transition-colors"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
