#!/bin/bash

# Base directory for client portal pages
BASE_DIR="src/pages/client-portal"

# Create directories and files for Service section
mkdir -p $BASE_DIR/services/history
mkdir -p $BASE_DIR/services/weather-alerts
echo "Creating service section files..."
touch $BASE_DIR/services/history/index.tsx
touch $BASE_DIR/services/weather-alerts/index.tsx

# Create directories and files for Quality & Inspections section
mkdir -p $BASE_DIR/quality/inspections
mkdir -p $BASE_DIR/quality/reports
mkdir -p $BASE_DIR/quality/progress
echo "Creating quality section files..."
touch $BASE_DIR/quality/inspections/index.tsx
touch $BASE_DIR/quality/reports/index.tsx
touch $BASE_DIR/quality/progress/index.tsx

# Create directories and files for Documentation section
mkdir -p $BASE_DIR/documentation/barrier
mkdir -p $BASE_DIR/documentation/compliance
mkdir -p $BASE_DIR/documentation/site-reports
mkdir -p $BASE_DIR/documentation/photos
echo "Creating documentation section files..."
touch $BASE_DIR/documentation/barrier/index.tsx
touch $BASE_DIR/documentation/compliance/index.tsx
touch $BASE_DIR/documentation/site-reports/index.tsx
touch $BASE_DIR/documentation/photos/index.tsx

# Create directories for Issue Reporting
mkdir -p $BASE_DIR/support/issues
echo "Creating support section files..."
touch $BASE_DIR/support/issues/index.tsx

# Add initial content to Service History page
echo "Adding initial content to Service History page..."
cat > $BASE_DIR/services/history/index.tsx << 'ENDFILE'
import { Layout } from '@/components/custom/layout'
import ThemeSwitch from '@/components/theme-switch'
import { UserNav } from '@/components/user-nav'

export default function ServiceHistory() {
  return (
    <Layout>
      <Layout.Header className="border-b">
        <div className="ml-auto flex items-center space-x-2 sm:space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </Layout.Header>

      <Layout.Body className="space-y-8 pb-8">
        <h1>Service History</h1>
      </Layout.Body>

      <Layout.Footer className="border-t py-6">
        <div className="text-center text-sm text-muted-foreground">
          © 2024 Staffluent. All rights reserved.
        </div>
      </Layout.Footer>
    </Layout>
  )
}
ENDFILE

echo "Directory structure and initial files created successfully!"
ls -R $BASE_DIR
