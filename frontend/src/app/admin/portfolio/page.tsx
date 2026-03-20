import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Upload, ImageIcon } from "lucide-react";

export default function PortfolioAdminPage() {
  const images = [
    { id: 1, title: "Nail Art Francesinha", url: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=500&h=500&fit=crop", category: "Fibra" },
    { id: 2, title: "Amêndoa Decorada", url: "https://images.unsplash.com/photo-1604654894610-df63bc536371?w=500&h=500&fit=crop", category: "Gel" },
    { id: 3, title: "Clássico Vermelho", url: "https://images.unsplash.com/photo-1519014816548-bf5fe059e98b?w=500&h=500&fit=crop", category: "Esmaltação" },
    { id: 4, title: "Babyboomer", url: "https://images.unsplash.com/photo-1595868662963-f018e61cd6fc?w=500&h=500&fit=crop", category: "Fibras" },
  ];

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight font-serif text-primary">Portfólio</h2>
          <p className="text-muted-foreground mt-1 text-sm">Gerencie as imagens que aparecem para as clientes.</p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Mock upload button triggering file input */}
          <label htmlFor="upload-portfolio" className="cursor-pointer">
            <div className="flex bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md transition-colors items-center text-sm font-medium">
              <Upload className="h-4 w-4 mr-2" />
              Adicionar Nova Imagem
            </div>
            <input type="file" id="upload-portfolio" className="hidden" accept="image/*" />
          </label>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <Card key={img.id} className="overflow-hidden group border-muted/50 transition-all hover:shadow-md hover:border-primary/30">
            <div className="relative aspect-square bg-muted">
              {/* Using standard img for mock purposes, in production should use next/image */}
              <img
                src={img.url}
                alt={img.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button variant="destructive" size="icon" className="h-10 w-10 mt-4 rounded-full shadow-lg">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4 bg-card z-10 relative border-t">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm leading-none mb-1">{img.title}</h3>
                  <p className="text-xs text-muted-foreground">{img.category}</p>
                </div>
                <ImageIcon className="h-4 w-4 text-muted-foreground/50" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {images.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl border-muted-foreground/20 bg-muted/10">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ImageIcon className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-lg font-medium">Nenhuma imagem no portfólio</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Faça upload de fotos dos seus melhores trabalhos para atrair mais clientes.
          </p>
        </div>
      )}
    </div>
  );
}
