import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { 
  Search, 
  Wifi, 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Activity,
  Network,
  Router,
  Smartphone,
  Laptop,
  Server,
  Globe,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  RefreshCw, // Changed this line
  Play,
  Pause,
  Square,
  Settings,
  Filter,
  Download,
  Upload,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  Zap,
  Clock,
  MapPin,
  Info,
  AlertCircle,
  Target,
  Scan,
  Terminal,
  Cpu,
  HardDrive,
  MemoryStick,
  Thermometer,
  Battery,
  Signal,
  MonitorSpeaker,
  Printer,
  Camera,
  Gamepad2,
  Tv,
  Phone,
  Tablet,
  Watch,
  Speaker,
  Headphones,
  Mouse,
  Keyboard,
  ExternalLink,
  Copy,
  Archive,
  Trash2,
  Edit,
  MoreVertical,
  ChevronDown,
  ChevronUp,
  Home,
  Building,
  Factory,
  Briefcase
} from "lucide-react";

interface NetworkDevice {
  id: string;
  ip: string;
  mac: string;
  hostname: string;
  vendor: string;
  deviceType: 'router' | 'smartphone' | 'laptop' | 'server' | 'printer' | 'tv' | 'tablet' | 'camera' | 'speaker' | 'unknown';
  os: string;
  status: 'online' | 'offline' | 'unknown';
  lastSeen: string;
  responseTime: number;
  openPorts: number[];
  services: {
    port: number;
    service: string;
    version?: string;
    status: 'open' | 'closed' | 'filtered';
  }[];
  vulnerabilities: {
    id: string;
    severity: 'critical' | 'high' | 'medium' | 'low';
    title: string;
    description: string;
    cve?: string;
  }[];
  networkTraffic: {
    sent: number;
    received: number;
    lastUpdated: string;
  };
  location?: {
    room: string;
    building: string;
  };
  owner?: string;
  notes?: string;
}

interface NetworkScan {
  id: string;
  name: string;
  target: string;
  type: 'ping' | 'port' | 'discovery' | 'vulnerability' | 'full';
  status: 'running' | 'completed' | 'failed' | 'queued';
  progress: number;
  startTime: string;
  endTime?: string;
  devicesFound: number;
  vulnerabilitiesFound: number;
  results: NetworkDevice[];
}

interface NetworkInterface {
  name: string;
  ip: string;
  subnet: string;
  gateway: string;
  dns: string[];
  status: 'up' | 'down';
  speed: string;
  type: 'ethernet' | 'wifi' | 'cellular' | 'vpn';
  bytesReceived: number;
  bytesSent: number;
}

