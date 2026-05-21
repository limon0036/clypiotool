
"use client"

import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { collection, query, orderBy, limit, doc, setDoc, deleteDoc, where, writeBatch } from 'firebase/firestore';
import { 
  BarChart3, 
  ShieldCheck, 
  Loader2, 
  LogOut, 
  UserPlus,
  Megaphone,
  Settings,
  RefreshCw,
  Wrench,
  ChevronRight,
  ArrowLeft,
  Globe,
  Plus,
  Trash2,
  Code,
  Layout,
  Users as UsersIcon,
  CreditCard,
  Target,
  CheckCircle2
} from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { useUser, useDoc, useCollection, useFirestore, useAuth, useMemoFirebase, useFirebaseApp } from '@/firebase';
import { signOut, signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { tools as allTools } from '@/lib/tools-data';
import { firebaseConfig } from "@/firebase/config";
import { getStorage, ref as storageRef, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const AnalyticsView = ({ stats, statsLoading, dbTools, users, payments, adUnits, dailyStats }: any) => {
  const totalRevenue = useMemo(() => {
    return payments?.reduce((acc: number, curr: any) => acc + (curr.amount || 0), 0) || 0;
  }, [payments]);

  const viewMetrics = useMemo(() => {
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const todayViews = dailyStats?.find((d: any) => d.date === todayStr)?.views || 0;
    const yesterdayViews = dailyStats?.find((d: any) => d.date === yesterdayStr)?.views || 0;
    const weeklyViews = dailyStats?.slice(0, 7).reduce((acc: number, curr: any) => acc + (curr.views || 0), 0) || 0;

    return { today: todayViews, yesterday: yesterdayViews, weekly: weeklyViews };
  }, [dailyStats]);

  return (
    <div className="space-y-4 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border shadow-none bg-white/80 overflow-hidden">
          <CardHeader className="py-2 px-3 border-b bg-muted/10"><CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Traffic Insights</CardTitle></CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Today</p>
                <p className="text-lg font-black text-blue-600 leading-none">{viewMetrics.today}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Yesterday</p>
                <p className="text-lg font-black text-slate-600 leading-none">{viewMetrics.yesterday}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">This Week</p>
                <p className="text-lg font-black text-purple-600 leading-none">{viewMetrics.weekly}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Total Users</p>
                <p className="text-lg font-black text-emerald-600 leading-none">{users?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-none bg-white/80 overflow-hidden">
          <CardHeader className="py-2 px-3 border-b bg-muted/10"><CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Tool Inventory</CardTitle></CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Total</p>
                <p className="text-lg font-black text-indigo-600 leading-none">{dbTools?.length || 0}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Active</p>
                <p className="text-lg font-black text-emerald-600 leading-none">{dbTools?.filter((t: any) => t.isActive).length || 0}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Free</p>
                <p className="text-lg font-black text-teal-600 leading-none">{dbTools?.filter((t: any) => t.accessType === 'free').length || 0}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Pro</p>
                <p className="text-lg font-black text-orange-600 leading-none">{dbTools?.filter((t: any) => t.accessType === 'pro').length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-none bg-white/80 overflow-hidden">
          <CardHeader className="py-2 px-3 border-b bg-muted/10"><CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Ad Units</CardTitle></CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-2 gap-y-3 gap-x-2">
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Total Units</p>
                <p className="text-lg font-black text-pink-600 leading-none">{adUnits?.length || 0}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Active</p>
                <p className="text-lg font-black text-green-600 leading-none">{adUnits?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border shadow-none bg-white/80 overflow-hidden">
          <CardHeader className="py-2 px-3 border-b bg-muted/10"><CardTitle className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Revenue</CardTitle></CardHeader>
          <CardContent className="p-3">
            <div className="grid grid-cols-1 gap-y-3">
              <div className="flex flex-col">
                <p className="text-[9px] font-bold text-muted-foreground uppercase">Total Revenue</p>
                <p className="text-2xl font-black text-emerald-600 leading-none">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="border shadow-none bg-white/80">
          <CardHeader className="py-3 px-4"><CardTitle className="text-xs font-bold flex items-center gap-2"><BarChart3 className="w-3.5 h-3.5" /> Top Performing Tools</CardTitle></CardHeader>
          <CardContent className="h-[180px] p-2">
            {statsLoading ? <div className="flex h-full items-center justify-center"><Loader2 className="animate-spin" /></div> : <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats || []}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="id" hide />
                <YAxis fontSize={9} />
                <Tooltip contentStyle={{ fontSize: '10px' }} />
                <Bar dataKey="usageCount" fill="hsl(var(--secondary))" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>}
          </CardContent>
        </Card>
        <Card className="border shadow-none bg-white/80">
          <CardHeader className="py-3 px-4"><CardTitle className="text-xs font-bold">Usage Activity</CardTitle></CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow className="text-[9px] uppercase"><TableHead className="h-8">Tool</TableHead><TableHead className="h-8">Usage</TableHead><TableHead className="h-8 text-right">Last</TableHead></TableRow></TableHeader>
              <TableBody>
                {stats?.map((tool: any) => (
                  <TableRow key={tool.id} className="text-[10px]">
                    <TableCell className="py-1.5 font-medium">{tool.id}</TableCell>
                    <TableCell className="py-1.5"><Badge variant="secondary" className="text-[8px]">{tool.usageCount}</Badge></TableCell>
                    <TableCell className="py-1.5 text-right">{tool.lastUsedAt ? new Date(tool.lastUsedAt).toLocaleDateString() : 'Never'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

const ToolsListView = ({ dbTools, toolsLoading, handleSyncTools, isSyncing }: any) => (
  <div className="space-y-4 animate-in fade-in">
    <Card className="border shadow-none bg-white/80">
      <CardHeader className="flex flex-row items-center justify-between">
        <div><CardTitle className="flex items-center gap-2"><Wrench className="w-5 h-5 text-secondary" /> Tools Catalog</CardTitle></div>
        <Button onClick={handleSyncTools} disabled={isSyncing} variant="outline" className="gap-2">
          {isSyncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}Sync Config
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader><TableRow className="bg-muted/10"><TableHead className="font-bold">Tool Name</TableHead><TableHead className="font-bold">Slug</TableHead><TableHead className="font-bold">Access</TableHead><TableHead className="font-bold">Status</TableHead><TableHead className="font-bold text-right">Actions</TableHead></TableRow></TableHeader>
          <TableBody>
            {toolsLoading ? <TableRow><TableCell colSpan={5} className="h-32 text-center"><Loader2 className="w-8 h-8 animate-spin mx-auto" /></TableCell></TableRow> : dbTools?.map((tool: any) => (
              <TableRow key={tool.id} className="hover:bg-muted/5">
                <TableCell className="font-black py-4">{tool.name}</TableCell>
                <TableCell className="font-mono text-[10px] text-muted-foreground">/{tool.slug}</TableCell>
                <TableCell><Badge variant={tool.accessType === 'pro' ? "default" : "outline"} className={tool.accessType === 'pro' ? "bg-purple-100 text-purple-700 hover:bg-purple-100" : "bg-slate-100 text-slate-700 hover:bg-slate-100 border-none"}>{tool.accessType === 'pro' ? "Pro" : "Free"}</Badge></TableCell>
                <TableCell><Badge variant={tool.isActive ? "secondary" : "outline"} className={tool.isActive ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" : "opacity-50"}>{tool.isActive ? "Live" : "Inactive"}</Badge></TableCell>
                <TableCell className="text-right"><Button variant="ghost" size="sm" asChild><Link href={`/admin?view=edit&id=${tool.id}`} className="gap-1">Edit <ChevronRight className="w-3 h-3" /></Link></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>
);

const EditToolForm = ({ toolId, db }: { toolId: string; db: any }) => {
  const { toast } = useToast();
  const toolRef = useMemoFirebase(() => (db && toolId ? doc(db, 'tools', toolId) : null), [db, toolId]);
  const { data: tool, isLoading } = useDoc(toolRef);
  const [localData, setLocalData] = useState<any>(null);

  const adUnitsQuery = useMemoFirebase(() => (db ? collection(db, 'ad_units') : null), [db]);
  const { data: adUnits } = useCollection(adUnitsQuery);

  useEffect(() => { 
    if (tool) {
      setLocalData({
        ...tool,
        ads: tool.ads || {
          top: { enabled: false, width: 728, height: 90, customSnippet: '', adUnitId: '' },
          bottom: { enabled: false, width: 728, height: 90, customSnippet: '', adUnitId: '' },
          left: { enabled: false, width: 300, height: 600, customSnippet: '', adUnitId: '' },
          right: { enabled: false, width: 300, height: 600, customSnippet: '', adUnitId: '' }
        }
      });
    } 
  }, [tool]);

  if (isLoading) return <div className="flex flex-col items-center justify-center p-20"><Loader2 className="w-10 h-10 animate-spin text-secondary" /></div>;
  if (!tool || !localData) return <div className="p-20 text-center"><Button asChild><Link href="/admin?view=tools">Back to List</Link></Button></div>;

  const handleSave = async () => { 
    try { 
      await setDoc(doc(db, 'tools', toolId), { ...localData, updatedAt: new Date().toISOString() }, { merge: true }); 
      toast({ title: "Success", description: "Tool settings updated." }); 
    } catch (e: any) { 
      toast({ variant: "destructive", title: "Error", description: e.message }); 
    } 
  };

  const updateAdConfig = (placement: string, field: string, value: any) => {
    setLocalData({
      ...localData,
      ads: {
        ...localData.ads,
        [placement]: {
          ...localData.ads[placement],
          [field]: value
        }
      }
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="flex items-center gap-4"><Button variant="ghost" size="sm" asChild><Link href="/admin?view=tools"><ArrowLeft className="w-3 h-3" /> Back</Link></Button><h3 className="font-black text-xl text-primary">Edit Tool: <span className="text-secondary">{localData.name}</span></h3></div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="border shadow-none bg-white/80">
            <CardHeader><CardTitle className="text-xs font-bold uppercase text-muted-foreground">General Configuration</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2"><Label>Display Name</Label><Input value={localData.name || ''} onChange={e => setLocalData({...localData, name: e.target.value})} /></div>
              <div className="space-y-2"><Label>Short Description</Label><Textarea value={localData.description || ''} onChange={e => setLocalData({...localData, description: e.target.value})} /></div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Access Tier</Label><Select value={localData.accessType || 'free'} onValueChange={val => setLocalData({...localData, accessType: val})}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="free">Free Access</SelectItem><SelectItem value="pro">Pro Only</SelectItem></SelectContent></Select></div>
                <div className="flex items-center justify-between p-4 bg-muted/20 rounded-xl border border-dashed mt-6"><Label>Active</Label><Switch checked={localData.isActive || false} onCheckedChange={val => setLocalData({...localData, isActive: val})} /></div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none bg-white/80 overflow-hidden">
            <CardHeader className="bg-muted/5 border-b py-3 px-4">
              <CardTitle className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-2">
                <Layout className="w-3.5 h-3.5" /> Ad Placement Configuration
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="top" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-12">
                  {['top', 'bottom', 'left', 'right'].map(pos => (
                    <TabsTrigger key={pos} value={pos} className="rounded-none border-b-2 border-transparent data-[state=active]:border-secondary data-[state=active]:bg-transparent capitalize px-6 font-bold">
                      {pos}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {['top', 'bottom', 'left', 'right'].map(pos => (
                  <TabsContent key={pos} value={pos} className="p-6 space-y-6 m-0 animate-in fade-in duration-300">
                    <div className="flex items-center justify-between pb-4 border-b">
                      <div>
                        <Label className="text-base font-bold">Enable {pos.toUpperCase()} Placement</Label>
                        <p className="text-xs text-muted-foreground">Display an advertisement in this specific area.</p>
                      </div>
                      <Switch checked={localData.ads?.[pos]?.enabled || false} onCheckedChange={val => updateAdConfig(pos, 'enabled', val)} />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label>Width (pixels)</Label>
                        <Input type="number" value={localData.ads?.[pos]?.width ?? 0} onChange={e => updateAdConfig(pos, 'width', parseInt(e.target.value) || 0)} />
                      </div>
                      <div className="space-y-2">
                        <Label>Height (pixels)</Label>
                        <Input type="number" value={localData.ads?.[pos]?.height ?? 0} onChange={e => updateAdConfig(pos, 'height', parseInt(e.target.value) || 0)} />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Shared Ad Unit</Label>
                      <Select value={localData.ads?.[pos]?.adUnitId || 'none'} onValueChange={val => updateAdConfig(pos, 'adUnitId', val === 'none' ? null : val)}>
                        <SelectTrigger><SelectValue placeholder="Select an ad unit..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">None (Use Custom Snippet)</SelectItem>
                          {adUnits?.map(unit => (
                            <SelectItem key={unit.id} value={unit.id}>{unit.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2"><Code className="w-4 h-4" /> Custom Ad Snippet (Overrides Shared Unit)</Label>
                      <Textarea placeholder="Paste custom script..." className="font-mono text-xs min-h-[120px]" value={localData.ads?.[pos]?.customSnippet || ''} onChange={e => updateAdConfig(pos, 'customSnippet', e.target.value)} />
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border shadow-none bg-white/80 h-fit sticky top-6">
            <CardHeader><CardTitle className="text-xs font-bold uppercase text-muted-foreground">Actions</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Ad Refresh Frequency (s)</Label>
                <Input type="number" value={localData.adFrequency ?? 30} onChange={e => setLocalData({...localData, adFrequency: parseInt(e.target.value) || 0})} />
              </div>
              <Button onClick={handleSave} className="w-full bg-secondary hover:bg-secondary/90 h-12 font-bold shadow-lg shadow-secondary/20">Save All Changes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

const SiteSettingsForm = ({ db }: { db: any }) => {
  const { toast } = useToast();
  const firebaseApp = useFirebaseApp();
  const siteConfigRef = useMemoFirebase(() => doc(db, 'admin_settings', 'site_config'), [db]);
  const { data: config, isLoading } = useDoc(siteConfigRef);
  const [localConfig, setLocalConfig] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);
  const [isUploadingFavicon, setIsUploadingFavicon] = useState(false);
  const [logoProgress, setLogoProgress] = useState<number | null>(null);
  const [faviconProgress, setFaviconProgress] = useState<number | null>(null);

  useEffect(() => { 
    if (config) setLocalConfig(config); 
    else if (!isLoading && !config) setLocalConfig({ siteName: 'clypio Utility Hub', logoUrl: '', faviconUrl: '' });
  }, [config, isLoading]);

  const handleSave = async () => { 
    setIsSaving(true); 
    try { 
      await setDoc(doc(db, 'admin_settings', 'site_config'), { ...localConfig, updatedAt: new Date().toISOString() }, { merge: true }); 
      toast({ title: "Success" }); 
    } catch (e: any) { 
      toast({ variant: "destructive", title: "Error", description: e.message }); 
    } finally { 
      setIsSaving(false); 
    } 
  };

  if (isLoading && !localConfig) return <div className="p-20 flex justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>;

  const displayConfig = localConfig || { siteName: 'clypio Utility Hub', logoUrl: '', faviconUrl: '' };

  const MAX_UPLOAD_BYTES = 2 * 1024 * 1024; // 2MB

  const downscaleImage = async (file: File, maxSize: number) => {
    // If already small enough, keep original
    if (file.size <= 250 * 1024) return file;

    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) return file;

    ctx.drawImage(bitmap, 0, 0, w, h);

    const blob: Blob = await new Promise((resolve) => {
      // WebP is much smaller; most browsers support it well.
      canvas.toBlob((b) => resolve(b || file), "image/webp", 0.85);
    });

    const nameBase = file.name.replace(/\.[^/.]+$/, "");
    return new File([blob], `${nameBase}.webp`, { type: "image/webp" });
  };

  const uploadAsset = async (
    file: File,
    target: "logo" | "favicon",
    onProgress: (pct: number) => void
  ) => {
    const bucket = firebaseConfig.storageBucket;
    const storage = bucket ? getStorage(firebaseApp, `gs://${bucket}`) : getStorage(firebaseApp);
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `branding/${target}-${Date.now()}-${safeName}`;
    const fileRef = storageRef(storage, path);
    const task = uploadBytesResumable(fileRef, file, { contentType: file.type || undefined });

    await new Promise<void>((resolve, reject) => {
      task.on(
        "state_changed",
        (snap) => {
          const pct = snap.totalBytes ? Math.round((snap.bytesTransferred / snap.totalBytes) * 100) : 0;
          onProgress(pct);
        },
        (err) => reject(err),
        () => resolve()
      );
    });

    return await getDownloadURL(task.snapshot.ref);
  };

  return (
    <div className="max-w-4xl space-y-6 animate-in fade-in">
      <Card className="border shadow-none bg-white/80">
        <CardHeader><CardTitle className="flex items-center gap-2"><Globe className="w-5 h-5 text-secondary" /> Branding & Identity</CardTitle></CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2"><Label>Website Name</Label><Input value={displayConfig.siteName || ''} onChange={e => setLocalConfig({...displayConfig, siteName: e.target.value})} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label>Logo URL</Label>
              <Input value={displayConfig.logoUrl || ''} onChange={e => setLocalConfig({...displayConfig, logoUrl: e.target.value})} />
              <div className="flex items-center gap-3 pt-2">
                <Input
                  type="file"
                  accept="image/*"
                  disabled={isUploadingLogo}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      setIsUploadingLogo(true);
                      setLogoProgress(0);
                      if (file.size > MAX_UPLOAD_BYTES) {
                        throw new Error("File too large. Please upload under 2MB.");
                      }
                      const optimized = await downscaleImage(file, 1024);
                      const url = await uploadAsset(optimized, "logo", (pct) => setLogoProgress(pct));
                      setLocalConfig({ ...displayConfig, logoUrl: url });
                      toast({ title: "Uploaded", description: "Logo uploaded successfully." });
                    } catch (err: any) {
                      toast({ variant: "destructive", title: "Upload failed", description: err?.message || "Could not upload logo." });
                    } finally {
                      setIsUploadingLogo(false);
                      setLogoProgress(null);
                      e.target.value = "";
                    }
                  }}
                />
                {isUploadingLogo && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{logoProgress ?? 0}%</span>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Favicon URL</Label>
              <Input value={displayConfig.faviconUrl || ''} onChange={e => setLocalConfig({...displayConfig, faviconUrl: e.target.value})} />
              <div className="flex items-center gap-3 pt-2">
                <Input
                  type="file"
                  accept="image/*,.ico"
                  disabled={isUploadingFavicon}
                  onChange={async (e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    try {
                      setIsUploadingFavicon(true);
                      setFaviconProgress(0);
                      if (file.size > MAX_UPLOAD_BYTES) {
                        throw new Error("File too large. Please upload under 2MB.");
                      }
                      const optimized = await downscaleImage(file, 256);
                      const url = await uploadAsset(optimized, "favicon", (pct) => setFaviconProgress(pct));
                      setLocalConfig({ ...displayConfig, faviconUrl: url });
                      toast({ title: "Uploaded", description: "Favicon uploaded successfully." });
                    } catch (err: any) {
                      toast({ variant: "destructive", title: "Upload failed", description: err?.message || "Could not upload favicon." });
                    } finally {
                      setIsUploadingFavicon(false);
                      setFaviconProgress(null);
                      e.target.value = "";
                    }
                  }}
                />
                {isUploadingFavicon && (
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{faviconProgress ?? 0}%</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="pt-4 border-t"><Button onClick={handleSave} disabled={isSaving} className="gap-2">{isSaving && <Loader2 className="w-4 h-4 animate-spin" />}Save Site Config</Button></div>
        </CardContent>
      </Card>
    </div>
  );
};

const AdsManagementView = ({ db }: { db: any }) => {
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);
  const [newAd, setNewAd] = useState({ name: '', code: '', selectedTools: [] as string[], selectedPlacements: [] as string[] });

  const globalAdRef = useMemoFirebase(() => doc(db, 'admin_settings', 'global_ads'), [db]);
  const { data: globalAds } = useDoc(globalAdRef);
  const [localGlobalAds, setLocalGlobalAds] = useState<any>(null);

  const adUnitsQuery = useMemoFirebase(() => (db ? query(collection(db, 'ad_units'), orderBy('updatedAt', 'desc')) : null), [db]);
  const { data: adUnits, isLoading: adsLoading } = useCollection(adUnitsQuery);

  useEffect(() => { 
    if (globalAds) setLocalGlobalAds(globalAds); 
  }, [globalAds]);

  const handleSaveGlobalAds = async () => { 
    try { 
      await setDoc(globalAdRef, { ...localGlobalAds, updatedAt: new Date().toISOString() }, { merge: true }); 
      toast({ title: "Global Settings Saved" }); 
    } catch (e: any) { 
      toast({ variant: "destructive", title: "Error" }); 
    } 
  };

  const handleAddAdUnit = async () => {
    if (!newAd.name || !newAd.code) return;
    const adId = newAd.name.toLowerCase().replace(/\s+/g, '-');
    try {
      await setDoc(doc(db, 'ad_units', adId), { 
        id: adId,
        name: newAd.name, 
        code: newAd.code, 
        updatedAt: new Date().toISOString() 
      }, { merge: true });

      if (newAd.selectedTools.length > 0 && newAd.selectedPlacements.length > 0) {
        const batch = writeBatch(db);
        newAd.selectedTools.forEach(toolId => {
          if (toolId === 'site-header' || toolId === 'site-footer') return;
          const toolRef = doc(db, 'tools', toolId);
          const localTool = allTools.find(t => t.id === toolId);
          const adsUpdate: any = {};
          newAd.selectedPlacements.forEach(p => {
            adsUpdate[p] = { 
              adUnitId: adId, 
              enabled: true,
              width: p === 'left' || p === 'right' ? 300 : 728,
              height: p === 'left' || p === 'right' ? 600 : 90
            };
          });
          batch.set(toolRef, {
            id: toolId,
            name: localTool?.title || toolId,
            slug: localTool?.slug || toolId,
            updatedAt: new Date().toISOString(),
            ads: adsUpdate
          }, { merge: true });
        });
        await batch.commit();
      }
      setNewAd({ name: '', code: '', selectedTools: [], selectedPlacements: [] });
      setIsAdding(false);
      toast({ title: "Ad Unit Added" });
    } catch (e) {
      toast({ variant: "destructive", title: "Failed to add" });
    }
  };

  const toggleToolSelection = (toolId: string) => {
    setNewAd(prev => ({
      ...prev,
      selectedTools: prev.selectedTools.includes(toolId) ? prev.selectedTools.filter(id => id !== toolId) : [...prev.selectedTools, toolId]
    }));
  };

  const togglePlacementSelection = (placement: string) => {
    setNewAd(prev => ({
      ...prev,
      selectedPlacements: prev.selectedPlacements.includes(placement) ? prev.selectedPlacements.filter(p => p !== placement) : [...prev.selectedPlacements, placement]
    }));
  };

  const handleDeleteAdUnit = async (id: string) => {
    try { await deleteDoc(doc(db, 'ad_units', id)); toast({ title: "Ad Unit Removed" }); } catch (e) { toast({ variant: "destructive", title: "Failed to delete" }); }
  };

  const displayGlobal = localGlobalAds || { headerScript: '', defaultBanner: '' };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border shadow-none bg-white/80">
          <CardHeader><CardTitle className="flex items-center gap-2"><Settings className="w-5 h-5 text-pink-600" /> Global Ad Config</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2"><Label>Site Header Script (Global)</Label><Textarea placeholder="<script>...</script>" className="font-mono text-xs min-h-[100px]" value={displayGlobal.headerScript || ''} onChange={e => setLocalGlobalAds({...displayGlobal, headerScript: e.target.value})} /></div>
            <div className="space-y-2"><Label>Default Banner HTML</Label><Textarea placeholder="<div class='ad-banner'></div>" className="font-mono text-xs min-h-[100px]" value={displayGlobal.defaultBanner || ''} onChange={e => setLocalGlobalAds({...displayGlobal, defaultBanner: e.target.value})} /></div>
            <Button onClick={handleSaveGlobalAds}>Update Global Scripts</Button>
          </CardContent>
        </Card>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border shadow-none bg-white/80">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2"><Megaphone className="w-5 h-5 text-secondary" /> Ad Unit Library (Shared Banners)</CardTitle>
            <Dialog open={isAdding} onOpenChange={setIsAdding}>
              <DialogTrigger asChild><Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> Add Banner</Button></DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col p-0">
                <DialogHeader className="p-6 pb-2">
                  <DialogTitle>Create New Ad Unit</DialogTitle>
                </DialogHeader>
                <ScrollArea className="flex-1 px-6">
                  <div className="space-y-6 py-4">
                    <div className="space-y-4 border-b pb-6">
                      <div className="space-y-2"><Label>Unit Name</Label><Input placeholder="e.g. Adsterra Sidebar Banner" value={newAd.name} onChange={e => setNewAd({...newAd, name: e.target.value})} /></div>
                      <div className="space-y-2"><Label>HTML/JS Code</Label><Textarea placeholder="Paste code here..." className="font-mono text-xs min-h-[120px]" value={newAd.code} onChange={e => setNewAd({...newAd, code: e.target.value})} /></div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-col gap-4">
                        <Label className="text-lg font-bold">Step 1: Select Placements</Label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border rounded-xl p-4 bg-muted/5">
                          {['top', 'bottom', 'left', 'right'].map(p => (
                            <div key={p} className="flex items-center space-x-2 p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-border">
                              <Checkbox id={`placement-${p}`} checked={newAd.selectedPlacements.includes(p)} onCheckedChange={() => togglePlacementSelection(p)} />
                              <label htmlFor={`placement-${p}`} className="text-xs font-bold uppercase cursor-pointer flex-1">{p}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="flex flex-col gap-4 pb-4">
                        <Label className="text-lg font-bold">Step 2: Assign to Tools</Label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 border rounded-xl p-4 bg-muted/5 max-h-64 overflow-y-auto custom-scrollbar">
                          {allTools.map(tool => (
                            <div key={tool.id} className="flex items-center space-x-2 p-2 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-border">
                              <Checkbox id={`tool-${tool.id}`} checked={newAd.selectedTools.includes(tool.id)} onCheckedChange={() => toggleToolSelection(tool.id)} />
                              <label htmlFor={`tool-${tool.id}`} className="text-[11px] font-medium cursor-pointer flex-1 truncate">{tool.title}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter className="p-6 pt-2 border-t bg-muted/5">
                  <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                  <Button onClick={handleAddAdUnit} className="bg-secondary font-bold">Save & Apply to Tools</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent className="p-0">
            <div className="max-h-[400px] overflow-y-auto">
              <Table>
                <TableHeader><TableRow><TableHead>Unit Name</TableHead><TableHead className="text-right">Actions</TableHead></TableRow></TableHeader>
                <TableBody>
                  {adsLoading ? <TableRow><TableCell colSpan={2} className="text-center p-8"><Loader2 className="w-6 h-6 animate-spin mx-auto" /></TableCell></TableRow> : adUnits?.map(unit => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-bold">{unit.name}</TableCell>
                      <TableCell className="text-right flex justify-end gap-2">
                         <Button variant="ghost" size="icon" onClick={() => handleDeleteAdUnit(unit.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const { user, isUserLoading } = useUser();
  const db = useFirestore();
  const auth = useAuth();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const view = searchParams.get('view') || 'analytics';
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const adminDocRef = useMemoFirebase(() => (user && db) ? doc(db, 'roles_admin', user.uid) : null, [db, user]);
  const { data: adminData, isLoading: isAdminLoading } = useDoc(adminDocRef);

  const usersQuery = useMemoFirebase(() => (db && user && adminData ? collection(db, 'users') : null), [db, user, adminData]);
  const { data: users } = useCollection(usersQuery);

  const paymentsQuery = useMemoFirebase(() => (db && user && adminData ? collection(db, 'payments') : null), [db, user, adminData]);
  const { data: payments } = useCollection(paymentsQuery);

  const adUnitsQuery = useMemoFirebase(() => (db && user && adminData ? collection(db, 'ad_units') : null), [db, user, adminData]);
  const { data: adUnits } = useCollection(adUnitsQuery);

  const statsQuery = useMemoFirebase(() => (db && user && adminData ? query(collection(db, "toolStats"), orderBy("usageCount", "desc"), limit(10)) : null), [db, user, adminData]);
  const { data: stats, isLoading: statsLoading } = useCollection(statsQuery);

  const toolsQuery = useMemoFirebase(() => (db && user && adminData) ? collection(db, "tools") : null, [db, user, adminData]);
  const { data: dbTools } = useCollection(toolsQuery);

  const dailyAggregatesQuery = useMemoFirebase(() => (db && user && adminData ? query(collection(db, "daily_aggregates"), orderBy("date", "desc"), limit(14)) : null), [db, user, adminData]);
  const { data: dailyStats } = useCollection(dailyAggregatesQuery);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try { await signInWithEmailAndPassword(auth, email, password); } catch (error: any) { toast({ variant: "destructive", title: "Login Failed" }); } finally { setIsLoggingIn(false); }
  };

  const handleLogout = () => signOut(auth);

  if (isUserLoading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="w-8 h-8 animate-spin text-secondary" /></div>;

  if (!user) return (
    <div className="container mx-auto px-4 py-20 flex justify-center">
      <Card className="w-full max-w-md border-none bg-background shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4"><ShieldCheck className="w-6 h-6 text-secondary" /></div>
          <CardTitle className="text-2xl font-bold">Admin Login</CardTitle>
          <CardDescription>Enter credentials to access hub management.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2"><Label>Email</Label><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
            <div className="space-y-2"><Label>Password</Label><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
            <Button type="submit" disabled={isLoggingIn} className="w-full bg-secondary">{isLoggingIn && <Loader2 className="w-4 h-4 animate-spin mr-2" />}Sign In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-6 space-y-4 max-w-7xl">
      <div className="flex justify-between items-center border-b pb-4">
        <div className="flex items-center gap-4"><SidebarTrigger className="h-9 w-9" /><h2 className="text-xl font-black text-primary tracking-tighter">{view.toUpperCase()}</h2></div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="rounded-full"><Settings className="w-5 h-5 text-muted-foreground" /></Button></DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-2 shadow-xl">
            <DropdownMenuLabel className="p-3 font-normal"><p className="text-sm font-black text-primary truncate">{user.email}</p></DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 p-3 text-destructive rounded-lg"><LogOut className="w-4 h-4" /><span className="font-bold text-xs uppercase">Sign Out</span></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {isAdminLoading ? (
        <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground gap-4">
          <Loader2 className="w-8 h-8 animate-spin" />
          <p className="text-sm font-medium">Loading panel data...</p>
        </div>
      ) : user && !adminData ? (
        <div className="text-center py-20 space-y-6">
           <ShieldCheck className="w-16 h-16 mx-auto text-destructive opacity-20" />
           <h1 className="text-3xl font-bold text-destructive">Access Restricted</h1>
           <p className="text-muted-foreground">Account <strong>{user.email}</strong> is not verified as admin.</p>
           <Button variant="outline" onClick={handleLogout}>Sign Out</Button>
        </div>
      ) : (
        <div className="animate-in fade-in duration-500">
          {view === 'analytics' && <AnalyticsView stats={stats} statsLoading={statsLoading} dbTools={dbTools} users={users} payments={payments} adUnits={adUnits} dailyStats={dailyStats} />}
          {view === 'tools' && <ToolsListView dbTools={dbTools} toolsLoading={statsLoading} handleSyncTools={() => {}} isSyncing={false} />}
          {view === 'edit' && <EditToolForm toolId={searchParams.get('id') || ''} db={db} />}
          {view === 'settings' && <SiteSettingsForm db={db} />}
          {view === 'ads' && <AdsManagementView db={db} />}
        </div>
      )}
    </div>
  );
}
