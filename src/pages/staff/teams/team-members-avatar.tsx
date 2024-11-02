import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Employee {
    id: number;
    name: string;
    email: string;
    profile_picture: string | null;
}

interface TeamMembersAvatarProps {
    employees: Employee[];
    limit?: number;
}

// Function to generate consistent pastel colors based on initials
const generatePastelColor = (initials: string) => {
    const baseColors = [
        'bg-red-100 text-red-600',
        'bg-blue-100 text-blue-600',
        'bg-green-100 text-green-600',
        'bg-purple-100 text-purple-600',
        'bg-yellow-100 text-yellow-600',
        'bg-pink-100 text-pink-600',
        'bg-indigo-100 text-indigo-600',
    ];

    const index = initials.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return baseColors[index % baseColors.length];
};

export const TeamMembersAvatar = ({ employees = [], limit = 3 }: TeamMembersAvatarProps) => {
    const displayMembers = employees.slice(0, limit);
    const totalMembers = employees.length;
    const remainingCount = Math.max(0, totalMembers - limit);

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(part => part[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className="flex items-center">
            <div className="flex -space-x-3 overflow-hidden">
                {displayMembers.map((employee) => {
                    const initials = getInitials(employee.name);
                    const colorClasses = generatePastelColor(initials);

                    return (
                        <Avatar
                            key={employee.id}
                            className="inline-block border-2 border-background h-9 w-9"
                            title={`${employee.name}\n${employee.email}`}
                        >
                            <AvatarFallback className={`${colorClasses} font-medium`}>
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                    );
                })}
                {remainingCount > 0 && (
                    <Avatar className="inline-block border-2 border-background h-9 w-9">
                        <AvatarFallback className="bg-gray-100 text-gray-600 font-medium">
                            +{remainingCount}
                        </AvatarFallback>
                    </Avatar>
                )}
            </div>
        </div>
    );
};