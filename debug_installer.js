// Debug installer - Check what happened and fix issues

// First, let's see if the app already exists
var existingApp = new GlideRecord('sys_app');
existingApp.addQuery('name', 'Sports Operations Management');
existingApp.query();

if (existingApp.next()) {
    gs.print('✅ Application already exists: ' + existingApp.sys_id);
    gs.print('📍 Application name: ' + existingApp.name);
    gs.print('📍 Application scope: ' + existingApp.scope);
    
    // Check if tables exist
    var venueTable = new GlideRecord('sys_db_object');
    venueTable.addQuery('name', 'x_som_sports_ops_venue');
    venueTable.query();
    
    if (venueTable.next()) {
        gs.print('✅ Venue table exists: ' + venueTable.sys_id);
    } else {
        gs.print('❌ Venue table missing - need to create tables');
    }
    
    // Check for modules (navigation)
    var modules = new GlideRecord('sys_app_module');
    modules.addQuery('application', existingApp.sys_id);
    modules.query();
    
    gs.print('📊 Found ' + modules.getRowCount() + ' navigation modules');
    
    while (modules.next()) {
        gs.print('  - ' + modules.title + ' (' + modules.table + ')');
    }
    
} else {
    gs.print('❌ Application not found - let\'s create it step by step');
    
    // Create just the application first
    var app = new GlideRecord('sys_app');
    app.initialize();
    app.name = 'Sports Operations Management';
    app.scope = 'x_som_sports_ops';
    app.short_description = 'Sports venue operations';
    app.version = '1.0.0';
    app.active = true;
    app.can_edit_in_studio = true;
    
    var appId = app.insert();
    
    if (appId) {
        gs.print('✅ Application created successfully: ' + appId);
        gs.print('📍 You can now find it in Studio > Applications');
        
        // Create a simple application module for navigation
        var appModule = new GlideRecord('sys_app_module');
        appModule.initialize();
        appModule.title = 'Sports Operations';
        appModule.name = 'Sports Operations';
        appModule.hint = 'Sports venue operations management';
        appModule.application = appId;
        appModule.order = 100;
        appModule.active = true;
        var moduleId = appModule.insert();
        
        if (moduleId) {
            gs.print('✅ Navigation module created: ' + moduleId);
            gs.print('📍 Look for "Sports Operations" in your application navigator');
        }
        
    } else {
        gs.print('❌ Failed to create application');
        gs.print('🔍 Check if you have admin rights');
        gs.print('🔍 Try running in global scope');
    }
}

// List all custom applications to help you find it
gs.print('\n📋 All custom applications in your instance:');
var allApps = new GlideRecord('sys_app');
allApps.addQuery('source', '!=', '');
allApps.addQuery('name', 'CONTAINS', 'Sports');
allApps.addEncodedQuery('ORname=Sports Operations Management');
allApps.query();

while (allApps.next()) {
    gs.print('  🎯 ' + allApps.name + ' (scope: ' + allApps.scope + ')');
}