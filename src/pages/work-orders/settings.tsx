import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Plus, Pencil, Save, Trash2 } from 'lucide-react'
import { useState } from 'react'
import {Layout} from "../../components/custom/layout";
import ThemeSwitch from "../../components/theme-switch";
import {UserNav} from "../../components/user-nav";

export default function WorkOrderSettings() {
    const [activeTab, setActiveTab] = useState('workflow')

    const workflowStatuses = [
        { id: 1, name: 'New', color: 'default' },
        { id: 2, name: 'Assigned', color: 'warning' },
        { id: 3, name: 'In Progress', color: 'warning' },
        { id: 4, name: 'On Hold', color: 'destructive' },
        { id: 5, name: 'Completed', color: 'success' }
    ]

    const templates = [
        {
            id: 1,
            name: 'Routine Maintenance',
            type: 'Maintenance',
            steps: 5,
            lastUsed: '2024-03-10'
        },
        {
            id: 2,
            name: 'Equipment Installation',
            type: 'Installation',
            steps: 8,
            lastUsed: '2024-03-08'
        }
    ]

    const customFields = [
        {
            id: 1,
            name: 'Equipment Serial Number',
            type: 'text',
            required: true
        },
        {
            id: 2,
            name: 'Warranty Expiry',
            type: 'date',
            required: false
        }
    ]

    return (
        <Layout>
            <Layout.Header className="border-b">
                <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
                    <ThemeSwitch />
                    <UserNav />
                </div>
            </Layout.Header>

            <Layout.Body className="space-y-8 pb-8">
                <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold">Settings</h2>
                            <p className="text-muted-foreground">Configure work order system settings</p>
                        </div>

                        <Tabs value={activeTab} onValueChange={setActiveTab}>
                            <TabsList>
                                <TabsTrigger value="workflow">Workflow</TabsTrigger>
                                <TabsTrigger value="templates">Templates</TabsTrigger>
                                <TabsTrigger value="custom-fields">Custom Fields</TabsTrigger>
                                <TabsTrigger value="categories">Categories</TabsTrigger>
                            </TabsList>

                            <TabsContent value="workflow">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Workflow Settings</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        {/* Status Configuration */}
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <h3 className="font-medium">Status Configuration</h3>
                                                <Button>
                                                    <Plus className="h-4 w-4 mr-2" />
                                                    Add Status
                                                </Button>
                                            </div>
                                            <div className="space-y-4">
                                                {workflowStatuses.map((status) => (
                                                    <div key={status.id} className="flex items-center justify-between border-b pb-4">
                                                        <div className="flex items-center space-x-4">
                                                            <Badge variant={status.color as any}>{status.name}</Badge>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Button variant="ghost" size="sm">
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button variant="ghost" size="sm">
                                                                <Trash2 className="h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Automation Rules */}
                                        <div className="space-y-4">
                                            <h3 className="font-medium">Automation Rules</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label>Auto-assign based on skill</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Automatically assign work orders based on required skills
                                                        </p>
                                                    </div>
                                                    <Switch />
                                                </div>
                                                <div className="flex items-center justify-between">
                                                    <div className="space-y-0.5">
                                                        <Label>Status notifications</Label>
                                                        <p className="text-sm text-muted-foreground">
                                                            Send notifications on status changes
                                                        </p>
                                                    </div>
                                                    <Switch />
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="templates">
                                <Card>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <CardTitle>Work Order Templates</CardTitle>
                                            <Button>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Create Template
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {templates.map((template) => (
                                                <div key={template.id} className="flex items-center justify-between border-b pb-4">
                                                    <div>
                                                        <h4 className="font-medium">{template.name}</h4>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <Badge variant="outline">{template.type}</Badge>
                                                            <span>{template.steps} steps</span>
                                                            <span>Last used: {template.lastUsed}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="custom-fields">
                                <Card>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <CardTitle>Custom Fields</CardTitle>
                                            <Button>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Field
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {customFields.map((field) => (
                                                <div key={field.id} className="flex items-center justify-between border-b pb-4">
                                                    <div>
                                                        <h4 className="font-medium">{field.name}</h4>
                                                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                            <Badge variant="outline">{field.type}</Badge>
                                                            {field.required && <Badge>Required</Badge>}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="categories">
                                <Card>
                                    <CardHeader>
                                        <div className="flex justify-between items-center">
                                            <CardTitle>Work Order Categories</CardTitle>
                                            <Button>
                                                <Plus className="h-4 w-4 mr-2" />
                                                Add Category
                                            </Button>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-4">
                                            {['Maintenance', 'Repair', 'Installation', 'Inspection'].map((category, index) => (
                                                <div key={index} className="flex items-center justify-between border-b pb-4">
                                                    <div className="flex items-center gap-4">
                                                        <h4 className="font-medium">{category}</h4>
                                                        <Badge variant="outline">Active</Badge>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Button variant="ghost" size="sm">
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        {/* Footer Actions */}
                        <div className="flex justify-end space-x-2 pt-6 border-t">
                            <Button variant="outline">Reset</Button>
                            <Button>
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
            </Layout.Body>
        </Layout>
    )
}