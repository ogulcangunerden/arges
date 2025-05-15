export function CompanyStats() {
  return (
    <section className="bg-secondary py-20">
      <div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 text-center">
          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-primary">20+</h3>
            <p className="text-muted-foreground">Yıllık Tecrübe</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-primary">5000+</h3>
            <p className="text-muted-foreground">Ürün Çeşidi</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-primary">500+</h3>
            <p className="text-muted-foreground">Mutlu Müşteri</p>
          </div>

          <div className="space-y-2">
            <h3 className="text-4xl font-bold text-primary">24/7</h3>
            <p className="text-muted-foreground">Teknik Destek</p>
          </div>
        </div>
      </div>
    </section>
  );
}
