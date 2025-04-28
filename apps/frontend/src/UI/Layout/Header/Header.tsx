import { Text } from '@/UI/Elements/Text';
import Menu from '@/UI/Layout/Header/Menu';

type Props = {
  menuItems: { label: string; href: string; testId: string }[];
};

export function Header({ menuItems }: Props) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white shadow">
      <nav className="flex w-full items-center justify-between gap-3 pt-3 pr-4 pb-3 pl-4">
        <Text as='label'>Traffic Analysis System</Text>
        <Menu menuItems={menuItems} />
      </nav>
    </header>
  );
}
