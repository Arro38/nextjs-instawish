export default function Loading() {
  return (
    <div className="flex justify-center items-center w-full h-screen flex-col gap-6">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      {/* Chargement en cours ...  */}
      <h2 className="text-2xl"> Chargement en cours </h2>
    </div>
  );
}
