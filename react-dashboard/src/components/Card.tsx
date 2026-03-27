import type { LucideIcon } from "lucide-react";

interface CardProps {
    title: string;
    amount: string;
    icon: LucideIcon;
    bg: string;
}

const Card = ({ title, amount, icon: Icon, bg }: CardProps) => {
    return (
        <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md shadow-md hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-500 text-sm">{title}</h3>

                <div className={`p-3 rounded-xl ${bg}`}>
                    <Icon size={20} className="text-white" />
                </div>
            </div>

            <p className="text-3xl font-bold text-gray-800">{amount}</p>
        </div>
    );
};

export default Card;