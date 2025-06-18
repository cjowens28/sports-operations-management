# Sports Operations Management - Yokohama Installation Guide

## Quick Start for Yokohama ServiceNow Instance

### Method 1: Manual Studio Setup (Recommended for Yokohama)

Since update set import can be problematic, here's a manual setup approach that works reliably:

#### Step 1: Create the Application in Studio
1. Navigate to **System Applications > Studio**
2. Click **Create Application**
3. Fill in:
   - **Name**: Sports Operations Management
   - **Scope**: `x_som_sports_ops`
   - **Version**: 1.0.0
   - **Short Description**: Sports venue operations management
4. Click **Create**

#### Step 2: Create Tables (Do this FIRST)
In Studio, create these tables in order:

1. **Venue Table**:
   - Go to **File > New > Table**
   - Table Name: `venue`
   - Table Label: `Venue`
   - Add fields: name (string), address (string), venue_type (choice), capacity (integer)

2. **Event Table**:
   - Table Name: `event`
   - Table Label: `Event`
   - Add fields: name (string), start_date (date_time), end_date (date_time), venue (reference to venue)

3. **Sports Incident Table**:
   - Table Name: `sports_incident`
   - Table Label: `Sports Incident`
   - Extends: `incident` table
   - Add fields: incident_type (choice), venue (reference to venue), event (reference to event)

4. **Staff Assignment Table**:
   - Table Name: `staff_assignment`
   - Table Label: `Staff Assignment`
   - Add fields: event (reference), staff_member (reference to user), role (string), shift_start (date_time), shift_end (date_time)

5. **Game Day Task Table**:
   - Table Name: `game_day_task`
   - Table Label: `Game Day Task`
   - Add fields: title (string), event (reference), assigned_to (reference to user), due_date (date_time), priority (choice)

6. **Facility Asset Table**:
   - Table Name: `facility_asset`
   - Table Label: `Facility Asset`
   - Add fields: name (string), venue (reference), asset_type (choice), location (string), status (choice)

7. **Maintenance Request Table**:
   - Table Name: `maintenance_request`
   - Table Label: `Maintenance Request`
   - Add fields: asset (reference), venue (reference), request_type (choice), priority (choice), description (string)

#### Step 3: Add Basic Data and Test
1. **Create a test venue**:
   - Navigate to your new application
   - Go to venue table and add a test venue

2. **Create a test event**:
   - Add an event linked to your venue
   - Set dates for today or tomorrow

3. **Test incident creation**:
   - Create a test sports incident
   - Link it to your venue and event

#### Step 4: Add Business Rules (Optional for MVP)
If you want automation, you can add these later:
- Incident notifications
- Task assignments
- Escalation rules

## Method 2: Simple CSV Import

For quick testing, you can also:

1. **Create the tables as above**
2. **Prepare CSV files** with sample data:
   - venues.csv
   - events.csv
   - incidents.csv
3. **Import via System Import Sets**

## Method 3: REST API Setup

For external integrations:

1. **Enable REST API access**
2. **Create inbound web services**
3. **Test with simple GET/POST operations**

## Troubleshooting for Yokohama

### Common Issues:
1. **Scope Problems**: Make sure you're in the `x_som_sports_ops` scope
2. **Permission Issues**: Ensure you have `admin` or `app_creator` role
3. **Table Dependencies**: Create tables before dependent objects
4. **Plugin Requirements**: Some features need ITSM plugin activated

### Minimum Viable Product (MVP) for Testing:
Just create these core components first:
- ✅ Venue table
- ✅ Event table  
- ✅ Sports Incident table (extends incident)
- ✅ Basic forms and lists

### Verification Steps:
1. **Check tables exist**: System Definition > Tables (filter by x_som_sports_ops)
2. **Test data entry**: Create venue, event, incident
3. **Check relationships**: Verify venue-to-event, event-to-incident links work
4. **Basic reporting**: Create a simple list of incidents by venue

## Phase 2 Enhancements (Add Later):
- Staff scheduling
- Mobile portal
- Advanced workflows
- External integrations
- Dashboards and reporting

## Quick Success Metrics:
- ✅ Can create venues
- ✅ Can create events for venues
- ✅ Can report incidents for events
- ✅ Can view incident lists and reports
- ✅ Basic forms and navigation work

## Next Steps After MVP:
1. **Add sample data** for demonstration
2. **Create custom forms** for better UX
3. **Add business rules** for automation
4. **Build simple dashboard** for executives
5. **Add mobile interface** for field staff

## Support:
If you run into issues:
1. **Check scope**: Always work in `x_som_sports_ops` scope
2. **Start small**: Get basic tables working first
3. **Test incrementally**: Add one feature at a time
4. **Use OOB features**: Leverage existing ServiceNow functionality

This approach gets you a working sports operations system quickly without complex imports!