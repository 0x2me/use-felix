export function TokenListHeader() {
  return (
    <div className="grid grid-cols-3 gap-4 px-4 py-2 text-sm font-medium text-muted-foreground">
      <div>ASSET / AMOUNT</div>
      <div className="text-center">PRICE</div>
      <div className="text-right">USD VALUE</div>
    </div>
  );
}
