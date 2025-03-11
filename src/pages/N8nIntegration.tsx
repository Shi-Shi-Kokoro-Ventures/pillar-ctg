
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const N8nIntegration = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [payloadJson, setPayloadJson] = useState(
    JSON.stringify({
      name: "Test User",
      email: "test@example.com",
      message: "Hello from PILLAR Initiative!",
    }, null, 2)
  );
  const [isLoading, setIsLoading] = useState(false);
  const [testResponse, setTestResponse] = useState<any>(null);

  const handleTriggerN8n = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!webhookUrl) {
      toast.error("Please enter your n8n webhook URL");
      return;
    }

    let payload;
    try {
      payload = JSON.parse(payloadJson);
    } catch (error) {
      toast.error("Invalid JSON payload. Please check your format.");
      return;
    }

    setIsLoading(true);
    setTestResponse(null);
    
    try {
      const { data, error } = await supabase.functions.invoke("trigger-n8n", {
        body: { webhookUrl, payload }
      });

      if (error) throw error;
      
      setTestResponse(data);
      toast.success("Successfully triggered n8n workflow!");
    } catch (error) {
      console.error("Error triggering n8n webhook:", error);
      toast.error("Failed to trigger n8n webhook. Please check the URL and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>n8n Integration | PILLAR Initiative</title>
        <meta name="description" content="Integrate PILLAR Initiative with n8n workflows for automation" />
      </Helmet>
      
      <Navbar />
      
      <main className="container max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-3xl md:text-4xl font-bold gradient-text">n8n Integration</h1>
            <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto max-w-3xl">
              Connect PILLAR Initiative with n8n for powerful workflow automation
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>What is n8n?</CardTitle>
                <CardDescription>A powerful workflow automation tool</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">
                  n8n is an open-source workflow automation tool that allows you to connect different 
                  services and automate workflows between them. It's similar to Zapier or Make (Integromat), 
                  but can be self-hosted and offers more flexibility.
                </p>
                <h3 className="font-semibold text-lg mt-4">Common Use Cases:</h3>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Automate donation acknowledgement emails</li>
                  <li>Sync volunteer data with CRM systems</li>
                  <li>Trigger notifications when new resources are available</li>
                  <li>Create tasks in project management tools</li>
                  <li>Send SMS alerts for emergency situations</li>
                </ul>
                <div className="flex justify-center mt-6">
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <a href="https://n8n.io/" target="_blank" rel="noopener noreferrer">
                      Learn More About n8n
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Test n8n Integration</CardTitle>
                <CardDescription>Trigger an n8n workflow from PILLAR Initiative</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="test">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="test">Test Webhook</TabsTrigger>
                    <TabsTrigger value="docs">Documentation</TabsTrigger>
                  </TabsList>
                  <TabsContent value="test" className="space-y-4 pt-4">
                    <form onSubmit={handleTriggerN8n} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="webhook-url">n8n Webhook URL</Label>
                        <Input
                          id="webhook-url"
                          placeholder="https://your-n8n-instance.com/webhook/path..."
                          value={webhookUrl}
                          onChange={(e) => setWebhookUrl(e.target.value)}
                          required
                        />
                        <p className="text-xs text-gray-500">
                          Enter the webhook URL from your n8n workflow
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="payload">Payload (JSON)</Label>
                        <Textarea
                          id="payload"
                          value={payloadJson}
                          onChange={(e) => setPayloadJson(e.target.value)}
                          rows={6}
                          className="font-mono text-sm"
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        className="w-full" 
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Triggering Workflow...
                          </>
                        ) : (
                          "Trigger n8n Workflow"
                        )}
                      </Button>
                    </form>
                    
                    {testResponse && (
                      <div className="mt-4 p-4 rounded-md bg-gray-50 border">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle2 className="h-5 w-5 text-green-500" />
                          <h3 className="font-medium">Response from n8n:</h3>
                        </div>
                        <pre className="text-xs bg-gray-100 p-3 rounded overflow-auto">
                          {JSON.stringify(testResponse, null, 2)}
                        </pre>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="docs" className="space-y-4 pt-4">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg">How to Set Up Integration</h3>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">1. Create a webhook node in n8n</h4>
                        <p className="text-sm text-gray-700">
                          In your n8n instance, add a "Webhook" node as a trigger. Copy the webhook URL.
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">2. Use our trigger endpoint</h4>
                        <p className="text-sm text-gray-700">
                          You can trigger n8n workflows from your application code using our API endpoint:
                        </p>
                        <div className="bg-gray-100 p-3 rounded-md">
                          <code className="text-xs font-mono break-all">
                            const {'{'} data, error {'}'} = await supabase.functions.invoke("trigger-n8n", {'{'}<br/>
                            &nbsp;&nbsp;body: {'{'} webhookUrl: "your-n8n-webhook-url", payload: yourData {'}'}<br/>
                            {'}'});
                          </code>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <h4 className="font-medium">3. Receive webhooks from n8n</h4>
                        <p className="text-sm text-gray-700">
                          You can also receive webhooks from n8n using our webhook endpoint:
                        </p>
                        <div className="bg-gray-100 p-3 rounded-md">
                          <code className="text-xs font-mono break-all">
                            https://qbzuocsgfkugpsahesay.supabase.co/functions/v1/n8n-webhook
                          </code>
                        </div>
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          For production, implement proper authentication for this webhook
                        </p>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <Card className="glass-card mt-8">
            <CardHeader>
              <CardTitle>Integration Capabilities</CardTitle>
              <CardDescription>What you can do with PILLAR Initiative + n8n</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-3">
                <div className="space-y-2">
                  <h3 className="font-semibold">Data Synchronization</h3>
                  <p className="text-sm text-gray-700">
                    Automatically sync data between PILLAR Initiative and other systems like CRMs, 
                    databases, or spreadsheets.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Automated Notifications</h3>
                  <p className="text-sm text-gray-700">
                    Send customized emails, SMS, or push notifications based on triggers in the PILLAR system.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Custom Reporting</h3>
                  <p className="text-sm text-gray-700">
                    Generate and distribute reports automatically on a schedule or when specific events occur.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Multi-step Workflows</h3>
                  <p className="text-sm text-gray-700">
                    Create complex workflows that involve multiple systems and conditional logic.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Form Processing</h3>
                  <p className="text-sm text-gray-700">
                    Process form submissions from the website and route data to appropriate systems.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold">Social Media Integration</h3>
                  <p className="text-sm text-gray-700">
                    Automate posting to social media platforms when new content or events are added.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </>
  );
};

export default N8nIntegration;
