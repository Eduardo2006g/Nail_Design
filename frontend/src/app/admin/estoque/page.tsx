import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Package, Edit, AlertTriangle } from "lucide-react";

export default function EstoqueAdminPage() {
  const inventory = [
    { id: 1, name: "Gel Construtor Nude", category: "Geles", quantity: 3, unit: "potes", status: "ok" },
    { id: 2, name: "Esmalte Gel Vermelho", category: "Esmaltes", quantity: 7, unit: "und", status: "ok" },
    { id: 3, name: "Prep Antibactericida", category: "Preparadores", quantity: 1, unit: "und", status: "low" },
    { id: 4, name: "Top Coat Brilho", category: "Finalizadores", quantity: 2, unit: "und", status: "low" },
    { id: 5, name: "Algodão Prensado", category: "Descartáveis", quantity: 0, unit: "pct", status: "empty" },
    { id: 6, name: "Lixa Banana 100/180", category: "Acessórios", quantity: 24, unit: "und", status: "ok" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-serif text-primary">Estoque</h2>
          <p className="text-muted-foreground mt-1 text-sm">Controle de materiais e produtos utilizados.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Registrar Item
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Itens</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventory.length}</div>
            <p className="text-xs text-muted-foreground">Produtos cadastrados em catálogo</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-amber-600">Baixo Estoque</CardTitle>
            <AlertTriangle className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">
              {inventory.filter(i => i.status === 'low').length}
            </div>
            <p className="text-xs text-muted-foreground">Requer reposição em breve</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-destructive">Estoque Zerado</CardTitle>
            <AlertTriangle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">
               {inventory.filter(i => i.status === 'empty').length}
            </div>
            <p className="text-xs text-muted-foreground">Produtos insdisponíveis para uso</p>
          </CardContent>
        </Card>
      </div>

      <Card className="border-muted/60 shadow-sm">
        <CardHeader>
          <CardTitle>Relação de Produtos</CardTitle>
          <CardDescription>
            Lista completa de insumos registrados no sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-hidden">
            <div className="grid grid-cols-12 bg-muted/40 p-4 font-medium text-sm text-muted-foreground border-b">
              <div className="col-span-1 border-r text-center">ID</div>
              <div className="col-span-4 pl-4 border-r">Produto</div>
              <div className="col-span-3 pl-4 border-r">Categoria</div>
              <div className="col-span-2 text-center border-r">Qtd</div>
              <div className="col-span-2 text-right pr-4">Ação</div>
            </div>
            
            <div className="divide-y">
              {inventory.map((item) => (
                <div key={item.id} className="grid grid-cols-12 p-3 items-center text-sm transition-colors hover:bg-muted/20">
                  <div className="col-span-1 text-center text-muted-foreground">#{item.id}</div>
                  <div className="col-span-4 pl-4 font-medium flex items-center gap-2">
                    {item.name}
                    {item.status === 'low' && (
                      <span className="flex h-2 w-2 rounded-full bg-amber-500" title="Estoque Baixo"></span>
                    )}
                    {item.status === 'empty' && (
                      <span className="flex h-2 w-2 rounded-full bg-destructive" title="Sem Estoque"></span>
                    )}
                  </div>
                  <div className="col-span-3 pl-4 text-muted-foreground">{item.category}</div>
                  <div className="col-span-2 text-center">
                    <span className={`inline-flex font-mono px-2 py-1 rounded-md text-xs
                      ${item.status === 'empty' ? 'bg-destructive/10 text-destructive font-bold' : 
                        item.status === 'low' ? 'bg-amber-500/10 text-amber-600 font-bold' : 
                        'bg-secondary/50 text-secondary-foreground'}
                    `}>
                      {item.quantity} {item.unit}
                    </span>
                  </div>
                  <div className="col-span-2 pr-4 flex justify-end">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {inventory.length === 0 && (
              <div className="py-12 text-center text-muted-foreground">
                Nenhum produto cadastrado no estoque ainda.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
