import { Bell } from "lucide-react";

const Navbar = () => {
    return (
        <div className="h-16 bg-white/80 backdrop-blur-md border-b flex items-center justify-between px-6">
            <h2 className="text-xl font-semibold text-gray-800">
                Dashboard
            </h2>

            <div className="flex items-center gap-5">
                <Bell className="text-gray-500 cursor-pointer" />

                <div className="flex items-center gap-3">
                    <div className="text-sm text-right">
                        <p className="font-medium">Abdul Waqar</p>
                        <p className="text-gray-400 text-xs">Admin</p>
                    </div>

                    <div className="w-9 h-9 bg-indigo-500 text-white flex items-center justify-center rounded-full font-bold">
                        A
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;