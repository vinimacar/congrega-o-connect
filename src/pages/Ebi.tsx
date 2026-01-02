import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Plus, BookOpen, Users, GraduationCap, Calendar } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const classes = [
  { id: 1, name: "Turma A - Infantil (4-6 anos)", students: 25, teacher: "Ana Maria", time: "Domingo 09:00" },
  { id: 2, name: "Turma B - Infantil (7-9 anos)", students: 22, teacher: "José Carlos", time: "Domingo 09:00" },
  { id: 3, name: "Turma C - Intermediário (10-12 anos)", students: 18, teacher: "Maria Helena", time: "Domingo 09:00" },
  { id: 4, name: "Turma D - Jovens (13-17 anos)", students: 32, teacher: "Paulo Santos", time: "Domingo 09:00" },
];

const Ebi = () => {
  return (
    <MainLayout>
      <div className="space-y-6 pt-12 lg:pt-0">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground lg:text-3xl">EBI</h1>
            <p className="mt-1 text-muted-foreground">
              Ensino Bíblico Infantil - Educação e formação espiritual
            </p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Nova Turma
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-4">
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Turmas Ativas</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/10">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">285</p>
              <p className="text-sm text-muted-foreground">Alunos Matriculados</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10">
              <GraduationCap className="h-6 w-6 text-emerald-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">18</p>
              <p className="text-sm text-muted-foreground">Professores</p>
            </div>
          </div>
          <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-purple-500/10">
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-2xl font-bold">4</p>
              <p className="text-sm text-muted-foreground">Aulas/semana</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="turmas" className="space-y-4">
          <TabsList>
            <TabsTrigger value="turmas">Turmas</TabsTrigger>
            <TabsTrigger value="alunos">Alunos</TabsTrigger>
            <TabsTrigger value="professores">Professores</TabsTrigger>
            <TabsTrigger value="materiais">Materiais</TabsTrigger>
            <TabsTrigger value="presenca">Presença</TabsTrigger>
          </TabsList>

          <TabsContent value="turmas" className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {classes.map((cls) => (
                <div key={cls.id} className="rounded-xl bg-card p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <span className="text-xs text-muted-foreground">{cls.time}</span>
                  </div>
                  <h3 className="font-semibold text-card-foreground mb-1">{cls.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">Professor(a): {cls.teacher}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      <Users className="inline h-4 w-4 mr-1" />
                      {cls.students} alunos
                    </span>
                    <Button variant="ghost" size="sm">Ver detalhes</Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="alunos">
            <div className="rounded-xl bg-card p-8 shadow-card text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Lista de Alunos</h3>
              <p className="text-muted-foreground">Gerencie os alunos matriculados no EBI</p>
            </div>
          </TabsContent>

          <TabsContent value="professores">
            <div className="rounded-xl bg-card p-8 shadow-card text-center">
              <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Equipe de Professores</h3>
              <p className="text-muted-foreground">Gerencie os professores do EBI</p>
            </div>
          </TabsContent>

          <TabsContent value="materiais">
            <div className="rounded-xl bg-card p-8 shadow-card text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Materiais Didáticos</h3>
              <p className="text-muted-foreground">Gerencie os materiais de ensino</p>
            </div>
          </TabsContent>

          <TabsContent value="presenca">
            <div className="rounded-xl bg-card p-8 shadow-card text-center">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Controle de Presença</h3>
              <p className="text-muted-foreground">Acompanhe a frequência dos alunos</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Ebi;
