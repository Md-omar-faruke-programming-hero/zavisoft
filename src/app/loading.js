export default function Loading() {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center space-y-4">
            <div className="relative h-16 w-16">
                <div className="absolute inset-0 rounded-full border-4 border-zinc-200"></div>
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
            <p className="text-zinc-500 font-semibold uppercase tracking-widest text-sm animate-pulse">
                Loading...
            </p>
        </div>
    );
}
