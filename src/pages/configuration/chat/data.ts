import { Chat } from '@/@types/chat'

export const mockChats: Chat[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Thank you for your help!',
    type: 'customer',
    messages: [
      {
        id: 1,
        sender: 'Alice Johnson',
        content: 'Hello, I have a question about my order.',
        timestamp: '10:30 AM',
      },
      {
        id: 2,
        sender: 'You',
        content: 'Of course, how can I help you?',
        timestamp: '10:32 AM',
      },
      {
        id: 3,
        sender: 'Alice Johnson',
        content: 'I was wondering when it will be shipped.',
        timestamp: '10:33 AM',
      },
      {
        id: 4,
        sender: 'You',
        content:
          'Let me check that for you. Your order will be shipped tomorrow.',
        timestamp: '10:35 AM',
      },
      {
        id: 5,
        sender: 'Alice Johnson',
        content: 'Thank you for your help!',
        timestamp: '10:36 AM',
      },
    ],
  },
  {
    id: 2,
    name: 'Bob Smith',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'When will my order arrive?',
    type: 'customer',
    messages: [
      {
        id: 1,
        sender: 'Bob Smith',
        content: "Hi, I'm wondering about my order status.",
        timestamp: '11:20 AM',
      },
      {
        id: 2,
        sender: 'You',
        content:
          "Hello Bob, I'd be happy to help. Can you provide your order number?",
        timestamp: '11:22 AM',
      },
      {
        id: 3,
        sender: 'Bob Smith',
        content: "Sure, it's #12345",
        timestamp: '11:23 AM',
      },
      {
        id: 4,
        sender: 'You',
        content:
          'Thank you. Your order has been shipped and should arrive within 2-3 business days.',
        timestamp: '11:25 AM',
      },
      {
        id: 5,
        sender: 'Bob Smith',
        content: 'Great, thanks for the update!',
        timestamp: '11:26 AM',
      },
    ],
  },
  {
    id: 3,
    name: 'Carol White',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'I have a question about the product.',
    type: 'customer',
    messages: [
      {
        id: 1,
        sender: 'Carol White',
        content: 'Hello, I have a question about one of your products.',
        timestamp: '2:00 PM',
      },
      {
        id: 2,
        sender: 'You',
        content: "Hi Carol, I'd be glad to help. What would you like to know?",
        timestamp: '2:02 PM',
      },
      {
        id: 3,
        sender: 'Carol White',
        content: 'Does the XYZ model come in blue?',
        timestamp: '2:03 PM',
      },
      {
        id: 4,
        sender: 'You',
        content:
          'Yes, the XYZ model is available in blue. Would you like me to send you a link to the product page?',
        timestamp: '2:05 PM',
      },
      {
        id: 5,
        sender: 'Carol White',
        content: 'That would be great, thank you!',
        timestamp: '2:06 PM',
      },
    ],
  },
  {
    id: 4,
    name: 'David Brown',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Inventory update completed.',
    type: 'staff',
    messages: [
      {
        id: 1,
        sender: 'David Brown',
        content: "Hey, I've finished updating the inventory.",
        timestamp: '3:00 PM',
      },
      {
        id: 2,
        sender: 'You',
        content: 'Great job, David. Any issues to report?',
        timestamp: '3:02 PM',
      },
      {
        id: 3,
        sender: 'David Brown',
        content: "No major issues. We're running low on item #789.",
        timestamp: '3:05 PM',
      },
      {
        id: 4,
        sender: 'You',
        content: "Thanks for the heads up. I'll place an order for more.",
        timestamp: '3:07 PM',
      },
      {
        id: 5,
        sender: 'David Brown',
        content: 'Sounds good. Let me know if you need anything else.',
        timestamp: '3:10 PM',
      },
    ],
  },
  {
    id: 5,
    name: 'Eva Green',
    avatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'New marketing campaign ready.',
    type: 'staff',
    messages: [
      {
        id: 1,
        sender: 'Eva Green',
        content: 'The new marketing campaign is ready for review.',
        timestamp: '4:00 PM',
      },
      {
        id: 2,
        sender: 'You',
        content: "Excellent, Eva. I'll take a look right away.",
        timestamp: '4:05 PM',
      },
      {
        id: 3,
        sender: 'Eva Green',
        content: 'Great! Let me know if you need any changes.',
        timestamp: '4:10 PM',
      },
      {
        id: 4,
        sender: 'You',
        content: 'It looks good overall. Can we discuss the budget tomorrow?',
        timestamp: '4:20 PM',
      },
      {
        id: 5,
        sender: 'Eva Green',
        content:
          "Absolutely. I'll prepare a detailed breakdown for our meeting.",
        timestamp: '4:25 PM',
      },
    ],
  },
]
