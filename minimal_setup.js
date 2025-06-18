// Minimal Sports Operations Setup - Just the essentials

gs.print('🚀 Starting minimal Sports Operations setup...\n');

// Step 1: Create the application
var app = new GlideRecord('sys_app');
app.initialize();
app.name = 'Sports Operations';
app.scope = 'x_som_sports_ops';
app.short_description = 'Sports venue operations';
app.description = 'Sports venue operations management';
app.version = '1.0.0';
app.active = true;
app.can_edit_in_studio = true;
app.trackable = true;

var appId = app.insert();

if (appId) {
    gs.print('✅ Application created: ' + appId);
    
    // Step 2: Create main application menu
    var appMenu = new GlideRecord('sys_app_application');
    appMenu.initialize();
    appMenu.title = 'Sports Operations';
    appMenu.hint = 'Sports venue management';
    appMenu.order = 100;
    appMenu.active = true;
    appMenu.sys_scope = appId;
    var menuId = appMenu.insert();
    
    if (menuId) {
        gs.print('✅ Application menu created: ' + menuId);
    }
    
    // Step 3: Create a simple venue table
    var venueTable = new GlideRecord('sys_db_object');
    venueTable.initialize();
    venueTable.name = 'x_som_sports_ops_venue';
    venueTable.label = 'Venue';
    venueTable.sys_scope = appId;
    venueTable.create_access = true;
    venueTable.read_access = true;
    venueTable.update_access = true;
    venueTable.delete_access = false;
    
    var venueTableId = venueTable.insert();
    
    if (venueTableId) {
        gs.print('✅ Venue table created: ' + venueTableId);
        
        // Add basic venue fields
        var nameField = new GlideRecord('sys_dictionary');
        nameField.initialize();
        nameField.name = 'x_som_sports_ops_venue';
        nameField.element = 'name';
        nameField.column_label = 'Venue Name';
        nameField.internal_type = 'string';
        nameField.max_length = 100;
        nameField.active = true;
        nameField.sys_scope = appId;
        nameField.insert();
        
        var addressField = new GlideRecord('sys_dictionary');
        addressField.initialize();
        addressField.name = 'x_som_sports_ops_venue';
        addressField.element = 'address';
        addressField.column_label = 'Address';
        addressField.internal_type = 'string';
        addressField.max_length = 255;
        addressField.active = true;
        addressField.sys_scope = appId;
        addressField.insert();
        
        gs.print('✅ Venue fields created');
        
        // Step 4: Create venue list module
        var venueModule = new GlideRecord('sys_app_module');
        venueModule.initialize();
        venueModule.title = 'Venues';
        venueModule.name = 'venues';
        venueModule.link_type = 'LIST';
        venueModule.table = 'x_som_sports_ops_venue';
        venueModule.application = menuId;
        venueModule.order = 100;
        venueModule.active = true;
        venueModule.sys_scope = appId;
        var venueModuleId = venueModule.insert();
        
        if (venueModuleId) {
            gs.print('✅ Venue module created: ' + venueModuleId);
        }
    }
    
    // Step 5: Create incident table (extends incident)
    var incidentTable = new GlideRecord('sys_db_object');
    incidentTable.initialize();
    incidentTable.name = 'x_som_sports_ops_incident';
    incidentTable.label = 'Sports Incident';
    incidentTable.super_class = 'incident';
    incidentTable.sys_scope = appId;
    
    var incidentTableId = incidentTable.insert();
    
    if (incidentTableId) {
        gs.print('✅ Sports Incident table created: ' + incidentTableId);
        
        // Add venue field to incidents
        var venueField = new GlideRecord('sys_dictionary');
        venueField.initialize();
        venueField.name = 'x_som_sports_ops_incident';
        venueField.element = 'venue';
        venueField.column_label = 'Venue';
        venueField.internal_type = 'reference';
        venueField.reference = 'x_som_sports_ops_venue';
        venueField.active = true;
        venueField.sys_scope = appId;
        venueField.insert();
        
        // Create incident module
        var incidentModule = new GlideRecord('sys_app_module');
        incidentModule.initialize();
        incidentModule.title = 'Sports Incidents';
        incidentModule.name = 'sports_incidents';
        incidentModule.link_type = 'LIST';
        incidentModule.table = 'x_som_sports_ops_incident';
        incidentModule.application = menuId;
        incidentModule.order = 200;
        incidentModule.active = true;
        incidentModule.sys_scope = appId;
        incidentModule.insert();
        
        gs.print('✅ Sports Incident module created');
    }
    
    gs.print('\n🎉 Setup complete!');
    gs.print('📍 Look for "Sports Operations" in your Application Navigator');
    gs.print('📍 Or go to Studio and find "Sports Operations" application');
    gs.print('🧪 Test by creating a venue and then a sports incident');
    
} else {
    gs.print('❌ Failed to create application');
    gs.print('💡 Make sure you have admin rights and are in global scope');
}

gs.print('\n🔍 Current user info:');
gs.print('User: ' + gs.getUserName());
gs.print('Roles: ' + gs.getUser().getRoles());
gs.print('Current scope: ' + gs.getCurrentScopeName());