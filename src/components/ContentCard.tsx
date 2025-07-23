import { Card } from "./ui/card";

interface ContentCardProps {
  title: string;
  subtitle: string;
}

export function ContentCard({ title, subtitle }: ContentCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer">
      <div className="space-y-1">
        <h3 className="font-medium">{title}</h3>
        <p className="text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </Card>
  );
}