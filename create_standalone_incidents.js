// Create standalone Sports Incidents table (not extending incident)

gs.print('🔧 Creating standalone Sports Incidents table...\n');

// Get the application
var app = new GlideRecord('sys_app');
app.addQuery('name', 'Sports Operations Management');
app.query();

if (app.next()) {
    var appId = app.sys_id;
    
    // Create standalone Sports Incident table
    var incidentTable = new GlideRecord('sys_db_object');
    incidentTable.initialize();
    incidentTable.name = 'x_som_sports_ops_sports_incident';
    incidentTable.label = 'Sports Incident';
    // No super_class - make it standalone
    incidentTable.sys_scope = appId;
    incidentTable.create_access = true;
    incidentTable.read_access = true;
    incidentTable.update_access = true;
    incidentTable.delete_access = false;
    
    var incidentTableId = incidentTable.insert();
    
    if (incidentTableId) {
        gs.print('✅ Sports Incident table created: ' + incidentTableId);
        
        // Add all necessary fields for incident management
        var fields = [
            {
                element: 'number',
                label: 'Number',
                type: 'string',
                max_length: 40,
                unique: true
            },
            {
                element: 'short_description',
                label: 'Short Description',
                type: 'string',
                max_length: 160
            },
            {
                element: 'description',
                label: 'Description',
                type: 'string',
                max_length: 4000
            },
            {
                element: 'incident_type',
                label: 'Incident Type',
                type: 'choice',
                max_length: 50
            },
            {
                element: 'priority',
                label: 'Priority',
                type: 'choice',
                max_length: 20
            },
            {
                element: 'state',
                label: 'State',
                type: 'choice',
                max_length: 20
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
            },
            {
                element: 'caller_id',
                label: 'Reported By',
                type: 'reference',
                reference: 'sys_user'
            },
            {
                element: 'assigned_to',
                label: 'Assigned To',
                type: 'reference',
                reference: 'sys_user'
            },
            {
                element: 'opened_at',
                label: 'Opened',
                type: 'glide_date_time'
            },
            {
                element: 'resolved_at',
                label: 'Resolved',
                type: 'glide_date_time'
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
            if (fields[i].unique) field.unique = fields[i].unique;
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
        
        // Add priority choices
        var priorities = [
            {label: '1 - Critical', value: '1'},
            {label: '2 - High', value: '2'},
            {label: '3 - Medium', value: '3'},
            {label: '4 - Low', value: '4'}
        ];
        
        for (var k = 0; k < priorities.length; k++) {
            var priorityChoice = new GlideRecord('sys_choice');
            priorityChoice.initialize();
            priorityChoice.name = 'x_som_sports_ops_sports_incident';
            priorityChoice.element = 'priority';
            priorityChoice.label = priorities[k].label;
            priorityChoice.value = priorities[k].value;
            priorityChoice.sequence = k * 10;
            priorityChoice.sys_scope = appId;
            priorityChoice.insert();
        }
        
        // Add state choices
        var states = [
            {label: 'New', value: 'new'},
            {label: 'In Progress', value: 'in_progress'},
            {label: 'On Hold', value: 'on_hold'},
            {label: 'Resolved', value: 'resolved'},
            {label: 'Closed', value: 'closed'}
        ];
        
        for (var l = 0; l < states.length; l++) {
            var stateChoice = new GlideRecord('sys_choice');
            stateChoice.initialize();
            stateChoice.name = 'x_som_sports_ops_sports_incident';
            stateChoice.element = 'state';
            stateChoice.label = states[l].label;
            stateChoice.value = states[l].value;
            stateChoice.sequence = l * 10;
            stateChoice.sys_scope = appId;
            stateChoice.insert();
        }
        
        gs.print('✅ All incident choices created');
        
        // Create a number generator for incidents
        var numberGenerator = new GlideRecord('sys_number');
        numberGenerator.initialize();
        numberGenerator.table = 'x_som_sports_ops_sports_incident';
        numberGenerator.category = 'incident';
        numberGenerator.prefix = 'SINC';
        numberGenerator.number = 1000001;
        numberGenerator.sys_scope = appId;
        numberGenerator.insert();
        
        gs.print('✅ Incident numbering setup complete');
        gs.print('\n🎉 Standalone Sports Incidents table created successfully!');
        
    } else {
        gs.print('❌ Failed to create Sports Incident table');
    }
    
} else {
    gs.print('❌ Application not found');
}

gs.print('\n📍 Refresh browser and check "Sports Operations" → "Sports Incidents"!');
gs.print('📝 You can now create incidents like SINC1000001, SINC1000002, etc.');