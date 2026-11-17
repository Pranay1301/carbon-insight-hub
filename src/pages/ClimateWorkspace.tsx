import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, ArrowRight, Bot, CheckCircle2, ChevronRight, FileCheck2, FileText, Leaf, ShieldCheck, SlidersHorizontal, Sparkles, Upload, UsersRound, type LucideIcon } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { DEMO_FACTOR_REGISTRY, FACTOR_STATUS_LABEL } from "@/lib/carbon/factorRegistry";

const activities = [
  { activity: "Purchased electricity", scope: "Scope 2", evidence: "Electricity bill — Apr 2026.pdf", status: "Reviewed", owner: "Facilities" },
  { activity: "Fleet diesel", scope: "Scope 1", evidence: "Fuel invoices — Q2.pdf", status: "Needs review", owner: "Operations" },
  { activity: "Packaging supplier", scope: "Scope 3 • Cat. 1", evidence: "Supplier declaration.xlsx", status: "Requested", owner: "Procurement" },
];

const initiatives = [
  { name: "Rooftop solar", reduction: 180, investment: 30, status: "Candidate" },
  { name: "LED replacement", reduction: 35, investment: 5, status: "Ready" },
  { name: "EV fleet transition", reduction: 90, investment: 25, status: "Candidate" },
];

const overviewMetrics: Array<{ label: string; value: string; detail: string; Icon: LucideIcon; color: string }> = [
  { label: "Inventory coverage", value: "72%", detail: "9 of 12 material sources", Icon: FileCheck2, color: "text-emerald-700" },
  { label: "Evidence readiness", value: "67%", detail: "6 records await review", Icon: ShieldCheck, color: "text-amber-600" },
  { label: "Scope 3 suppliers", value: "4 / 11", detail: "3 submissions due this month", Icon: UsersRound, color: "text-sky-700" },
  { label: "Disclosure mapping", value: "BRSR + IFRS", detail: "18 mapped data points", Icon: FileText, color: "text-violet-700" },
];

