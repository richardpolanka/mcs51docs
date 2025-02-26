import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CodeBlock } from "../codeBlock";
import { Pattern } from "@/lib/supabase";

interface PatternsTabProps {
  patterns: Pattern[];
}

export function PatternsTab({ patterns }: PatternsTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Programovací Vzory</CardTitle>
      </CardHeader>
      <CardContent>
        {patterns.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Žádné programovací vzory nebyly nalezeny.
          </p>
        ) : (
          patterns.map((pattern) => (
            <CodeBlock
              key={pattern.id}
              title={pattern.title}
              code={pattern.code}
              description={pattern.description}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}