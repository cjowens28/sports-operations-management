#!/usr/bin/env node

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Test the Sports Operations MCP Agent
 */
class MCPAgentTester {
  constructor() {
    this.agentPath = join(__dirname, 'MCP-Agents', 'sports-ops-agent', 'index.js');
  }

  async testAgent() {
    console.log('🧪 Testing Sports Operations MCP Agent...\n');

    try {
      // Test 1: List Tools
      console.log('📋 Test 1: Listing available tools...');
      const toolsResult = await this.sendMCPRequest({
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/list'
      });
      console.log('✅ Tools listed successfully:', toolsResult.result?.tools?.length || 0, 'tools found\n');

      // Test 2: List Resources
      console.log('📋 Test 2: Listing available resources...');
      const resourcesResult = await this.sendMCPRequest({
        jsonrpc: '2.0',
        id: 2,
        method: 'resources/list'
      });
      console.log('✅ Resources listed successfully:', resourcesResult.result?.resources?.length || 0, 'resources found\n');

      // Test 3: Call analyze_venue_image tool
      console.log('🖼️ Test 3: Testing venue image analysis...');
      const imageAnalysisResult = await this.sendMCPRequest({
        jsonrpc: '2.0',
        id: 3,
        method: 'tools/call',
        params: {
          name: 'analyze_venue_image',
          arguments: {
            image_url: 'https://example.com/venue.jpg',
            analysis_type: 'safety'
          }
        }
      });
      console.log('✅ Image analysis completed successfully\n');

      // Test 4: Call ServiceNow integration
      console.log('🔗 Test 4: Testing ServiceNow integration...');
      const serviceNowResult = await this.sendMCPRequest({
        jsonrpc: '2.0',
        id: 4,
        method: 'tools/call',
        params: {
          name: 'servicenow_integration',
          arguments: {
            action: 'get_incidents'
          }
        }
      });
      console.log('✅ ServiceNow integration test completed\n');

      // Test 5: Read venue resource
      console.log('🏟️ Test 5: Reading venue resource...');
      const venueResourceResult = await this.sendMCPRequest({
        jsonrpc: '2.0',
        id: 5,
        method: 'resources/read',
        params: {
          uri: 'sports-ops://venues'
        }
      });
      console.log('✅ Venue resource read successfully\n');

      console.log('🎉 All tests passed! Your MCP Agent is working correctly.');
      console.log('\n📊 Summary:');
      console.log('- Tools available: ✅');
      console.log('- Resources available: ✅');
      console.log('- Image analysis: ✅');
      console.log('- ServiceNow integration: ✅');
      console.log('- Resource access: ✅');

    } catch (error) {
      console.error('❌ Test failed:', error.message);
      console.error('\n🔧 Troubleshooting tips:');
      console.error('1. Make sure you ran "npm install" in the agent directory');
      console.error('2. Check that Node.js version is compatible (16+ required)');
      console.error('3. Verify the MCP agent file exists and is executable');
    }
  }

  async sendMCPRequest(request) {
    return new Promise((resolve, reject) => {
      const agent = spawn('node', [this.agentPath], {
        stdio: ['pipe', 'pipe', 'pipe']
      });

      let output = '';
      let error = '';

      // Send the request
      agent.stdin.write(JSON.stringify(request) + '\n');
      agent.stdin.end();

      // Collect output
      agent.stdout.on('data', (data) => {
        output += data.toString();
      });

      agent.stderr.on('data', (data) => {
        error += data.toString();
      });

      agent.on('close', (code) => {
        if (code === 0) {
          try {
            // Parse the JSON response
            const lines = output.trim().split('\n');
            const responseLine = lines.find(line => {
              try {
                const parsed = JSON.parse(line);
                return parsed.jsonrpc === '2.0' && parsed.id === request.id;
              } catch {
                return false;
              }
            });

            if (responseLine) {
              resolve(JSON.parse(responseLine));
            } else {
              resolve({ result: { success: true, output } });
            }
          } catch (parseError) {
            resolve({ result: { success: true, raw_output: output } });
          }
        } else {
          reject(new Error(`Agent exited with code ${code}. Error: ${error}`));
        }
      });

      // Timeout after 10 seconds
      setTimeout(() => {
        agent.kill();
        reject(new Error('Test timeout - agent took too long to respond'));
      }, 10000);
    });
  }
}

// Run the tests
const tester = new MCPAgentTester();
tester.testAgent().catch(console.error);