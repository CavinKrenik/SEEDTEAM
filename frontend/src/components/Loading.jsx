export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-seedGreen text-seedGold font-display">
      <div className="text-center">
        <img src="/theseed.gif" alt="Loading..." className="w-24 mx-auto animate-spin" />
        <p className="mt-4 text-xl font-semibold">Preparing The SeedSync System...</p>
      </div>
    </div>
  );
}
