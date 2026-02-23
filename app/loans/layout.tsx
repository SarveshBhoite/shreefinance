export default function LoansLayout({
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
