// Sports Operations Management - Simple Installer Script
// Run this in ServiceNow Scripts - Background to create basic structure

// Create the main application
var app = new GlideRecord('sys_app');
app.initialize();
app.name = 'Sports Operations Management';
app.scope = 'x_som_sports_ops';
app.short_description = 'Sports venue operations management';
app.description = 'Complete sports venue operations management solution';
app.version = '1.0.0';
app.active = true;
app.can_edit_in_studio = true;
var appId = app.insert();

if (appId) {
    gs.print('✅ Application created: ' + appId);
    
    // Create Venue table
    var venueTable = new GlideRecord('sys_db_object');
    venueTable.initialize();
    venueTable.name = 'x_som_sports_ops_venue';
    venueTable.label = 'Venue';
    venueTable.sys_package = appId;
    venueTable.sys_scope = appId;
    var venueTableId = venueTable.insert();
    
    if (venueTableId) {
        gs.print('✅ Venue table created: ' + venueTableId);
        
        // Add venue fields
        var fields = [
            {element: 'name', type: 'string', label: 'Name', max_length: 255},
            {element: 'address', type: 'string', label: 'Address', max_length: 500},
            {element: 'venue_type', type: 'choice', label: 'Venue Type', max_length: 40},
            {element: 'capacity', type: 'integer', label: 'Capacity'},
            {element: 'active', type: 'boolean', label: 'Active'}
        ];
        
        for (var i = 0; i < fields.length; i++) {
            var field = new GlideRecord('sys_dictionary');
            field.initialize();
            field.name = 'x_som_sports_ops_venue';
            field.element = fields[i].element;
            field.column_label = fields[i].label;
            field.internal_type = fields[i].type;
            if (fields[i].max_length) field.max_length = fields[i].max_length;
            field.sys_package = appId;
            field.sys_scope = appId;
            field.insert();
        }
        
        // Add venue type choices
        var choices = [
            {label: 'Stadium', value: 'stadium'},
            {label: 'Arena', value: 'arena'},
            {label: 'Field', value: 'field'},
            {label: 'Complex', value: 'complex'}
        ];
        
        for (var j = 0; j < choices.length; j++) {
            var choice = new GlideRecord('sys_choice');
            choice.initialize();
            choice.name = 'x_som_sports_ops_venue';
            choice.element = 'venue_type';
            choice.label = choices[j].label;
            choice.value = choices[j].value;
            choice.sequence = j * 10;
            choice.sys_package = appId;
            choice.sys_scope = appId;
            choice.insert();
        }
        
        gs.print('✅ Venue fields and choices created');
    }
    
    // Create Event table
    var eventTable = new GlideRecord('sys_db_object');
    eventTable.initialize();
    eventTable.name = 'x_som_sports_ops_event';
    eventTable.label = 'Event';
    eventTable.sys_package = appId;
    eventTable.sys_scope = appId;
    var eventTableId = eventTable.insert();
    
    if (eventTableId) {
        gs.print('✅ Event table created: ' + eventTableId);
        
        // Add event fields
        var eventFields = [
            {element: 'name', type: 'string', label: 'Event Name', max_length: 255},
            {element: 'start_date', type: 'glide_date_time', label: 'Start Date'},
            {element: 'end_date', type: 'glide_date_time', label: 'End Date'},
            {element: 'venue', type: 'reference', label: 'Venue', reference: 'x_som_sports_ops_venue'},
            {element: 'event_type', type: 'choice', label: 'Event Type', max_length: 50},
            {element: 'expected_attendance', type: 'integer', label: 'Expected Attendance'},
            {element: 'state', type: 'choice', label: 'State', max_length: 20}
        ];
        
        for (var k = 0; k < eventFields.length; k++) {
            var eventField = new GlideRecord('sys_dictionary');
            eventField.initialize();
            eventField.name = 'x_som_sports_ops_event';
            eventField.element = eventFields[k].element;
            eventField.column_label = eventFields[k].label;
            eventField.internal_type = eventFields[k].type;
            if (eventFields[k].max_length) eventField.max_length = eventFields[k].max_length;
            if (eventFields[k].reference) eventField.reference = eventFields[k].reference;
            eventField.sys_package = appId;
            eventField.sys_scope = appId;
            eventField.insert();
        }
        
        gs.print('✅ Event fields created');
    }
    
    // Create Sports Incident table (extends incident)
    var incidentTable = new GlideRecord('sys_db_object');
    incidentTable.initialize();
    incidentTable.name = 'x_som_sports_ops_sports_incident';
    incidentTable.label = 'Sports Incident';
    incidentTable.super_class = 'incident';
    incidentTable.sys_package = appId;
    incidentTable.sys_scope = appId;
    var incidentTableId = incidentTable.insert();
    
    if (incidentTableId) {
        gs.print('✅ Sports Incident table created: ' + incidentTableId);
        
        // Add sports incident specific fields
        var incidentFields = [
            {element: 'incident_type', type: 'choice', label: 'Incident Type', max_length: 50},
            {element: 'venue', type: 'reference', label: 'Venue', reference: 'x_som_sports_ops_venue'},
            {element: 'event', type: 'reference', label: 'Event', reference: 'x_som_sports_ops_event'},
            {element: 'location', type: 'string', label: 'Location', max_length: 255}
        ];
        
        for (var l = 0; l < incidentFields.length; l++) {
            var incidentField = new GlideRecord('sys_dictionary');
            incidentField.initialize();
            incidentField.name = 'x_som_sports_ops_sports_incident';
            incidentField.element = incidentFields[l].element;
            incidentField.column_label = incidentFields[l].label;
            incidentField.internal_type = incidentFields[l].type;
            if (incidentFields[l].max_length) incidentField.max_length = incidentFields[l].max_length;
            if (incidentFields[l].reference) incidentField.reference = incidentFields[l].reference;
            incidentField.sys_package = appId;
            incidentField.sys_scope = appId;
            incidentField.insert();
        }
        
        // Add incident type choices
        var incidentTypes = [
            {label: 'Technical/Equipment', value: 'technical'},
            {label: 'Facility/Infrastructure', value: 'facility'},
            {label: 'Safety Concern', value: 'safety'},
            {label: 'Security Issue', value: 'security'},
            {label: 'Medical Emergency', value: 'medical'},
            {label: 'Crowd Control', value: 'crowd_control'},
            {label: 'Weather Related', value: 'weather'},
            {label: 'Other', value: 'other'}
        ];
        
        for (var m = 0; m < incidentTypes.length; m++) {
            var incidentChoice = new GlideRecord('sys_choice');
            incidentChoice.initialize();
            incidentChoice.name = 'x_som_sports_ops_sports_incident';
            incidentChoice.element = 'incident_type';
            incidentChoice.label = incidentTypes[m].label;
            incidentChoice.value = incidentTypes[m].value;
            incidentChoice.sequence = m * 10;
            incidentChoice.sys_package = appId;
            incidentChoice.sys_scope = appId;
            incidentChoice.insert();
        }
        
        gs.print('✅ Sports Incident fields and choices created');
    }
    
    // Create basic module entries for navigation
    var modules = [
        {title: 'Venues', table: 'x_som_sports_ops_venue', order: 100},
        {title: 'Events', table: 'x_som_sports_ops_event', order: 200},
        {title: 'Sports Incidents', table: 'x_som_sports_ops_sports_incident', order: 300}
    ];
    
    for (var n = 0; n < modules.length; n++) {
        var module = new GlideRecord('sys_app_module');
        module.initialize();
        module.title = modules[n].title;
        module.name = modules[n].table;
        module.link_type = 'LIST';
        module.table = modules[n].table;
        module.application = appId;
        module.order = modules[n].order;
        module.sys_package = appId;
        module.sys_scope = appId;
        module.insert();
    }
    
    gs.print('✅ Navigation modules created');
    
    gs.print('🎉 Sports Operations Management application installed successfully!');
    gs.print('📍 Navigate to the application in Studio or via Application Navigator');
    gs.print('🔧 Next steps: Add sample data and test functionality');
    
} else {
    gs.print('❌ Failed to create application');
}