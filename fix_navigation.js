// Fix Sports Operations Navigation - Connect modules to tables

gs.print('🔧 Fixing Sports Operations navigation...\n');

// Get the application
var app = new GlideRecord('sys_app');
app.addQuery('name', 'Sports Operations Management');
app.query();

if (app.next()) {
    gs.print('✅ Found application: ' + app.name);
    var appId = app.sys_id;
    
    // Create/fix application menu first
    var appMenu = new GlideRecord('sys_app_application');
    appMenu.addQuery('title', 'Sports Operations Management');
    appMenu.query();
    
    var menuId;
    if (!appMenu.next()) {
        // Create application menu
        appMenu.initialize();
        appMenu.title = 'Sports Operations';
        appMenu.hint = 'Sports venue operations management';
        appMenu.order = 100;
        appMenu.active = true;
        appMenu.sys_scope = appId;
        menuId = appMenu.insert();
        gs.print('✅ Created application menu: ' + menuId);
    } else {
        menuId = appMenu.sys_id;
        gs.print('✅ Found existing menu: ' + menuId);
    }
    
    // Fix/create modules with proper table references
    var modules = [
        {
            title: 'Venues', 
            table: 'x_som_sports_ops_venue',
            name: 'venues',
            order: 100
        },
        {
            title: 'Events', 
            table: 'x_som_sports_ops_event',
            name: 'events', 
            order: 200
        },
        {
            title: 'Sports Incidents', 
            table: 'x_som_sports_ops_sports_incident',
            name: 'sports_incidents',
            order: 300
        }
    ];
    
    // Delete existing broken modules
    var oldModules = new GlideRecord('sys_app_module');
    oldModules.addQuery('application', menuId);
    oldModules.query();
    while (oldModules.next()) {
        gs.print('🗑️ Removing broken module: ' + oldModules.title);
        oldModules.deleteRecord();
    }
    
    // Create new modules
    for (var i = 0; i < modules.length; i++) {
        var module = new GlideRecord('sys_app_module');
        module.initialize();
        module.title = modules[i].title;
        module.name = modules[i].name;
        module.link_type = 'LIST';
        module.table = modules[i].table;
        module.application = menuId;
        module.order = modules[i].order;
        module.active = true;
        module.sys_scope = appId;
        
        var moduleId = module.insert();
        if (moduleId) {
            gs.print('✅ Created module: ' + modules[i].title + ' (' + modules[i].table + ')');
        } else {
            gs.print('❌ Failed to create module: ' + modules[i].title);
        }
    }
    
    // Check what tables actually exist
    gs.print('\n📊 Checking existing tables:');
    var tables = ['x_som_sports_ops_venue', 'x_som_sports_ops_event', 'x_som_sports_ops_sports_incident'];
    
    for (var j = 0; j < tables.length; j++) {
        var tableCheck = new GlideRecord('sys_db_object');
        tableCheck.addQuery('name', tables[j]);
        tableCheck.query();
        
        if (tableCheck.next()) {
            gs.print('✅ Table exists: ' + tables[j]);
        } else {
            gs.print('❌ Table missing: ' + tables[j]);
            
            // Create missing table
            if (tables[j] === 'x_som_sports_ops_event') {
                var eventTable = new GlideRecord('sys_db_object');
                eventTable.initialize();
                eventTable.name = 'x_som_sports_ops_event';
                eventTable.label = 'Event';
                eventTable.sys_scope = appId;
                eventTable.create_access = true;
                eventTable.read_access = true;
                eventTable.update_access = true;
                eventTable.insert();
                gs.print('✅ Created Event table');
            }
        }
    }
    
    gs.print('\n🎉 Navigation fix complete!');
    gs.print('📍 Look for "Sports Operations" in your Application Navigator (left side)');
    gs.print('📍 You should now see: Venues, Events, Sports Incidents');
    gs.print('🔄 You may need to refresh your browser or clear cache');
    
} else {
    gs.print('❌ Sports Operations Management application not found');
}