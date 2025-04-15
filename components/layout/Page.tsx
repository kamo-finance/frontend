interface PageProps extends React.HTMLProps<HTMLDivElement> {
  title?: string;
}

export const Page: React.FC<PageProps> = ({ children, ...props }) => {
  return (
    <div className="min-h-screen pt-16 flex flex-col gap-6 flex-1" {...props}>
      <div className="flex items-center justify-between h-16">
        <h1 className="text-4xl font-extrabold text-foreground">
          {props.title}
        </h1>
      </div>
      {children}
    </div>
  );
};
