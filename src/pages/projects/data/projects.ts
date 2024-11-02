// src/pages/projects/data/projects.ts
import {Project} from "./schema";

export const projects: Project[] = [
    {
        id: 'PROJ-1',
        name: 'New Website Design',
        status: 'active',
        progress: 75,
        team: [
            { name: 'Alice Johnson', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Alice Johnson' },
            { name: 'Bob Smith', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Bob Smith' },
            { name: 'Carol Williams', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Carol Williams' },
        ],
    },
    {
        id: 'PROJ-2',
        name: 'Mobile App Development',
        status: 'active',
        progress: 40,
        team: [
            { name: 'David Brown', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=David Brown' },
            { name: 'Eva Davis', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Eva Davis' },
            { name: 'Frank Wilson', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Frank Wilson' },
            { name: 'Grace Lee', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Grace Lee' },
        ],
    },
    {
        id: 'PROJ-3',
        name: 'Marketing Campaign',
        status: 'completed',
        progress: 100,
        team: [
            { name: 'Henry Taylor', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Henry Taylor' },
            { name: 'Ivy Martin', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Ivy Martin' },
        ],
    },
    {
        id: 'PROJ-4',
        name: 'Product Launch',
        status: 'on hold',
        progress: 60,
        team: [
            { name: 'Jack Anderson', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Jack Anderson' },
            { name: 'Karen White', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Karen White' },
            { name: 'Liam Harris', avatar: 'https://api.dicebear.com/6.x/initials/svg?seed=Liam Harris' },
        ],
    },
]