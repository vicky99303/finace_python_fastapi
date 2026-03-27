interface Props {
    title: string;
    description: string;
    actionLabel?: string;
}

export default function PageHeader({ title, description, actionLabel }: Props) {
    return (
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-center md:justify-between">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                <p className="mt-1 text-sm text-slate-500">{description}</p>
            </div>

            {actionLabel && (
                <button className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800">
                    {actionLabel}
                </button>
            )}
        </div>
    );
}