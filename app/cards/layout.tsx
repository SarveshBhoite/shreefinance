export default function GenericLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-slate-50 dark:bg-black">
            {children}
        </div>
    );
}
