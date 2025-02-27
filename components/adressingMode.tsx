"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check, ChevronDown, ChevronUp, Info } from "lucide-react";

interface AddressingModeProps {
  title: string;
  syntax: string;
  description: string;
  example: string;
}

export function AddressingMode({ title, syntax, description, example }: AddressingModeProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(example);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card className="transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex justify-between items-center text-sm">
          <div className="flex items-center gap-2">
            {title}
            <span 
              className="relative"
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
            >
              <Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-pointer" />
              {showTooltip && (
                <div className="absolute z-10 bg-black/80 text-white text-xs rounded px-2 py-1 top-6 left-1/2 transform -translate-x-1/2 w-56">
                  {description}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-black/80"></div>
                </div>
              )}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="h-6 px-2 text-xs"
          >
            {expanded ? (
              <>
                <span className="mr-1">Méně</span>
                <ChevronUp className="h-3 w-3" />
              </>
            ) : (
              <>
                <span className="mr-1">Více</span>
                <ChevronDown className="h-3 w-3" />
              </>
            )}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <code className="bg-slate-100 px-2 py-1 rounded text-sm font-mono">{syntax}</code>
            {!expanded && (
              <Button
                variant="ghost"
                size="sm"
                onClick={copyToClipboard}
                className="h-6 px-2 text-xs"
              >
                {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
              </Button>
            )}
          </div>
          
          {expanded && (
            <>
              <div className="pt-2">
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="relative mt-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
                <pre className="text-sm overflow-x-auto font-mono whitespace-pre-wrap">
                  {example}
                </pre>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyToClipboard}
                  className="absolute top-2 right-2 h-6 w-6 p-0"
                >
                  {copied ? <Check className="h-3 w-3 text-green-500" /> : <Copy className="h-3 w-3" />}
                </Button>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}