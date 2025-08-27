import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Shield, Play, Pause, AlertTriangle, CheckCircle, XCircle, Terminal, Network, Lock } from "lucide-react";

export function NetworkScannerDemo() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [targetNetwork, setTargetNetwork] = useState("192.168.1.0/24");
  const [scanResults, setScanResults] = useState<any[]>([]);

  const hosts = [
    { ip: "192.168.1.1", hostname: "router.local", status: "up", ports: [22, 80, 443], os: "Linux", risk: "low" },
    { ip: "192.168.1.2", hostname: "nas.local", status: "up", ports: [21, 22, 80, 443, 5000], os: "Linux", risk: "medium" },
    { ip: "192.168.1.10", hostname: "workstation-01", status: "up", ports: [22, 3389, 5985], os: "Windows", risk: "high" },
    { ip: "192.168.1.15", hostname: "server.local", status: "up", ports: [22, 80, 443, 3306, 5432], os: "Ubuntu", risk: "critical" },
    { ip: "192.168.1.20", hostname: "printer.local", status: "up", ports: [80, 515, 631], os: "Embedded", risk: "medium" }
  ];

  const vulnerabilities = [
    { host: "192.168.1.15", service: "MySQL", port: 3306, severity: "critical", cve: "CVE-2023-1234", description: "Remote code execution vulnerability" },
    { host: "192.168.1.10", service: "RDP", port: 3389, severity: "high", cve: "CVE-2023-5678", description: "Authentication bypass" },
    { host: "192.168.1.2", service: "FTP", port: 21, severity: "medium", cve: "CVE-2023-9012", description: "Directory traversal" },
    { host: "192.168.1.20", service: "HTTP", port: 80, severity: "low", cve: "CVE-2023-3456", description: "Information disclosure" }
  ];

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setScanResults([]);

    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);
          setScanResults(hosts);
          return 100;
        }
        return prev + 2;
      });
    }, 100);
  };

  const stopScan = () => {
    setIsScanning(false);
    setScanProgress(0);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "high": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "low": return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical": return <XCircle className="w-4 h-4 text-red-500" />;
      case "high": return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case "medium": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "low": return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="w-full h-[600px] bg-black text-green-400 font-mono rounded-lg overflow-hidden border">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-black" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">NetSecScan v2.1</h1>
              <p className="text-sm text-gray-300">Network Security Assessment Tool</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="border-green-500 text-green-400">
              <Terminal className="w-3 h-3 mr-1" />
              CLI Mode
            </Badge>
            <Badge variant="outline" className="border-red-500 text-red-400">
              <Lock className="w-3 h-3 mr-1" />
              Authorized Use Only
            </Badge>
          </div>
        </div>
      </div>

      {/* Scan Configuration */}
      <div className="bg-gray-900 border-b border-gray-700 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm text-gray-300 mb-1">Target Network</label>
            <Input
              value={targetNetwork}
              onChange={(e) => setTargetNetwork(e.target.value)}
              className="bg-black border-gray-600 text-green-400 font-mono"
              placeholder="192.168.1.0/24"
            />
          </div>
          
          <div className="flex items-end gap-2">
            {!isScanning ? (
              <Button onClick={startScan} className="bg-green-600 hover:bg-green-700 text-black font-semibold">
                <Play className="w-4 h-4 mr-2" />
                Start Scan
              </Button>
            ) : (
              <Button onClick={stopScan} variant="destructive">
                <Pause className="w-4 h-4 mr-2" />
                Stop
              </Button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        {isScanning && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300">Scanning network...</span>
              <span className="text-sm text-green-400">{scanProgress}%</span>
            </div>
            <Progress value={scanProgress} className="w-full" />
          </div>
        )}
      </div>

      {/* Terminal Output */}
      <div className="p-4 h-[450px] overflow-auto">
        {isScanning && (
          <div className="mb-4 space-y-1">
            <div className="text-green-400">$ netscan --target {targetNetwork} --verbose</div>
            <div className="text-gray-400">Starting NetSecScan v2.1...</div>
            <div className="text-gray-400">Scanning {targetNetwork}...</div>
            <div className="text-green-400">Host discovery in progress...</div>
          </div>
        )}

        <Tabs defaultValue="hosts" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800 border-gray-600">
            <TabsTrigger value="hosts" className="text-gray-300 data-[state=active]:bg-gray-700">
              Hosts ({scanResults.length})
            </TabsTrigger>
            <TabsTrigger value="vulnerabilities" className="text-gray-300 data-[state=active]:bg-gray-700">
              Vulnerabilities ({vulnerabilities.length})
            </TabsTrigger>
            <TabsTrigger value="ports" className="text-gray-300 data-[state=active]:bg-gray-700">
              Open Ports
            </TabsTrigger>
            <TabsTrigger value="report" className="text-gray-300 data-[state=active]:bg-gray-700">
              Report
            </TabsTrigger>
          </TabsList>

          <TabsContent value="hosts" className="mt-4">
            <div className="space-y-3">
              {scanResults.map((host, index) => (
                <Card key={index} className="p-4 bg-gray-900 border-gray-700 hover:border-green-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Network className="w-5 h-5 text-green-400" />
                        <div>
                          <div className="text-green-400 font-semibold">{host.ip}</div>
                          <div className="text-gray-400 text-sm">{host.hostname}</div>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="text-gray-300">OS: {host.os}</div>
                        <div className="text-gray-400">Ports: {host.ports.join(", ")}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={`${getRiskColor(host.risk)} border-0`}>
                        {host.risk.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        {host.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="vulnerabilities" className="mt-4">
            <div className="space-y-3">
              {vulnerabilities.map((vuln, index) => (
                <Card key={index} className="p-4 bg-gray-900 border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getSeverityIcon(vuln.severity)}
                      <div>
                        <div className="text-green-400 font-semibold">{vuln.cve}</div>
                        <div className="text-gray-300">{vuln.description}</div>
                        <div className="text-gray-400 text-sm mt-1">
                          {vuln.host}:{vuln.port} ({vuln.service})
                        </div>
                      </div>
                    </div>

                    <Badge className={`${getRiskColor(vuln.severity)} border-0`}>
                      {vuln.severity.toUpperCase()}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="ports" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {[22, 80, 443, 3389, 5432].map((port) => (
                <Card key={port} className="p-3 bg-gray-900 border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-green-400 font-semibold">Port {port}</div>
                      <div className="text-gray-400 text-sm">
                        {port === 22 ? "SSH" : port === 80 ? "HTTP" : port === 443 ? "HTTPS" : 
                         port === 3389 ? "RDP" : "PostgreSQL"}
                      </div>
                    </div>
                    <Badge variant="outline" className="border-green-500 text-green-400">
                      OPEN
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="report" className="mt-4">
            <Card className="p-4 bg-gray-900 border-gray-700">
              <h3 className="text-green-400 font-semibold mb-4">Security Assessment Summary</h3>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-black rounded border border-gray-700">
                    <div className="text-2xl text-green-400 font-bold">{scanResults.length}</div>
                    <div className="text-gray-400 text-sm">Hosts Discovered</div>
                  </div>
                  <div className="text-center p-3 bg-black rounded border border-gray-700">
                    <div className="text-2xl text-red-400 font-bold">{vulnerabilities.length}</div>
                    <div className="text-gray-400 text-sm">Vulnerabilities</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-green-400 font-semibold mb-2">Risk Distribution</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Critical</span>
                      <span className="text-red-400">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">High</span>
                      <span className="text-orange-400">1</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Medium</span>
                      <span className="text-yellow-400">2</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300">Low</span>
                      <span className="text-green-400">1</span>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-black font-semibold">
                  Export Full Report
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}