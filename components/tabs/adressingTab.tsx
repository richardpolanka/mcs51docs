import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AddressingMode as AddressingModeComponent } from "../adressingMode";
import { AddressingMode } from "@/lib/supabase";

interface AddressingTabProps {
  addressingModes: AddressingMode[];
}

export function AddressingTab({ addressingModes }: AddressingTabProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Adresové Módy MCS-51</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {addressingModes.length === 0 ? (
          <p className="text-center text-muted-foreground py-4">
            Žádné adresové módy nebyly nalezeny.
          </p>
        ) : (
          addressingModes.map((mode) => (
            <AddressingModeComponent
              key={mode.id}
              title={mode.title}
              syntax={mode.syntax}
              description={mode.description}
              example={mode.example}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}