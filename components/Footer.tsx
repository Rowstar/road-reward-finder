export default function Footer() {
  const year = new Date().getFullYear();
  retur( ( (
    <footer className="py-4 px-6 text-center text-sm text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800">
      © {year} Road-Reward Finder. All rights reserved.
    </footer>
  );
}
