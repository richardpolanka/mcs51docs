// src/components/mcs51/CodeBlock.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CodeBlockProps {
  title: string;
  code: string;
  description?: string;
}

export function CodeBlock({ title, code, description }: CodeBlockProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <pre className="bg-slate-50 p-4 rounded-lg text-sm overflow-x-auto">
          {code}
        </pre>
        {description && (
          <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
}