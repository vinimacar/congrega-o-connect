import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Musical from "./pages/Musical";
import DarpeEbi from "./pages/DarpeEbi";
import Relatorios from "./pages/Relatorios";
import Congregacoes from "./pages/Congregacoes";
import Ministerio from "./pages/Ministerio";
import Listas from "./pages/Listas";
import Agendamentos from "./pages/Agendamentos";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/musical" element={<Musical />} />
          <Route path="/darpe-ebi" element={<DarpeEbi />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/congregacoes" element={<Congregacoes />} />
          <Route path="/ministerio" element={<Ministerio />} />
          <Route path="/listas" element={<Listas />} />
          <Route path="/agendamentos" element={<Agendamentos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
