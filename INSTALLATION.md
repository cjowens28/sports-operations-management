# Sports Operations Management - Installation Guide

## Overview
This ServiceNow application provides comprehensive sports venue operations management, including game day coordination, facility maintenance, staff scheduling, and incident response.

## Prerequisites
- ServiceNow instance (Madrid release or later)
- IT Service Management (ITSM) plugin activated
- Field Service Management (FSM) plugin (recommended)
- Service Portal enabled
- Admin privileges for installation

## Installation Steps

### 1. Import the Application
1. Navigate to **System Applications > Studio**
2. Create new application or import update set
3. Import all XML files from the project directory
4. Commit changes and publish the application

### 2. Configure System Properties
Set the following system properties in **System Properties > All Properties**:

```
x_som_sports_ops.admin_email = admin@yourvenue.com
x_som_sports_ops.system_user_id = [System User ID]

# External System Integration (Optional)
x_som_sports_ops.ticketing.enabled = true
x_som_sports_ops.ticketing.endpoint = https://api.ticketing-system.com
x_som_sports_ops.ticketing.api_key = [API Key]

x_som_sports_ops.security.enabled = true
x_som_sports_ops.security.endpoint = https://api.security-system.com
x_som_sports_ops.security.api_key = [API Key]

x_som_sports_ops.bms.enabled = true
x_som_sports_ops.bms.endpoint = https://api.building-mgmt.com
x_som_sports_ops.bms.api_key = [API Key]

x_som_sports_ops.weather.enabled = true
x_som_sports_ops.weather.endpoint = https://api.weather-service.com
x_som_sports_ops.weather.api_key = [API Key]

x_som_sports_ops.asset.enabled = true
x_som_sports_ops.asset.endpoint = https://api.asset-mgmt.com
x_som_sports_ops.asset.api_key = [API Key]
```

### 3. Set Up User Roles
Assign appropriate roles to users:

- **x_som_sports_ops.sports_ops_manager**: Operations managers with full access
- **x_som_sports_ops.sports_ops_coordinator**: Day-to-day coordinators
- **x_som_sports_ops.field_staff**: Front-line venue staff
- **x_som_sports_ops.facilities_technician**: Maintenance and facilities staff
- **x_som_sports_ops.security_officer**: Security and safety personnel

### 4. Create Initial Data

#### Venues
1. Navigate to **Sports Operations > Venues**
2. Create venue records with:
   - Name, address, capacity
   - Venue type (stadium, arena, field, complex)
   - GPS coordinates (for weather integration)
   - Operations and general managers

#### User Groups
Create assignment groups for different departments:
- Technical Support
- Facilities Management
- Safety & Security
- Security Team
- Medical Team
- General Operations

### 5. Configure Service Portal
1. Navigate to **Service Portal > Portals**
2. Activate the "Sports Operations Portal"
3. Set URL suffix to match your requirements
4. Configure theme and branding

### 6. Set Up Scheduled Jobs
1. Navigate to **System Definition > Scheduled Jobs**
2. Activate the "Sports Operations External Sync" job
3. Configure run frequency (recommended: every hour)

### 7. Configure Notifications
Set up email notifications in **System Notification > Email > Notifications**:
- Critical incident escalations
- Staff assignment notifications
- Maintenance request assignments
- SLA breach alerts

## Post-Installation Configuration

### Initial Event Setup
1. Create event templates for common event types
2. Set up staff scheduling templates
3. Configure facility assets and maintenance schedules

### Dashboard Access
- **Game Day Control Center**: `/x_som_sports_ops_game_day_control_center.do`
- **Service Portal**: `/sports-ops`
- **Reports**: Available in **Sports Operations > Reports**

### Mobile Access
The Service Portal is mobile-optimized and includes:
- Quick incident reporting
- Staff assignment viewing
- Task status updates
- GPS location capture

## Integration Setup

### Ticketing System Integration
Configure endpoints for:
- Event attendance data
- Ticket sales information
- Capacity updates

### Security System Integration
Set up automatic alerts for:
- Security incidents
- Safety concerns
- Emergency situations

### Building Management Integration
Monitor systems including:
- HVAC status
- Lighting systems
- Audio/video equipment
- Network infrastructure

### Weather Service Integration
Receive alerts for:
- Severe weather warnings
- Temperature extremes
- Precipitation alerts

## Troubleshooting

### Common Issues
1. **Role Assignment**: Ensure users have correct roles for their functions
2. **External API Failures**: Check API keys and endpoint configurations
3. **Portal Access**: Verify Service Portal permissions and theme settings
4. **Scheduled Jobs**: Monitor job execution logs for sync issues

### Support Resources
- Application logs: **System Logs > Application Logs**
- Sync logs: **Sports Operations > Sync Logs**
- Error notifications: Check admin email for critical alerts

## Customization Options

### Adding Custom Fields
Extend tables to include venue-specific requirements:
- Custom incident types
- Additional asset categories
- Specialized staff roles
- Venue-specific locations

### Workflow Modifications
Customize business rules and workflows for:
- Escalation procedures
- Assignment logic
- Notification preferences
- Integration triggers

### Reporting Enhancements
Create custom reports for:
- Operational KPIs
- Cost analysis
- Performance metrics
- Compliance tracking

## Security Considerations

### Data Protection
- All sensitive data is protected by ACL rules
- Role-based access ensures data segregation
- External API credentials are encrypted

### Audit Trail
- All changes are logged
- User actions are tracked
- System integration events are recorded

## Maintenance

### Regular Tasks
- Monitor external system sync logs
- Review incident patterns and trends
- Update staff assignments seasonally
- Refresh asset inventory quarterly

### Performance Optimization
- Archive old incident records annually
- Clean up completed maintenance requests
- Optimize database indexes as needed
- Monitor system performance metrics

For technical support or customization requests, contact your ServiceNow administrator.