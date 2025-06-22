#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ErrorCode,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

/**
 * Sports Operations Management MCP Agent
 * Provides multimodal AI capabilities for sports venue operations
 */
class SportsOpsAgent {
  constructor() {
    this.server = new Server(
      {
        name: 'sports-ops-agent',
        version: '1.0.0',
      },
      {
        capabilities: {
          tools: {},
          resources: {},
        },
      }
    );

    this.setupToolHandlers();
    this.setupResourceHandlers();
  }

  setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => {
      return {
        tools: [
          {
            name: 'analyze_venue_image',
            description: 'Analyze venue images for safety, capacity, and operational insights',
            inputSchema: {
              type: 'object',
              properties: {
                image_url: {
                  type: 'string',
                  description: 'URL or base64 encoded image of the venue'
                },
                analysis_type: {
                  type: 'string',
                  enum: ['safety', 'capacity', 'maintenance', 'security', 'general'],
                  description: 'Type of analysis to perform'
                }
              },
              required: ['image_url', 'analysis_type']
            }
          },
          {
            name: 'generate_incident_report',
            description: 'Generate detailed incident reports with AI analysis',
            inputSchema: {
              type: 'object',
              properties: {
                incident_data: {
                  type: 'object',
                  description: 'Incident data from ServiceNow'
                },
                include_recommendations: {
                  type: 'boolean',
                  description: 'Include AI-generated recommendations',
                  default: true
                }
              },
              required: ['incident_data']
            }
          },
          {
            name: 'predict_crowd_flow',
            description: 'Predict crowd flow patterns for events',
            inputSchema: {
              type: 'object',
              properties: {
                venue_layout: {
                  type: 'string',
                  description: 'Venue layout image or description'
                },
                event_type: {
                  type: 'string',
                  description: 'Type of event (concert, sports, etc.)'
                },
                expected_attendance: {
                  type: 'number',
                  description: 'Expected number of attendees'
                }
              },
              required: ['venue_layout', 'event_type', 'expected_attendance']
            }
          },
          {
            name: 'maintenance_schedule_optimizer',
            description: 'Optimize maintenance schedules using AI',
            inputSchema: {
              type: 'object',
              properties: {
                equipment_data: {
                  type: 'array',
                  description: 'Array of equipment/asset data'
                },
                constraints: {
                  type: 'object',
                  description: 'Scheduling constraints and preferences'
                }
              },
              required: ['equipment_data']
            }
          },
          {
            name: 'servicenow_integration',
            description: 'Integrate with ServiceNow Yokohama instance',
            inputSchema: {
              type: 'object',
              properties: {
                action: {
                  type: 'string',
                  enum: ['get_incidents', 'create_incident', 'update_incident', 'get_venues', 'get_events'],
                  description: 'ServiceNow action to perform'
                },
                data: {
                  type: 'object',
                  description: 'Data for the action'
                }
              },
              required: ['action']
            }
          }
        ]
      };
    });

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args } = request.params;

      try {
        switch (name) {
          case 'analyze_venue_image':
            return await this.analyzeVenueImage(args);
          
          case 'generate_incident_report':
            return await this.generateIncidentReport(args);
          
          case 'predict_crowd_flow':
            return await this.predictCrowdFlow(args);
          
          case 'maintenance_schedule_optimizer':
            return await this.optimizeMaintenanceSchedule(args);
          
          case 'servicenow_integration':
            return await this.serviceNowIntegration(args);
          
          default:
            throw new McpError(
              ErrorCode.MethodNotFound,
              `Unknown tool: ${name}`
            );
        }
      } catch (error) {
        throw new McpError(
          ErrorCode.InternalError,
          `Error executing tool ${name}: ${error.message}`
        );
      }
    });
  }

  setupResourceHandlers() {
    // List available resources
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: [
          {
            uri: 'sports-ops://venues',
            name: 'Sports Venues',
            description: 'Access to sports venue data and analytics',
            mimeType: 'application/json'
          },
          {
            uri: 'sports-ops://incidents',
            name: 'Incident Analytics',
            description: 'Real-time incident data and analysis',
            mimeType: 'application/json'
          },
          {
            uri: 'sports-ops://maintenance',
            name: 'Maintenance Insights',
            description: 'Predictive maintenance recommendations',
            mimeType: 'application/json'
          }
        ]
      };
    });

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      const { uri } = request.params;

      switch (uri) {
        case 'sports-ops://venues':
          return await this.getVenueData();
        case 'sports-ops://incidents':
          return await this.getIncidentAnalytics();
        case 'sports-ops://maintenance':
          return await this.getMaintenanceInsights();
        default:
          throw new McpError(
            ErrorCode.InvalidRequest,
            `Unknown resource: ${uri}`
          );
      }
    });
  }

  // Tool implementations
  async analyzeVenueImage(args) {
    const { image_url, analysis_type } = args;
    
    // Simulate image analysis (in production, integrate with vision AI)
    const analysis = {
      image_url,
      analysis_type,
      timestamp: new Date().toISOString(),
      results: {
        safety_score: Math.floor(Math.random() * 40) + 60, // 60-100
        capacity_estimate: analysis_type === 'capacity' ? Math.floor(Math.random() * 5000) + 1000 : null,
        maintenance_issues: analysis_type === 'maintenance' ? [
          'Minor wear on seating section A',
          'Exit sign needs replacement in zone 3'
        ] : [],
        security_concerns: analysis_type === 'security' ? [
          'Blind spot detected near entrance 2',
          'Camera coverage adequate in main areas'
        ] : [],
        recommendations: [
          'Schedule routine inspection for identified areas',
          'Consider additional lighting in darker zones',
          'Update emergency evacuation signage'
        ]
      }
    };

    return {
      content: [
        {
          type: 'text',
          text: `## Venue Image Analysis Results\n\n**Analysis Type:** ${analysis_type}\n**Safety Score:** ${analysis.results.safety_score}/100\n\n${JSON.stringify(analysis.results, null, 2)}`
        }
      ]
    };
  }

  async generateIncidentReport(args) {
    const { incident_data, include_recommendations = true } = args;
    
    const report = {
      incident_id: incident_data.number || 'SINC' + Date.now(),
      summary: incident_data.short_description || 'Sports venue incident',
      severity: incident_data.priority || 'Medium',
      analysis: {
        root_cause: 'Equipment malfunction due to weather conditions',
        impact_assessment: 'Limited disruption to event operations',
        response_time: '12 minutes',
        resolution_status: 'In Progress'
      },
      recommendations: include_recommendations ? [
        'Implement weatherproofing for outdoor equipment',
        'Establish backup systems for critical operations',
        'Train staff on rapid response protocols',
        'Schedule preventive maintenance during off-season'
      ] : []
    };

    return {
      content: [
        {
          type: 'text',
          text: `# Incident Report\n\n${JSON.stringify(report, null, 2)}`
        }
      ]
    };
  }

  async predictCrowdFlow(args) {
    const { venue_layout, event_type, expected_attendance } = args;
    
    const prediction = {
      event_type,
      expected_attendance,
      flow_patterns: {
        entry_peak: '1 hour before event start',
        exit_peak: '15 minutes after event end',
        bottlenecks: ['Main entrance', 'Concession areas', 'Restroom zones'],
        recommended_staffing: {
          security: Math.ceil(expected_attendance / 500),
          ushers: Math.ceil(expected_attendance / 300),
          concessions: Math.ceil(expected_attendance / 200)
        }
      },
      risk_areas: [
        'Entrance gates during arrival rush',
        'Emergency exits during evacuation scenarios',
        'Parking areas post-event'
      ]
    };

    return {
      content: [
        {
          type: 'text',
          text: `# Crowd Flow Prediction\n\n${JSON.stringify(prediction, null, 2)}`
        }
      ]
    };
  }

  async optimizeMaintenanceSchedule(args) {
    const { equipment_data, constraints = {} } = args;
    
    const schedule = {
      optimization_date: new Date().toISOString(),
      total_assets: equipment_data.length,
      optimized_schedule: equipment_data.map((asset, index) => ({
        asset_id: asset.id || `ASSET_${index + 1}`,
        asset_name: asset.name || `Equipment ${index + 1}`,
        priority: asset.priority || 'Medium',
        recommended_date: new Date(Date.now() + (index * 7 * 24 * 60 * 60 * 1000)).toISOString().split('T')[0],
        estimated_duration: '2-4 hours',
        required_skills: ['Electrical', 'Mechanical'],
        cost_estimate: Math.floor(Math.random() * 500) + 100
      })),
      efficiency_gain: '23% reduction in downtime',
      cost_savings: '$12,500 annually'
    };

    return {
      content: [
        {
          type: 'text',
          text: `# Optimized Maintenance Schedule\n\n${JSON.stringify(schedule, null, 2)}`
        }
      ]
    };
  }

  async serviceNowIntegration(args) {
    const { action, data = {} } = args;
    
    // Simulate ServiceNow API calls (replace with actual Yokohama integration)
    const mockResponse = {
      action,
      timestamp: new Date().toISOString(),
      status: 'success',
      data: this.getMockServiceNowData(action, data)
    };

    return {
      content: [
        {
          type: 'text',
          text: `# ServiceNow Integration Result\n\n${JSON.stringify(mockResponse, null, 2)}`
        }
      ]
    };
  }

  getMockServiceNowData(action, data) {
    switch (action) {
      case 'get_incidents':
        return [
          { number: 'SINC1000001', short_description: 'Audio system failure', state: 'In Progress' },
          { number: 'SINC1000002', short_description: 'Lighting malfunction', state: 'New' }
        ];
      case 'get_venues':
        return [
          { name: 'Yokohama Stadium', capacity: 30000, type: 'Stadium' },
          { name: 'Arena Complex', capacity: 15000, type: 'Arena' }
        ];
      case 'get_events':
        return [
          { name: 'Baseball Championship', venue: 'Yokohama Stadium', date: '2024-07-15' },
          { name: 'Concert Series', venue: 'Arena Complex', date: '2024-07-20' }
        ];
      default:
        return { message: `Action ${action} completed successfully` };
    }
  }

  // Resource handlers
  async getVenueData() {
    return {
      contents: [
        {
          uri: 'sports-ops://venues',
          mimeType: 'application/json',
          text: JSON.stringify({
            venues: [
              { id: 1, name: 'Yokohama Stadium', capacity: 30000, status: 'Active' },
              { id: 2, name: 'Arena Complex', capacity: 15000, status: 'Active' }
            ],
            total_venues: 2,
            active_events: 3
          })
        }
      ]
    };
  }

  async getIncidentAnalytics() {
    return {
      contents: [
        {
          uri: 'sports-ops://incidents',
          mimeType: 'application/json',
          text: JSON.stringify({
            total_incidents: 145,
            open_incidents: 12,
            avg_resolution_time: '4.2 hours',
            top_incident_types: ['Technical', 'Facility', 'Safety'],
            trend: 'Decreasing (-15% this month)'
          })
        }
      ]
    };
  }

  async getMaintenanceInsights() {
    return {
      contents: [
        {
          uri: 'sports-ops://maintenance',
          mimeType: 'application/json',
          text: JSON.stringify({
            upcoming_maintenance: 8,
            overdue_items: 2,
            efficiency_score: 87,
            cost_savings_ytd: '$45,200',
            predictive_alerts: [
              'HVAC system requires attention in 2 weeks',
              'Sound system due for calibration'
            ]
          })
        }
      ]
    };
  }

  async start() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Sports Operations MCP Agent started successfully');
  }
}

// Start the agent
const agent = new SportsOpsAgent();
agent.start().catch(console.error);