export function LiveNetworkScannerProject() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedScanType, setSelectedScanType] = useState("discovery");
  const [targetNetwork, setTargetNetwork] = useState("192.168.1.0/24");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterType, setFilterType] = useState("");
  const [selectedDevice, setSelectedDevice] = useState<NetworkDevice | null>(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [refreshInterval, setRefreshInterval] = useState(30);
  
  const scanIntervalRef = useRef<NodeJS.Timeout>();
  const refreshIntervalRef = useRef<NodeJS.Timeout>();

  const [networkInterfaces] = useState<NetworkInterface[]>([
    {
      name: "Wi-Fi",
      ip: "192.168.1.100",
      subnet: "255.255.255.0",
      gateway: "192.168.1.1",
      dns: ["8.8.8.8", "8.8.4.4"],
      status: "up",
      speed: "300 Mbps",
      type: "wifi",
      bytesReceived: 1024000000,
      bytesSent: 512000000
    },
    {
      name: "Ethernet",
      ip: "10.0.0.55",
      subnet: "255.255.255.0",
      gateway: "10.0.0.1",
      dns: ["1.1.1.1", "1.0.0.1"],
      status: "up",
      speed: "1 Gbps",
      type: "ethernet",
      bytesReceived: 2048000000,
      bytesSent: 1024000000
    }
  ]);

  const [devices, setDevices] = useState<NetworkDevice[]>([
    {
      id: "device-001",
      ip: "192.168.1.1",
      mac: "00:1B:44:11:3A:B7",
      hostname: "router.local",
      vendor: "Netgear",
      deviceType: "router",
      os: "Linux",
      status: "online",
      lastSeen: "2024-01-25T14:30:00Z",
      responseTime: 2,
      openPorts: [22, 80, 443, 8080],
      services: [
        { port: 22, service: "SSH", version: "OpenSSH 7.4", status: "open" },
        { port: 80, service: "HTTP", version: "nginx 1.14", status: "open" },
        { port: 443, service: "HTTPS", version: "nginx 1.14", status: "open" },
        { port: 8080, service: "HTTP-Admin", status: "open" }
      ],
      vulnerabilities: [
        {
          id: "vuln-001",
          severity: "medium",
          title: "Default Admin Credentials",
          description: "Router may be using default admin credentials",
          cve: "CVE-2019-12345"
        }
      ],
      networkTraffic: {
        sent: 150000000,
        received: 75000000,
        lastUpdated: "2024-01-25T14:30:00Z"
      },
      location: { room: "Network Closet", building: "Main Office" },
      owner: "IT Department"
    },
    {
      id: "device-002",
      ip: "192.168.1.105",
      mac: "AA:BB:CC:DD:EE:FF",
      hostname: "MacBook-Pro.local",
      vendor: "Apple",
      deviceType: "laptop",
      os: "macOS 14.2",
      status: "online",
      lastSeen: "2024-01-25T14:29:45Z",
      responseTime: 1,
      openPorts: [22, 5000],
      services: [
        { port: 22, service: "SSH", status: "open" },
        { port: 5000, service: "Development Server", status: "open" }
      ],
      vulnerabilities: [],
      networkTraffic: {
        sent: 45000000,
        received: 120000000,
        lastUpdated: "2024-01-25T14:29:45Z"
      },
      location: { room: "Conference Room A", building: "Main Office" },
      owner: "John Developer"
    },
    {
      id: "device-003",
      ip: "192.168.1.156",
      mac: "11:22:33:44:55:66",
      hostname: "iPhone-Sarah",
      vendor: "Apple",
      deviceType: "smartphone",
      os: "iOS 17.2",
      status: "online",
      lastSeen: "2024-01-25T14:28:22Z",
      responseTime: 12,
      openPorts: [],
      services: [],
      vulnerabilities: [],
      networkTraffic: {
        sent: 8000000,
        received: 25000000,
        lastUpdated: "2024-01-25T14:28:22Z"
      },
      owner: "Sarah Johnson"
    },
    {
      id: "device-004",
      ip: "192.168.1.200",
      mac: "FF:EE:DD:CC:BB:AA",
      hostname: "file-server",
      vendor: "Dell",
      deviceType: "server",
      os: "Ubuntu Server 22.04",
      status: "online",
      lastSeen: "2024-01-25T14:30:00Z",
      responseTime: 1,
      openPorts: [22, 80, 443, 445, 993, 3306],
      services: [
        { port: 22, service: "SSH", version: "OpenSSH 8.9", status: "open" },
        { port: 80, service: "HTTP", version: "Apache 2.4", status: "open" },
        { port: 443, service: "HTTPS", version: "Apache 2.4", status: "open" },
        { port: 445, service: "SMB", status: "open" },
        { port: 993, service: "IMAPS", status: "open" },
        { port: 3306, service: "MySQL", version: "8.0", status: "open" }
      ],
      vulnerabilities: [
        {
          id: "vuln-002",
          severity: "high",
          title: "Outdated Apache Version",
          description: "Apache HTTP Server version contains known vulnerabilities",
          cve: "CVE-2023-27522"
        },
        {
          id: "vuln-003",
          severity: "critical",
          title: "MySQL Remote Root Access",
          description: "MySQL server allows remote root access",
          cve: "CVE-2023-21980"
        }
      ],
      networkTraffic: {
        sent: 500000000,
        received: 200000000,
        lastUpdated: "2024-01-25T14:30:00Z"
      },
      location: { room: "Server Room", building: "Data Center" },
      owner: "IT Department"
    },
    {
      id: "device-005",
      ip: "192.168.1.78",
      mac: "99:88:77:66:55:44",
      hostname: "office-printer",
      vendor: "HP",
      deviceType: "printer",
      os: "Embedded Linux",
      status: "online",
      lastSeen: "2024-01-25T14:27:15Z",
      responseTime: 8,
      openPorts: [80, 443, 631, 9100],
      services: [
        { port: 80, service: "HTTP", status: "open" },
        { port: 443, service: "HTTPS", status: "open" },
        { port: 631, service: "IPP", status: "open" },
        { port: 9100, service: "JetDirect", status: "open" }
      ],
      vulnerabilities: [
        {
          id: "vuln-004",
          severity: "medium",
          title: "Default SNMP Community String",
          description: "Printer uses default SNMP community string 'public'",
        }
      ],
      networkTraffic: {
        sent: 2000000,
        received: 5000000,
        lastUpdated: "2024-01-25T14:27:15Z"
      },
      location: { room: "Main Office", building: "Main Office" },
      owner: "Office Manager"
    },
    {
      id: "device-006",
      ip: "192.168.1.45",
      mac: "AA:BB:CC:11:22:33",
      hostname: "security-camera-01",
      vendor: "Hikvision",
      deviceType: "camera",
      os: "Embedded Linux",
      status: "online",
      lastSeen: "2024-01-25T14:29:30Z",
      responseTime: 15,
      openPorts: [80, 554, 8000],
      services: [
        { port: 80, service: "HTTP", status: "open" },
        { port: 554, service: "RTSP", status: "open" },
        { port: 8000, service: "HTTP-Alt", status: "open" }
      ],
      vulnerabilities: [
        {
          id: "vuln-005",
          severity: "high",
          title: "Weak Authentication",
          description: "Camera uses weak default password authentication"
        }
      ],
      networkTraffic: {
        sent: 15000000,
        received: 1000000,
        lastUpdated: "2024-01-25T14:29:30Z"
      },
      location: { room: "Front Entrance", building: "Main Office" },
      owner: "Security Team"
    },
    {
      id: "device-007",
      ip: "192.168.1.67",
      mac: "12:34:56:78:90:AB",
      hostname: "smart-tv",
      vendor: "Samsung",
      deviceType: "tv",
      os: "Tizen",
      status: "offline",
      lastSeen: "2024-01-25T12:15:00Z",
      responseTime: 0,
      openPorts: [],
      services: [],
      vulnerabilities: [],
      networkTraffic: {
        sent: 50000000,
        received: 200000000,
        lastUpdated: "2024-01-25T12:15:00Z"
      },
      location: { room: "Conference Room B", building: "Main Office" },
      owner: "Office Manager"
    }
  ]);

  const [scanHistory, setScanHistory] = useState<NetworkScan[]>([
    {
      id: "scan-001",
      name: "Daily Network Discovery",
      target: "192.168.1.0/24",
      type: "discovery",
      status: "completed",
      progress: 100,
      startTime: "2024-01-25T14:00:00Z",
      endTime: "2024-01-25T14:05:30Z",
      devicesFound: 7,
      vulnerabilitiesFound: 5,
      results: devices
    },
    {
      id: "scan-002",
      name: "Security Vulnerability Scan",
      target: "192.168.1.0/24",
      type: "vulnerability",
      status: "completed",
      progress: 100,
      startTime: "2024-01-25T10:00:00Z",
      endTime: "2024-01-25T10:45:12Z",
      devicesFound: 6,
      vulnerabilitiesFound: 5,
      results: devices.filter(d => d.vulnerabilities.length > 0)
    }
  ]);

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.ip.includes(searchTerm) ||
                         device.vendor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.mac.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filterStatus || device.status === filterStatus;
    const matchesType = !filterType || device.deviceType === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getDeviceIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'router': return Router;
      case 'smartphone': return Smartphone;
      case 'laptop': return Laptop;
      case 'server': return Server;
      case 'printer': return Printer;
      case 'camera': return Camera;
      case 'tv': return Tv;
      case 'tablet': return Tablet;
      case 'speaker': return Speaker;
      default: return Network;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'offline': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'unknown': return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const getVulnerabilityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-800 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'high': return 'text-orange-800 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      case 'medium': return 'text-yellow-800 bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300';
      case 'low': return 'text-blue-800 bg-blue-100 dark:bg-blue-900 dark:text-blue-300';
      default: return 'text-gray-800 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const startScan = useCallback(() => {
    setIsScanning(true);
    setScanProgress(0);
    
    const newScan: NetworkScan = {
      id: `scan-${Date.now()}`,
      name: `${selectedScanType.charAt(0).toUpperCase() + selectedScanType.slice(1)} Scan`,
      target: targetNetwork,
      type: selectedScanType as any,
      status: "running",
      progress: 0,
      startTime: new Date().toISOString(),
      devicesFound: 0,
      vulnerabilitiesFound: 0,
      results: []
    };
    
    setScanHistory(prev => [newScan, ...prev]);
    
    // Simulate scan progress
    scanIntervalRef.current = setInterval(() => {
      setScanProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          setIsScanning(false);
          clearInterval(scanIntervalRef.current);
          
          // Update scan history with completed scan
          setScanHistory(prevHistory => 
            prevHistory.map(scan => 
              scan.id === newScan.id 
                ? { 
                    ...scan, 
                    status: "completed" as const, 
                    progress: 100, 
                    endTime: new Date().toISOString(),
                    devicesFound: devices.length,
                    vulnerabilitiesFound: devices.reduce((sum, d) => sum + d.vulnerabilities.length, 0),
                    results: devices
                  }
                : scan
            )
          );
          
          return 100;
        }
        return newProgress;
      });
    }, 500);
  }, [selectedScanType, targetNetwork, devices]);

  const stopScan = () => {
    setIsScanning(false);
    clearInterval(scanIntervalRef.current);
    setScanProgress(0);
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const totalVulnerabilities = devices.reduce((sum, device) => sum + device.vulnerabilities.length, 0);
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const criticalVulns = devices.reduce((sum, device) => 
    sum + device.vulnerabilities.filter(v => v.severity === 'critical').length, 0);

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      refreshIntervalRef.current = setInterval(() => {
        // Simulate refreshing device data
        setDevices(prevDevices => 
          prevDevices.map(device => ({
            ...device,
            lastSeen: new Date().toISOString(),
            responseTime: Math.random() * 20 + 1,
            networkTraffic: {
              ...device.networkTraffic,
              sent: device.networkTraffic.sent + Math.random() * 1000000,
              received: device.networkTraffic.received + Math.random() * 1000000,
              lastUpdated: new Date().toISOString()
            }
          }))
        );
      }, refreshInterval * 1000);
    } else {
      clearInterval(refreshIntervalRef.current);
    }

    return () => clearInterval(refreshIntervalRef.current);
  }, [autoRefresh, refreshInterval]);

  useEffect(() => {
    return () => {
      clearInterval(scanIntervalRef.current);
      clearInterval(refreshIntervalRef.current);
    };
  }, []);

  return (
    <div className="w-full h-[800px] bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-blue-900/10 dark:to-cyan-900/10 rounded-lg overflow-hidden border shadow-2xl">
      <div className="h-full flex flex-col">
        
        {/* Header */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg flex items-center justify-center shadow-lg">
                <Network className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  NetScan Pro
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Advanced Network Security Scanner
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="hidden md:flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-gray-600 dark:text-gray-400">Live Monitoring</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">Secure</span>
                </div>
              </div>
              
              <Button
                size="sm"
                variant="outline"
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={autoRefresh ? 'bg-green-50 border-green-200 text-green-700' : ''}
              >
                <Activity className={`w-4 h-4 ${autoRefresh ? 'animate-pulse' : ''}`} />
                <span className="ml-2">{autoRefresh ? 'Live' : 'Manual'}</span>
              </Button>
              
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                NS
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start bg-transparent border-b-0 rounded-none h-12">
              <TabsTrigger 
                value="dashboard" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <BarChart3 className="w-4 h-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="devices" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <Network className="w-4 h-4" />
                Devices
              </TabsTrigger>
              <TabsTrigger 
                value="scanner" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <Scan className="w-4 h-4" />
                Scanner
              </TabsTrigger>
              <TabsTrigger 
                value="security" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <Shield className="w-4 h-4" />
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="monitoring" 
                className="flex items-center gap-2 rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:bg-blue-50 dark:data-[state=active]:bg-blue-900/20"
              >
                <Activity className="w-4 h-4" />
                Monitoring
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto">
          <Tabs value={activeTab} className="h-full">
            
            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="h-full mt-0 p-6">
              
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Total Devices</p>
                      <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{devices.length}</p>
                    </div>
                    <Network className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                    <span className="text-green-600">+{onlineDevices}</span> online
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-700 dark:text-green-300">Online Devices</p>
                      <p className="text-3xl font-bold text-green-900 dark:text-green-100">{onlineDevices}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-2">
                    {Math.round((onlineDevices / devices.length) * 100)}% availability
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900/20 dark:to-red-800/20 border-red-200 dark:border-red-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-700 dark:text-red-300">Vulnerabilities</p>
                      <p className="text-3xl font-bold text-red-900 dark:text-red-100">{totalVulnerabilities}</p>
                    </div>
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    <span className="text-red-700 dark:text-red-300">{criticalVulns} critical</span>
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-purple-700 dark:text-purple-300">Avg Response</p>
                      <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">
                        {Math.round(devices.reduce((sum, d) => sum + d.responseTime, 0) / devices.length)}ms
                      </p>
                    </div>
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                  <p className="text-xs text-purple-600 dark:text-purple-400 mt-2">
                    Network latency
                  </p>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Network Interfaces */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Wifi className="w-5 h-5" />
                    Network Interfaces
                  </h3>
                  <div className="space-y-4">
                    {networkInterfaces.map((iface, index) => (
                      <div key={index} className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className={`w-3 h-3 rounded-full ${iface.status === 'up' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="font-medium text-gray-900 dark:text-white">{iface.name}</span>
                            <Badge variant="outline">{iface.type}</Badge>
                          </div>
                          <span className="text-sm text-gray-600 dark:text-gray-400">{iface.speed}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div>
                            <span className="block">IP: {iface.ip}</span>
                            <span className="block">Gateway: {iface.gateway}</span>
                          </div>
                          <div>
                            <span className="block">Sent: {formatBytes(iface.bytesSent)}</span>
                            <span className="block">Received: {formatBytes(iface.bytesReceived)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recent Scan Activity */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Recent Scans
                  </h3>
                  <div className="space-y-3">
                    {scanHistory.slice(0, 5).map((scan) => (
                      <div key={scan.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className={`w-3 h-3 rounded-full ${
                          scan.status === 'completed' ? 'bg-green-500' :
                          scan.status === 'running' ? 'bg-blue-500 animate-pulse' :
                          scan.status === 'failed' ? 'bg-red-500' :
                          'bg-yellow-500'
                        }`}></div>
                        <div className="flex-1">
                          <p className="font-medium text-sm text-gray-900 dark:text-white">{scan.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            {new Date(scan.startTime).toLocaleString()} • {scan.target}
                          </p>
                        </div>
                        <div className="text-right text-xs text-gray-600 dark:text-gray-400">
                          <div>{scan.devicesFound} devices</div>
                          <div>{scan.vulnerabilitiesFound} vulns</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Device Type Distribution */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Device Types
                  </h3>
                  <div className="space-y-3">
                    {Object.entries(
                      devices.reduce((acc, device) => {
                        acc[device.deviceType] = (acc[device.deviceType] || 0) + 1;
                        return acc;
                      }, {} as Record<string, number>)
                    ).map(([type, count]) => {
                      const Icon = getDeviceIcon(type);
                      const percentage = Math.round((count / devices.length) * 100);
                      
                      return (
                        <div key={type}>
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">{type}</span>
                            </div>
                            <span className="text-sm text-gray-600 dark:text-gray-400">{count} ({percentage}%)</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Security Overview */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Security Overview
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                        <span className="font-medium text-red-800 dark:text-red-300">Critical</span>
                      </div>
                      <span className="text-lg font-bold text-red-600">{criticalVulns}</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        <span className="font-medium text-orange-800 dark:text-orange-300">High</span>
                      </div>
                      <span className="text-lg font-bold text-orange-600">
                        {devices.reduce((sum, d) => sum + d.vulnerabilities.filter(v => v.severity === 'high').length, 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Info className="w-5 h-5 text-yellow-600" />
                        <span className="font-medium text-yellow-800 dark:text-yellow-300">Medium</span>
                      </div>
                      <span className="text-lg font-bold text-yellow-600">
                        {devices.reduce((sum, d) => sum + d.vulnerabilities.filter(v => v.severity === 'medium').length, 0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-blue-600" />
                        <span className="font-medium text-blue-800 dark:text-blue-300">Low</span>
                      </div>
                      <span className="text-lg font-bold text-blue-600">
                        {devices.reduce((sum, d) => sum + d.vulnerabilities.filter(v => v.severity === 'low').length, 0)}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Devices Tab */}
            <TabsContent value="devices" className="h-full mt-0 p-6">
              
              {/* Search and Filters */}
              <div className="mb-6 space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search devices by IP, hostname, MAC, or vendor..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Status</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="offline">Offline</SelectItem>
                      <SelectItem value="unknown">Unknown</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Types</SelectItem>
                      <SelectItem value="router">Router</SelectItem>
                      <SelectItem value="smartphone">Smartphone</SelectItem>
                      <SelectItem value="laptop">Laptop</SelectItem>
                      <SelectItem value="server">Server</SelectItem>
                      <SelectItem value="printer">Printer</SelectItem>
                      <SelectItem value="camera">Camera</SelectItem>
                      <SelectItem value="tv">TV</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button onClick={() => setDevices([...devices])}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <Badge variant="outline">
                    {filteredDevices.length} devices found
                  </Badge>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>Auto-refresh:</span>
                    <Button
                      size="sm"
                      variant={autoRefresh ? "default" : "outline"}
                      onClick={() => setAutoRefresh(!autoRefresh)}
                    >
                      {autoRefresh ? 'On' : 'Off'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* Devices Table */}
              <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Device</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">IP Address</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Status</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Type</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Vendor</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Response</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Security</th>
                        <th className="text-left p-4 font-medium text-gray-900 dark:text-white">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDevices.map((device) => {
                        const Icon = getDeviceIcon(device.deviceType);
                        const highestSeverity = device.vulnerabilities.length > 0 
                          ? device.vulnerabilities.reduce((prev, curr) => {
                              const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
                              return severityOrder[curr.severity] > severityOrder[prev.severity] ? curr : prev;
                            }).severity
                          : null;
                        
                        return (
                          <tr key={device.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                                <div>
                                  <p className="font-medium text-gray-900 dark:text-white">{device.hostname}</p>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{device.mac}</p>
                                </div>
                              </div>
                            </td>
                            <td className="p-4">
                              <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">
                                {device.ip}
                              </code>
                            </td>
                            <td className="p-4">
                              <Badge className={getStatusColor(device.status)}>
                                {device.status}
                              </Badge>
                            </td>
                            <td className="p-4 text-gray-900 dark:text-white capitalize">{device.deviceType}</td>
                            <td className="p-4 text-gray-900 dark:text-white">{device.vendor}</td>
                            <td className="p-4">
                              <span className={`font-medium ${
                                device.responseTime < 10 ? 'text-green-600' :
                                device.responseTime < 50 ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>
                                {device.responseTime}ms
                              </span>
                            </td>
                            <td className="p-4">
                              {device.vulnerabilities.length > 0 ? (
                                <div className="flex items-center gap-2">
                                  <Badge className={getVulnerabilityColor(highestSeverity!)}>
                                    {device.vulnerabilities.length} {highestSeverity}
                                  </Badge>
                                </div>
                              ) : (
                                <Badge className="text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-300">
                                  Secure
                                </Badge>
                              )}
                            </td>
                            <td className="p-4">
                              <div className="flex items-center gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setSelectedDevice(device)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Terminal className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </Card>

              {filteredDevices.length === 0 && (
                <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                  <div className="text-center">
                    <Network className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No devices found</p>
                    <p className="text-sm">Try adjusting your search or filters</p>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Scanner Tab */}
            <TabsContent value="scanner" className="h-full mt-0 p-6">
              <div className="max-w-4xl mx-auto space-y-6">
                
                {/* Scan Configuration */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Network Scan Configuration
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Target Network
                      </label>
                      <Input
                        value={targetNetwork}
                        onChange={(e) => setTargetNetwork(e.target.value)}
                        placeholder="e.g., 192.168.1.0/24"
                        disabled={isScanning}
                      />
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        CIDR notation (e.g., 192.168.1.0/24) or IP range
                      </p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Scan Type
                      </label>
                      <Select value={selectedScanType} onValueChange={setSelectedScanType} disabled={isScanning}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ping">Ping Scan (Fast)</SelectItem>
                          <SelectItem value="discovery">Network Discovery</SelectItem>
                          <SelectItem value="port">Port Scan</SelectItem>
                          <SelectItem value="vulnerability">Vulnerability Scan</SelectItem>
                          <SelectItem value="full">Full Scan (Slow)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-3">
                    {!isScanning ? (
                      <Button onClick={startScan} className="bg-blue-600 hover:bg-blue-700">
                        <Play className="w-4 h-4 mr-2" />
                        Start Scan
                      </Button>
                    ) : (
                      <Button onClick={stopScan} variant="outline">
                        <Square className="w-4 h-4 mr-2" />
                        Stop Scan
                      </Button>
                    )}
                    
                    <Button variant="outline" disabled={isScanning}>
                      <Settings className="w-4 h-4 mr-2" />
                      Advanced Options
                    </Button>
                  </div>
                </Card>

                {/* Scan Progress */}
                {isScanning && (
                  <Card className="p-6 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">
                        Scanning Network...
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-700 dark:text-blue-300">Progress</span>
                        <span className="text-blue-600 font-medium">{Math.round(scanProgress)}%</span>
                      </div>
                      <Progress value={scanProgress} className="bg-blue-200 dark:bg-blue-800" />
                      <p className="text-sm text-blue-600 dark:text-blue-400">
                        Scanning {targetNetwork} for {selectedScanType} information...
                      </p>
                    </div>
                  </Card>
                )}

                {/* Scan History */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      Scan History
                    </h3>
                    <Button size="sm" variant="outline">
                      <Archive className="w-4 h-4 mr-2" />
                      Export Results
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {scanHistory.map((scan) => (
                      <div key={scan.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-3 h-3 rounded-full ${
                                scan.status === 'completed' ? 'bg-green-500' :
                                scan.status === 'running' ? 'bg-blue-500 animate-pulse' :
                                scan.status === 'failed' ? 'bg-red-500' :
                                'bg-yellow-500'
                              }`}></div>
                              <h4 className="font-medium text-gray-900 dark:text-white">{scan.name}</h4>
                              <Badge variant="outline" className="capitalize">{scan.type}</Badge>
                              <Badge className={
                                scan.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                                scan.status === 'running' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' :
                                scan.status === 'failed' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' :
                                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                              }>
                                {scan.status}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 dark:text-gray-400">
                              <div>
                                <span className="block">Target:</span>
                                <code className="text-xs bg-gray-100 dark:bg-gray-800 px-1 rounded">{scan.target}</code>
                              </div>
                              <div>
                                <span className="block">Started:</span>
                                <span>{new Date(scan.startTime).toLocaleString()}</span>
                              </div>
                              <div>
                                <span className="block">Devices Found:</span>
                                <span className="font-medium text-blue-600">{scan.devicesFound}</span>
                              </div>
                              <div>
                                <span className="block">Vulnerabilities:</span>
                                <span className="font-medium text-red-600">{scan.vulnerabilitiesFound}</span>
                              </div>
                            </div>
                            
                            {scan.status === 'running' && (
                              <div className="mt-3">
                                <Progress value={scan.progress} className="h-2" />
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <MoreVertical className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="h-full mt-0 p-6">
              <div className="space-y-6">
                
                {/* Security Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="p-6 text-center bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
                    <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-red-700 dark:text-red-300">{criticalVulns}</div>
                    <div className="text-sm text-red-600 dark:text-red-400">Critical Vulnerabilities</div>
                  </Card>
                  
                  <Card className="p-6 text-center bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800">
                    <AlertCircle className="w-8 h-8 text-orange-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                      {devices.reduce((sum, d) => sum + d.vulnerabilities.filter(v => v.severity === 'high').length, 0)}
                    </div>
                    <div className="text-sm text-orange-600 dark:text-orange-400">High Risk Issues</div>
                  </Card>
                  
                  <Card className="p-6 text-center bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
                    <Info className="w-8 h-8 text-yellow-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
                      {devices.reduce((sum, d) => sum + d.vulnerabilities.filter(v => v.severity === 'medium').length, 0)}
                    </div>
                    <div className="text-sm text-yellow-600 dark:text-yellow-400">Medium Risk Issues</div>
                  </Card>
                  
                  <Card className="p-6 text-center bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      {devices.filter(d => d.vulnerabilities.length === 0).length}
                    </div>
                    <div className="text-sm text-green-600 dark:text-green-400">Secure Devices</div>
                  </Card>
                </div>

                {/* Vulnerability Details */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Security Vulnerabilities
                  </h3>
                  
                  <div className="space-y-4">
                    {devices
                      .filter(device => device.vulnerabilities.length > 0)
                      .map(device => (
                        <div key={device.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <div className="flex items-center gap-3 mb-3">
                            {(() => {
                              const Icon = getDeviceIcon(device.deviceType);
                              return <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />;
                            })()}
                            <h4 className="font-medium text-gray-900 dark:text-white">{device.hostname}</h4>
                            <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm">{device.ip}</code>
                            <Badge className={getStatusColor(device.status)}>{device.status}</Badge>
                          </div>
                          
                          <div className="space-y-2">
                            {device.vulnerabilities.map(vuln => (
                              <div key={vuln.id} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className={`w-3 h-3 rounded-full mt-1 ${
                                  vuln.severity === 'critical' ? 'bg-red-500' :
                                  vuln.severity === 'high' ? 'bg-orange-500' :
                                  vuln.severity === 'medium' ? 'bg-yellow-500' :
                                  'bg-blue-500'
                                }`}></div>
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h5 className="font-medium text-gray-900 dark:text-white">{vuln.title}</h5>
                                    <Badge className={getVulnerabilityColor(vuln.severity)}>
                                      {vuln.severity}
                                    </Badge>
                                    {vuln.cve && (
                                      <Badge variant="outline" className="text-xs">
                                        {vuln.cve}
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-sm text-gray-600 dark:text-gray-400">{vuln.description}</p>
                                </div>
                                <Button size="sm" variant="outline">
                                  <ExternalLink className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            {/* Monitoring Tab */}
            <TabsContent value="monitoring" className="h-full mt-0 p-6">
              <div className="text-center py-20">
                <Activity className="w-24 h-24 mx-auto mb-6 text-gray-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Real-time Network Monitoring
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
                  Advanced network monitoring with bandwidth analysis, traffic visualization, and performance metrics coming soon!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <TrendingUp className="w-8 h-8 text-green-500 mb-3" />
                    <h3 className="font-semibold mb-2">Bandwidth Monitoring</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Real-time bandwidth usage and traffic analysis
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <BarChart3 className="w-8 h-8 text-blue-500 mb-3" />
                    <h3 className="font-semibold mb-2">Performance Metrics</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Network latency and performance analytics
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-shadow">
                    <AlertTriangle className="w-8 h-8 text-orange-500 mb-3" />
                    <h3 className="font-semibold mb-2">Alert System</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Automated alerts for network anomalies
                    </p>
                  </Card>
                </div>
              </div>
            </TabsContent>

          </Tabs>
        </div>
      </div>
    </div>
  );
}