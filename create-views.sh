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

const ${title} = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">${title}</h1>
    </div>
  )
}

export default ${title}
EOF

    echo "Created $path"
}

# Quality Control views
create_view "$BASE_DIR/quality-control/checklists/index.tsx" "InspectionChecklists"
create_view "$BASE_DIR/quality-control/metrics/index.tsx" "QualityMetrics"
create_view "$BASE_DIR/quality-control/safety-audits/index.tsx" "SafetyAudits"
create_view "$BASE_DIR/quality-control/compliance/index.tsx" "CodeCompliance"

# Equipment Management views
create_view "$BASE_DIR/equipment/tracking/index.tsx" "AssetTracking"
create_view "$BASE_DIR/equipment/maintenance/index.tsx" "MaintenanceSchedule"
create_view "$BASE_DIR/equipment/monitoring/index.tsx" "UsageMonitoring"
create_view "$BASE_DIR/equipment/assignment/index.tsx" "EquipmentAssignment"

# Field Operations views
create_view "$BASE_DIR/field-ops/location/index.tsx" "TeamLocation"
create_view "$BASE_DIR/field-ops/routes/index.tsx" "RoutePlanning"
create_view "$BASE_DIR/field-ops/service-areas/index.tsx" "ServiceAreas"

# Safety Management views
create_view "$BASE_DIR/safety/barriers/index.tsx" "BarrierManagement"
create_view "$BASE_DIR/safety/osha/index.tsx" "OSHACompliance"
create_view "$BASE_DIR/safety/ada/index.tsx" "ADACompliance"
create_view "$BASE_DIR/safety/maps/index.tsx" "SiteSafetyMaps"

echo "All view files have been created!"
