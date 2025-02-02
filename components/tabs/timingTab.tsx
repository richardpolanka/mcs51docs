import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TimingTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Časování Instrukcí</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Základní časování</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• 1 strojový cyklus = 12 period oscilátoru</p>
              <p>• Při 12 MHz oscilátoru:</p>
              <ul className="ml-4 space-y-1">
                <li>- 1 cyklus = 1 µs</li>
                <li>- 1-bytová instrukce = 1 µs</li>
                <li>- 2-bytová instrukce = 2 µs</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Speciální případy</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p>• MUL/DIV = 4 µs</p>
              <p>• Externí paměť:</p>
              <ul className="ml-4 space-y-1">
                <li>- Čtení: +1-2 cykly</li>
                <li>- Zápis: +1 cyklus</li>
              </ul>
              <p>• Skoky: 2-3 cykly</p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}