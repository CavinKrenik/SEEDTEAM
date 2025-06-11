import seedLogo from '../assets/theseed.gif';

export default function Footer() {
  return (
    <footer className="flex justify-center items-center gap-2 py-4 mt-8 text-sm bg-seedGreen text-seedGold">
      <img
        src={seedLogo}
        alt="The Seed"
        className="w-6 h-6 rounded-full drop-shadow"
      />
      <span>Copyright © 2025 The Seed: A Conscious Community</span>
    </footer>
  );
}
