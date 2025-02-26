import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timing } from "@/lib/supabase";

interface TimingTabProps {
  timing: Timing[];
}

export function TimingTab({ timing }: TimingTabProps) {
  const groupedTiming = timing.reduce((acc: Record<string, string[]>, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category] = [...acc[item.category], ...item.details];
    return acc;
  }, {});

  return (
    <Card>
      <CardHeader>
        <CardTitle>Časování Instrukcí</CardTitle>
      </CardHeader>
      <CardContent>
        {timing.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Žádné informace o časování nebyly nalezeny.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(groupedTiming).map(([category, details]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="text-sm">{category}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-2">
                  {details.map((detail, index) => (
                    <p key={index}>• {detail}</p>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}