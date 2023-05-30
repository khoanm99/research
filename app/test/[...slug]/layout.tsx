import HouseLayout from '@/components/HouseLayout/Index';

export default function HouseDetailLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <HouseLayout>{children}</HouseLayout>;
}
