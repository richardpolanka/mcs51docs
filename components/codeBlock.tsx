"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, Code, Download } from "lucide-react";

interface CodeBlockProps {
  title: string;
  code: string;
  description?: string;
}

export function CodeBlock({ title, code, description }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedLine, setHighlightedLine] = useState<number | null>(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadCode = () => {
    const element = document.createElement("a");
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${title.toLowerCase().replace(/\s+/g, '-')}.asm`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };
  
  const codeLines = code.split('\n');

  return (
    <Card className="mb-4 transition-all hover:shadow-md">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle className="text-sm flex items-center gap-2">
          <Code className="h-4 w-4 text-muted-foreground" />
          {title}
        </CardTitle>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className="h-7 w-7 p-0"
            title="Kopírovat kód"
          >
            {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={downloadCode}
            className="h-7 w-7 p-0"
            title="Stáhnout jako soubor"
          >
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="bg-slate-50 rounded-lg border border-slate-100 overflow-hidden mb-2">
          <div className="overflow-x-auto">
            <pre className="p-4 text-sm font-mono relative">
              <table className="w-full border-collapse">
                <tbody>
                  {codeLines.map((line, i) => (
                    <tr 
                      key={i} 
                      className={`hover:bg-slate-100 transition-colors ${highlightedLine === i ? 'bg-yellow-50' : ''}`}
                      onClick={() => setHighlightedLine(highlightedLine === i ? null : i)}
                    >
                      <td className="text-right pr-4 text-slate-400 select-none w-8 text-xs border-r border-slate-200">
                        {i + 1}
                      </td>
                      <td className="pl-4 whitespace-pre">{line}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </pre>
          </div>
        </div>
        {description && (
          <div className="mt-2 text-sm text-muted-foreground">
            {highlightedLine !== null && (
              <div className="bg-yellow-50 p-2 rounded mb-2 border border-yellow-100">
                <strong>Řádek {highlightedLine + 1}:</strong> {codeLines[highlightedLine].trim()}
              </div>
            )}
            <p>{description}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}