# Sports Operations MCP Agent

A Model Context Protocol (MCP) server that provides multimodal AI capabilities for sports venue operations management.

## Features

### 🏟️ **Multimodal Sports Operations AI**
- **Image Analysis**: Analyze venue images for safety, capacity, and maintenance insights
- **Incident Intelligence**: Generate detailed incident reports with AI recommendations
- **Crowd Prediction**: Predict crowd flow patterns and optimize staffing
- **Maintenance Optimization**: AI-driven maintenance scheduling and cost optimization
- **ServiceNow Integration**: Direct integration with Yokohama instance

### 🤖 **AI Capabilities**
- **Computer Vision**: Venue safety analysis, capacity estimation, maintenance detection
- **Natural Language Processing**: Automated report generation and recommendations
- **Predictive Analytics**: Crowd flow prediction and maintenance forecasting
- **Real-time Decision Support**: Intelligent incident response and resource allocation

### 🔌 **Integration Points**
- **ServiceNow Yokohama**: Direct API integration for incidents, venues, events
- **Vision APIs**: OpenAI, Google Vision, Azure Computer Vision support
- **Monitoring Systems**: Real-time data feeds from venue sensors
- **Communication**: Slack, email, SMS notification integration

## Installation

```bash
# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env

# Edit configuration with your credentials
nano .env

# Start the agent
npm start
```

## Usage with Claude Code

### 1. **Configure MCP in Claude Code**
Add to your Claude Code settings:

```json
{
  "mcpServers": {
    "sports-ops-agent": {
      "command": "node",
      "args": ["./MCP-Agents/sports-ops-agent/index.js"],
      "env": {
        "NODE_ENV": "production"
      }
    }
  }
}
```

### 2. **Available Tools**

#### **analyze_venue_image**
Analyze venue images for operational insights:
```javascript
{
  "image_url": "https://example.com/venue.jpg",
  "analysis_type": "safety" // safety, capacity, maintenance, security, general
}
```

#### **generate_incident_report**
Generate AI-powered incident reports:
```javascript
{
  "incident_data": {
    "number": "SINC1000001",
    "short_description": "Audio system failure",
    "priority": "High"
  },
  "include_recommendations": true
}
```

#### **predict_crowd_flow**
Predict crowd patterns for events:
```javascript
{
  "venue_layout": "Stadium with 4 main entrances",
  "event_type": "Baseball game",
  "expected_attendance": 25000
}
```

#### **maintenance_schedule_optimizer**
Optimize maintenance schedules:
```javascript
{
  "equipment_data": [
    {"id": "HVAC_01", "name": "Main HVAC", "priority": "High"},
    {"id": "AUDIO_01", "name": "Sound System", "priority": "Medium"}
  ],
  "constraints": {"max_downtime": "4 hours", "budget": 10000}
}
```

#### **servicenow_integration**
Integrate with ServiceNow Yokohama:
```javascript
{
  "action": "get_incidents", // get_incidents, create_incident, get_venues, get_events
  "data": {"state": "New", "priority": "High"}
}
```

### 3. **Available Resources**

#### **sports-ops://venues**
Access venue data and analytics
```bash
# Returns venue information, capacity, status, active events
```

#### **sports-ops://incidents**
Real-time incident analytics
```bash
# Returns incident metrics, trends, top types, resolution times
```

#### **sports-ops://maintenance**
Predictive maintenance insights
```bash
# Returns maintenance schedule, efficiency scores, cost savings
```

## Example Use Cases

### 1. **Pre-Event Safety Check**
```bash
# Analyze venue safety before major event
analyze_venue_image({
  "image_url": "/path/to/venue-inspection.jpg",
  "analysis_type": "safety"
})
```

### 2. **Real-time Incident Response**
```bash
# Generate intelligent incident report with recommendations
generate_incident_report({
  "incident_data": {...},
  "include_recommendations": true
})
```

### 3. **Event Planning Optimization**
```bash
# Predict crowd flow and optimize staffing
predict_crowd_flow({
  "venue_layout": "Multi-level arena",
  "event_type": "Concert",
  "expected_attendance": 15000
})
```

### 4. **Maintenance Intelligence**
```bash
# Optimize maintenance schedule to minimize disruption
maintenance_schedule_optimizer({
  "equipment_data": [...],
  "constraints": {"event_blackout_dates": ["2024-07-15", "2024-07-20"]}
})
```

## Advanced Configuration

### **Environment Variables**
See `.env.example` for all configuration options including:
- ServiceNow API credentials
- AI service API keys  
- Notification endpoints
- Logging and debug settings

### **Custom Integration**
The agent supports custom integration with:
- Building management systems
- Security camera networks
- IoT sensor arrays
- Weather services
- Emergency response systems

## Development

### **Adding New Tools**
1. Add tool definition in `setupToolHandlers()`
2. Implement tool logic as async method
3. Add error handling and validation
4. Update documentation

### **Extending AI Capabilities**
- Integrate additional vision models
- Add natural language understanding
- Implement predictive models
- Connect real-time data streams

## Security & Compliance

- **API Security**: All external APIs use secure authentication
- **Data Privacy**: Sensitive data is encrypted and access-controlled
- **Audit Logging**: All agent actions are logged for compliance
- **Role-based Access**: Integration with ServiceNow role security

## Support

For issues, feature requests, or integration support:
- Check the GitHub repository for updates
- Review ServiceNow integration documentation
- Test with Claude Code MCP inspector tools