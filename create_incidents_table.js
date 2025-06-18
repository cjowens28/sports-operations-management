// Create the missing Sports Incidents table

gs.print('🔧 Creating Sports Incidents table...\n');

// Get the application
var app = new GlideRecord('sys_app');
app.addQuery('name', 'Sports Operations Management');
app.query();

if (app.next()) {
    var appId = app.sys_id;
    
    // Create Sports Incident table (extends incident)
    var incidentTable = new GlideRecord('sys_db_object');
    incidentTable.initialize();
    incidentTable.name = 'x_som_sports_ops_sports_incident';
    incidentTable.label = 'Sports Incident';
    incidentTable.super_class = 'incident';
    incidentTable.sys_scope = appId;
    incidentTable.create_access = true;
    incidentTable.read_access = true;
    incidentTable.update_access = true;
    incidentTable.delete_access = false;
    
    var incidentTableId = incidentTable.insert();
    
    if (incidentTableId) {
        gs.print('✅ Sports Incident table created: ' + incidentTableId);
        
        // Add sports-specific fields
        var fields = [
            {
                element: 'incident_type',
                label: 'Incident Type',
                type: 'choice',
                max_length: 50
            },
            {
                element: 'venue',
                label: 'Venue',
                type: 'reference',
                reference: 'x_som_sports_ops_venue'
            },
            {
                element: 'event',
                label: 'Event', 
                type: 'reference',
                reference: 'x_som_sports_ops_event'
            },
            {
                element: 'location_detail',
                label: 'Location Detail',
                type: 'string',
                max_length: 255
            }
        ];
        
        // Create the fields
        for (var i = 0; i < fields.length; i++) {
            var field = new GlideRecord('sys_dictionary');
            field.initialize();
            field.name = 'x_som_sports_ops_sports_incident';
            field.element = fields[i].element;
            field.column_label = fields[i].label;
            field.internal_type = fields[i].type;
            if (fields[i].max_length) field.max_length = fields[i].max_length;
            if (fields[i].reference) field.reference = fields[i].reference;
            field.active = true;
            field.sys_scope = appId;
            field.insert();
        }
        
        gs.print('✅ Sports Incident fields created');
        
        // Add choices for incident type
        var incidentTypes = [
            {label: 'Technical/Equipment', value: 'technical'},
            {label: 'Facility Issue', value: 'facility'},
            {label: 'Safety Concern', value: 'safety'},
            {label: 'Security Issue', value: 'security'},
            {label: 'Medical Emergency', value: 'medical'},
            {label: 'Crowd Control', value: 'crowd_control'},
            {label: 'Weather Related', value: 'weather'},
            {label: 'Other', value: 'other'}
        ];
        
        for (var j = 0; j < incidentTypes.length; j++) {
            var choice = new GlideRecord('sys_choice');
            choice.initialize();
            choice.name = 'x_som_sports_ops_sports_incident';
            choice.element = 'incident_type';
            choice.label = incidentTypes[j].label;
            choice.value = incidentTypes[j].value;
            choice.sequence = j * 10;
            choice.sys_scope = appId;
            choice.insert();
        }
        
        gs.print('✅ Incident type choices created');
        gs.print('\n🎉 Sports Incidents table setup complete!');
        
    } else {
        gs.print('❌ Failed to create Sports Incident table');
    }
    
} else {
    gs.print('❌ Application not found');
}

gs.print('\n📍 Now refresh your browser and check "Sports Operations" in the navigator!');