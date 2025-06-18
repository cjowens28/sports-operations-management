# ServiceNow Studio Import Guide

## Method 1: Import as Update Set (Recommended)

### Step 1: Download the Update Set
Download the main update set file:
- **File**: `sports_operations_management_update_set.xml`

### Step 2: Import Update Set
1. In your ServiceNow instance, navigate to **System Update Sets > Retrieved Update Sets**
2. Click **Import Update Set from XML**
3. Choose the `sports_operations_management_update_set.xml` file
4. Click **Upload**
5. Once uploaded, click on the update set name
6. Click **Preview Update Set**
7. Review the preview (should show 31+ records)
8. Click **Commit Update Set**

## Method 2: Create Application in Studio

### Step 1: Create New Application
1. Navigate to **System Applications > Studio**
2. Click **Create Application**
3. Fill in the details:
   - **Name**: Sports Operations Management
   - **Scope**: x_som_sports_ops
   - **Description**: Complete sports venue operations management solution

### Step 2: Import Individual Components
After creating the application, import each XML file:

1. **Tables First** (in this order):
   - `tables/x_som_sports_ops_venue.xml`
   - `tables/x_som_sports_ops_event.xml`
   - `tables/x_som_sports_ops_staff_assignment.xml`
   - `tables/x_som_sports_ops_game_day_task.xml`
   - `tables/x_som_sports_ops_facility_asset.xml`
   - `tables/x_som_sports_ops_maintenance_request.xml`
   - `tables/x_som_sports_ops_sports_incident.xml`

2. **Field Definitions**:
   - `table_fields/venue_fields.xml`

3. **Security**:
   - `security/roles.xml`
   - `security/acl_rules.xml`
   - `security/ui_policies.xml`

4. **Business Logic**:
   - `script_includes/GameDayControlCenterAjax.xml`
   - `script_includes/StaffSchedulingUtil.xml`
   - `script_includes/SportsOperationsReporting.xml`
   - `business_rules/game_day_task_notifications.xml`
   - `business_rules/incident_auto_escalation.xml`
   - `business_rules/preventive_maintenance_scheduler.xml`

5. **Workflows**:
   - `workflows/maintenance_request_workflow.xml`
   - `workflows/sports_incident_workflow.xml`

6. **User Interface**:
   - `dashboards/game_day_control_center.xml`
   - `portal/sports_ops_portal.xml`
   - `portal/widgets/incident_reporter_widget.xml`

7. **Reports**:
   - `reports/sports_operations_dashboard.xml`

8. **Integrations**:
   - `integrations/external_api_handler.xml`
   - `integrations/webhook_endpoints.xml`
   - `integrations/scheduled_sync.xml`

## Method 3: Import via Application Repository

### Step 1: Package the Application
1. Zip all the XML files together
2. Include the `manifest.xml` file in the root

### Step 2: Import to Studio
1. In Studio, click **Import from Source Control**
2. Select **File Upload**
3. Upload the ZIP file
4. Follow the import wizard

## Troubleshooting

### If Import Fails:
1. **Check Dependencies**: Ensure ITSM and Service Portal are activated
2. **Import Order**: Always import tables before dependent objects
3. **Scope Issues**: Make sure you're in the correct application scope
4. **Sys ID Conflicts**: If sys_id conflicts occur, generate new ones

### Missing Dependencies:
- **IT Service Management (ITSM)**: Required for incident management
- **Service Portal**: Required for mobile interface
- **Field Service Management**: Optional but recommended

### Post-Import Steps:
1. Navigate to **System Applications > My Company Applications**
2. Find "Sports Operations Management"
3. Click to open and verify all components imported
4. Test basic functionality

## Verification Steps

After successful import:

1. **Check Tables**: All 7 tables should be visible in **System Definition > Tables**
2. **Verify Roles**: Check **User Administration > Roles** for new sports ops roles
3. **Test Portal**: Navigate to `/sports-ops` to see the mobile portal
4. **Control Center**: Access the Game Day Control Center dashboard
5. **Create Test Data**: Add a venue and event to test functionality

## Support

If you encounter issues:
1. Check the **System Logs > Application Logs** for errors
2. Verify all prerequisite plugins are installed
3. Ensure proper permissions for import user
4. Contact your ServiceNow administrator for scope/permission issues

## Quick Start After Import

1. **Create Initial Data**:
   - Add your venue(s) in **Sports Operations > Venues**
   - Set up user groups for different departments
   - Assign roles to users

2. **Configure Settings**:
   - Set system properties for external integrations
   - Configure notification preferences
   - Set up scheduled jobs

3. **Test Core Functions**:
   - Create a test event
   - Report a test incident via mobile portal
   - Check the Game Day Control Center dashboard