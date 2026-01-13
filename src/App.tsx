import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Musical from "./pages/Musical";
import Darpe from "./pages/Darpe";
import Ebi from "./pages/Ebi";
import ReforcosColetas from "./pages/ReforcosColetas";
import Evangelizacao from "./pages/Evangelizacao";
import Relatorios from "./pages/Relatorios";
import Congregacoes from "./pages/Congregacoes";
import Ministerio from "./pages/Ministerio";
import Listas from "./pages/Listas";
import Agendamentos from "./pages/Agendamentos";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <AuthProvider>
          <Routes>
            {/* Rota pública de login */}
            <Route path="/login" element={<Login />} />
            
            {/* Rota pública - Reforços de Coletas */}
            <Route path="/reforcos-coletas" element={<ReforcosColetas />} />
            
            {/* Rotas protegidas */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Index />
                </ProtectedRoute>
              }
            />
            <Route
              path="/musical"
              element={
                <ProtectedRoute>
                  <Musical />
                </ProtectedRoute>
              }
            />
            <Route
              path="/darpe"
              element={
                <ProtectedRoute>
                  <Darpe />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ebi"
              element={
                <ProtectedRoute>
                  <Ebi />
                </ProtectedRoute>
              }
            />
            <Route
              path="/evangelizacao"
              element={
                <ProtectedRoute>
                  <Evangelizacao />
                </ProtectedRoute>
              }
            />
            <Route
              path="/relatorios"
              element={
                <ProtectedRoute>
                  <Relatorios />
                </ProtectedRoute>
              }
            />
            <Route
              path="/congregacoes"
              element={
                <ProtectedRoute>
                  <Congregacoes />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ministerio"
              element={
                <ProtectedRoute>
                  <Ministerio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/listas"
              element={
                <ProtectedRoute>
                  <Listas />
                </ProtectedRoute>
              }
            />
            <Route
              path="/agendamentos"
              element={
                <ProtectedRoute>
                  <Agendamentos />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
