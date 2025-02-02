import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AddressingModeProps {
  title: string;
  syntax: string;
  description: string;
  example: string;
}

export function AddressingMode({ title, syntax, description, example }: AddressingModeProps) {
  return (
    <Card className="mb-4">
      <CardHeader>
        <CardTitle className="text-sm">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <code className="bg-slate-100 px-2 py-1 rounded text-sm">{syntax}</code>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <pre className="mt-2 bg-slate-50 p-4 rounded-lg text-sm">
          {example}
        </pre>
      </CardContent>
    </Card>
  );
}