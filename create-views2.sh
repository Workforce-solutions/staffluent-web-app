#!/bin/bash

# Base directory for site management pages
BASE_DIR="src/pages/sites"

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
          <CardTitle>Site Management Features</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Add your site management content here */}
        </CardContent>
      </Card>
    </div>
  )
}

export default ${title}
EOF

    echo "Created $path"
}

# Create site management views
create_view "$BASE_DIR/overview/index.tsx" "SitesOverview"
create_view "$BASE_DIR/configuration/index.tsx" "SiteConfiguration"
create_view "$BASE_DIR/resources/index.tsx" "SiteResources"
create_view "$BASE_DIR/monitoring/index.tsx" "SiteMonitoring"
create_view "$BASE_DIR/documents/index.tsx" "SiteDocumentation"
create_view "$BASE_DIR/access/index.tsx" "SiteAccessControl"

echo "All site management view files have been created!"
