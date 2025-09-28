export default function Loading() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-text-primary mb-2">Loading TradeSage</h2>
        <p className="text-text-secondary">Preparing your trading dashboard...</p>
      </div>
    </div>
  );
}
