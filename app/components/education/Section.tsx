interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => {
  return (
    <div className="bg-background-secondary rounded-xl p-6">
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  );
};
