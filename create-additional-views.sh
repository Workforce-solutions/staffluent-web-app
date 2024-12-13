#!/bin/bash

# Base directory for pages
BASE_DIR="src/pages"

# Function to create a view file
create_view() {
    local path=$1
    local title=$2
    
    # Create directory if it doesn't exist
    mkdir -p "$(dirname "$path")"
    
    # Create the file with basic content
    cat > "$path" << EOF
import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const ${title} = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold mb-4">${title}</h1>
      <Card>
        <CardHeader>
          <CardTitle>${title}</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add your content here */}
        </CardContent>
      </Card>
    </div>
  )
}

export default ${title}
EOF

    echo "Created $path"
}

# Create Analytics & Reports views
create_view "$BASE_DIR/reports/quality/index.tsx" "QualityMetricsReport"
create_view "$BASE_DIR/reports/equipment/index.tsx" "EquipmentUsageReport"
create_view "$BASE_DIR/reports/safety/index.tsx" "SafetyComplianceReport"
create_view "$BASE_DIR/reports/sites/index.tsx" "SitePerformanceReport"

# Create Project Management additional views
create_view "$BASE_DIR/projects/milestones/index.tsx" "ConstructionMilestones"
create_view "$BASE_DIR/projects/workflows/index.tsx" "SiteWorkflows"
create_view "$BASE_DIR/projects/materials/index.tsx" "MaterialTracking"
create_view "$BASE_DIR/projects/weather/index.tsx" "WeatherMonitoring"

# Create Service Management views
create_view "$BASE_DIR/services/work-orders/index.tsx" "WorkOrders"
create_view "$BASE_DIR/services/requests/index.tsx" "ServiceRequests"
create_view "$BASE_DIR/services/verification/index.tsx" "QualityVerification"

echo "All additional view files have been created!"
