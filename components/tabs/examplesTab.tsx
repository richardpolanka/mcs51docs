import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "../codeBlock";
import { CodeExample } from "@/lib/supabase";

interface ExamplesTabProps {
  codeExamples: CodeExample[];
}

export function ExamplesTab({ codeExamples }: ExamplesTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Příklady Programů</CardTitle>
      </CardHeader>
      <CardContent>
        {codeExamples.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Žádné příklady programů nebyly nalezeny.
          </p>
        ) : (
          codeExamples.map((example) => (
            <CodeBlock
              key={example.id}
              title={example.title}
              code={example.code}
              description={example.description}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}