const ClimateWorkspace = () => {
  const [selected, setSelected] = useState<string[]>(["Rooftop solar", "LED replacement"]);
  const [query, setQuery] = useState("");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const scenario = useMemo(() => initiatives.filter((item) => selected.includes(item.name)), [selected]);
  const totalReduction = scenario.reduce((sum, item) => sum + item.reduction, 0);
  const totalInvestment = scenario.reduce((sum, item) => sum + item.investment, 0);
  const toggle = (name: string) => setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  const filteredFactors = DEMO_FACTOR_REGISTRY.filter((factor) => `${factor.activity} ${factor.geography} ${factor.id}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <main className="pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-7xl space-y-8">
          <section className="rounded-3xl bg-gradient-to-br from-emerald-950 via-emerald-800 to-teal-700 p-7 md:p-10 text-white shadow-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <Badge className="mb-4 bg-white/15 text-emerald-50 hover:bg-white/15">DEMO WORKSPACE · FY 2026–27</Badge>
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl">Carbon accounting that shows its work.</h1>
                <p className="mt-4 text-lg text-emerald-50/85">GreenLedger links activity data, evidence, factor versions, approvals, and practical reduction scenarios in one India-first climate workspace.</p>
              </div>
              <Button asChild size="lg" className="bg-white text-emerald-950 hover:bg-emerald-50"><Link to="/carbon-emissions/profile">Add activity data <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {overviewMetrics.map(({ label, value, detail, Icon, color }) => (
              <Card key={label} className="border-slate-200 shadow-sm"><CardContent className="p-5"><div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><Icon className={`h-5 w-5 ${color}`} /></div><p className="mt-3 text-2xl font-bold">{value}</p><p className="mt-1 text-xs text-slate-500">{detail}</p></CardContent></Card>
            ))}
          </section>

          <section className="grid gap-6 xl:grid-cols-5">
            <Card className="min-w-0 xl:col-span-3 border-slate-200 shadow-sm">
              <CardHeader><div className="flex items-center justify-between"><div><CardTitle>Evidence-led activity records</CardTitle><CardDescription>Every number should retain its source document, owner, and review state.</CardDescription></div><Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" />Upload evidence</Button></div></CardHeader>
              <CardContent className="space-y-3">{activities.map((record) => <div key={record.activity} className="flex flex-col gap-3 rounded-xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between"><div><div className="flex items-center gap-2"><p className="font-semibold">{record.activity}</p><Badge variant="secondary">{record.scope}</Badge></div><p className="mt-1 text-sm text-slate-500">{record.evidence} · Owner: {record.owner}</p></div><Badge className={record.status === "Reviewed" ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" : record.status === "Needs review" ? "bg-amber-100 text-amber-800 hover:bg-amber-100" : "bg-sky-100 text-sky-800 hover:bg-sky-100"}>{record.status}</Badge></div>)}</CardContent>
            </Card>
            <Card className="min-w-0 xl:col-span-2 border-slate-200 shadow-sm"><CardHeader><CardTitle>Compliance readiness</CardTitle><CardDescription>One data layer, mapped to reporting needs.</CardDescription></CardHeader><CardContent className="space-y-5">{[["BRSR Core", 64], ["IFRS S2 climate disclosures", 46], ["CCTS facility readiness", 38]].map(([label, value]) => <div key={label as string}><div className="mb-2 flex justify-between text-sm"><span className="font-medium">{label}</span><span className="text-slate-500">{value}%</span></div><Progress value={value as number} /></div>)}<p className="rounded-lg bg-slate-100 p-3 text-xs text-slate-600"><AlertTriangle className="mr-1 inline h-3.5 w-3.5 text-amber-600" />Framework mapping is a readiness aid, not legal or assurance advice.</p></CardContent></Card>
          </section>

          <section className="grid gap-6 xl:grid-cols-5">
            <Card className="min-w-0 xl:col-span-3 border-slate-200 shadow-sm"><CardHeader><div className="flex items-center justify-between"><div><CardTitle>Decarbonisation scenario</CardTitle><CardDescription>Select initiatives to model a draft abatement plan. These are inputs—not assumed results.</CardDescription></div><SlidersHorizontal className="h-5 w-5 text-emerald-700" /></div></CardHeader><CardContent><div className="space-y-3">{initiatives.map((initiative) => <button key={initiative.name} onClick={() => toggle(initiative.name)} className={`flex w-full items-center justify-between rounded-xl border p-4 text-left transition ${selected.includes(initiative.name) ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-emerald-300"}`}><div><p className="font-semibold">{initiative.name}</p><p className="text-sm text-slate-500">₹{initiative.investment} lakh investment · {initiative.reduction} tCO2e expected annual reduction</p></div><div className="flex items-center gap-3"><Badge variant="secondary">{initiative.status}</Badge><CheckCircle2 className={`h-5 w-5 ${selected.includes(initiative.name) ? "text-emerald-600" : "text-slate-300"}`} /></div></button>)}</div><div className="mt-5 grid grid-cols-2 gap-4 rounded-xl bg-emerald-950 p-5 text-white"><div><p className="text-sm text-emerald-100">Scenario reduction</p><p className="text-2xl font-bold">{totalReduction} tCO2e / year</p></div><div><p className="text-sm text-emerald-100">Draft investment</p><p className="text-2xl font-bold">₹{totalInvestment} lakh</p></div></div></CardContent></Card>
            <Card className="min-w-0 xl:col-span-2 border-slate-200 shadow-sm"><CardHeader><CardTitle>AI review queue</CardTitle><CardDescription>AI may extract, classify, and explain—people approve material data.</CardDescription></CardHeader><CardContent><div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-5"><Bot className="h-7 w-7 text-emerald-700" /><p className="mt-3 font-semibold">Document intelligence</p><p className="mt-1 text-sm text-slate-600">Upload an invoice, extract proposed activity data, attach it to a record, then send it for human review.</p><Button className="mt-4 w-full" onClick={() => setAssistantOpen(!assistantOpen)}><Sparkles className="mr-2 h-4 w-4" />{assistantOpen ? "Hide review guidance" : "Open review guidance"}</Button>{assistantOpen && <p className="mt-4 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">Suggested control: keep the original document, extracted fields, reviewer decision, factor ID, and calculation version together in the audit trail.</p>}</div></CardContent></Card>
          </section>

          <section><div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><h2 className="text-2xl font-bold">Factor governance</h2><p className="text-slate-600">A versioned registry replaces opaque hardcoded values.</p></div><Input className="max-w-sm bg-white" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find an activity or factor ID" /></div><div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"><div className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)_minmax(0,.7fr)] gap-3 border-b bg-slate-50 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,.9fr)_minmax(0,.8fr)_minmax(0,1fr)] sm:gap-4 sm:px-5"><span>Factor</span><span>Value</span><span>Status</span><span className="hidden sm:block">Source / period</span></div>{filteredFactors.map((factor) => <div key={factor.id} className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)_minmax(0,.7fr)] gap-3 px-4 py-4 text-sm sm:grid-cols-[minmax(0,1.3fr)_minmax(0,.9fr)_minmax(0,.8fr)_minmax(0,1fr)] sm:gap-4 sm:px-5"><div><p className="font-semibold">{factor.activity}</p><p className="text-xs text-slate-500">{factor.id} · {factor.geography}</p></div><div><p className="font-medium">{factor.value}</p><p className="text-xs text-slate-500">{factor.unit}</p></div><div><Badge variant="outline">{FACTOR_STATUS_LABEL[factor.status]}</Badge></div><div className="hidden text-xs text-slate-500 sm:block">{factor.source}<br />{factor.reportingPeriod}</div></div>)}{filteredFactors.length === 0 && <p className="p-6 text-sm text-slate-500">No factors match this search.</p>}</div></section>

          <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center"><Leaf className="mx-auto h-7 w-7 text-emerald-700" /><h2 className="mt-3 text-xl font-bold">Built for credible climate decisions</h2><p className="mx-auto mt-2 max-w-2xl text-sm text-slate-600">Start with the calculators, then preserve the evidence, factor version, methodology, and review decision behind every reported result.</p><Button asChild variant="link" className="mt-1"><Link to="/resources">Read methodology and standards <ChevronRight className="ml-1 h-4 w-4" /></Link></Button></section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClimateWorkspace;
