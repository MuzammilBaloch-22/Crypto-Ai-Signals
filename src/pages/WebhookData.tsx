import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Webhook, Trash2, Clock, CheckCircle2, XCircle, ArrowLeft, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WebhookPayload {
  id: string;
  timestamp: string;
  pair?: string;
  request?: any;
  response: any;
  status: "success" | "error";
}

const WebhookData = () => {
  const [webhookData, setWebhookData] = useState<WebhookPayload[]>([]);

  // Load webhook data from localStorage
  const loadWebhookData = () => {
    const storedData = localStorage.getItem("webhookData");
    if (storedData) {
      try {
        const parsed = JSON.parse(storedData);
        setWebhookData(parsed);
      } catch (error) {
        console.error("Error parsing webhook data:", error);
        setWebhookData([]);
      }
    }
  };

  // Load data on mount and set up interval to check for updates
  useEffect(() => {
    loadWebhookData();
    
    // Check for updates every 2 seconds
    const interval = setInterval(() => {
      loadWebhookData();
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  const clearData = () => {
    localStorage.removeItem("webhookData");
    setWebhookData([]);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className="min-h-screen gradient-bg-subtle relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      
      {/* Header */}
      <header className="relative z-10 px-6 py-5 border-b border-border/50">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              className="w-10 h-10 flex items-center justify-center rounded-lg border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted-foreground" />
            </Link>
            <div className="w-10 h-10 gradient-primary rounded-lg flex items-center justify-center">
              <Webhook className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Webhook Data Monitor</h1>
              <p className="text-xs text-muted-foreground">Real-time webhook payload viewer</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={clearData}
              className="gap-2"
              disabled={webhookData.length === 0}
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-8 max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Received</p>
                <p className="text-2xl font-bold text-foreground">{webhookData.length}</p>
              </div>
              <Webhook className="w-8 h-8 text-primary/50" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Successful</p>
                <p className="text-2xl font-bold text-success">
                  {webhookData.filter(d => d.status === "success").length}
                </p>
              </div>
              <CheckCircle2 className="w-8 h-8 text-success/50" />
            </div>
          </Card>
          
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Errors</p>
                <p className="text-2xl font-bold text-destructive">
                  {webhookData.filter(d => d.status === "error").length}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-destructive/50" />
            </div>
          </Card>
        </div>

        {/* Webhook Data List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {webhookData.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Webhook className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground">No webhook data received yet</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Click "Refresh" to fetch data from your webhook endpoint
                </p>
              </motion.div>
            ) : (
              webhookData.map((payload, index) => (
                <motion.div
                  key={payload.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="p-5 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={payload.status === "success" ? "default" : "destructive"}
                          className="gap-1"
                        >
                          {payload.status === "success" ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <XCircle className="w-3 h-3" />
                          )}
                          {payload.status}
                        </Badge>
                        {payload.pair && (
                          <Badge variant="outline" className="gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {payload.pair}
                          </Badge>
                        )}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatTimestamp(payload.timestamp)}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground font-mono">
                        ID: {payload.id}
                      </span>
                    </div>
                    
                    {/* Request Section */}
                    {payload.request && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-muted-foreground mb-2">REQUEST:</p>
                        <div className="bg-muted/50 rounded-lg p-3 overflow-x-auto">
                          <pre className="text-xs text-foreground font-mono">
                            {JSON.stringify(payload.request, null, 2)}
                          </pre>
                        </div>
                      </div>
                    )}
                    
                    {/* Response Section */}
                    <div>
                      <p className="text-xs font-semibold text-muted-foreground mb-2">RESPONSE:</p>
                      <div className="bg-muted/50 rounded-lg p-3 overflow-x-auto">
                        <pre className="text-xs text-foreground font-mono">
                          {JSON.stringify(payload.response, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default WebhookData;
